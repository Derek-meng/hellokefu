<?php
/**
 * Created by PhpStorm.
 * User: bing
 * Date: 2019/11/2
 * Time: 11:25
 */

namespace App\Services;


use App\Exceptions\ApiException;
use App\Http\Resources\ChatResource;
use App\Http\Resources\VisitorResource;
use App\Models\Application;
use App\Models\Chat;
use App\Models\Visitor;
use Webpatser\Uuid\Uuid;

class ChatEventService extends EventService
{

    protected $server;
    protected $fd;
    protected $data;
    protected $body;
    protected $params;

    /**
     * 设置在线访客事件
     */
    const SET_VISITOR = 'storeVisitor';

    public function init($server, $frame)
    {
        /**
         * array:3 [
         * "body" => array:2 [
         * "content" => "555\n"
         * ]
         * "params" => array:2 [
         * "app_uuid" => "8d1b32f0-f3cc-11e9-9994-d740e096dedd"
         * "vid" => "e98ac630-fc85-11e9-ab57-c5097f88c2b7"
         * ]
         * "event" => "send"
         * "type" => "chat"
         * ]
         */
        $this->server = $server;
        $this->fd = $frame->fd;
        $this->data = json_decode($frame->data, true);
        $this->body = $this->data['body'];
        $this->params = $this->data['params'];
        return $this;
    }

    /**
     * 访客端链接
     *
     * @return bool|mixed
     */
    public function connect()
    {
        $appUuid = $this->params['app_uuid'] ?? null;
        $visitorId = $this->params['vid'] ?? null;
        dump('$visitorId=', $visitorId);
        // 客户端首次链接
        if (empty($visitorId)) {
            if ($visitor = Visitor::where(['visitor_id' => $visitorId, 'app_uuid' => $appUuid])->first()) {
                // 更新访问次数
                $visitor->visit_number += 1;
                $visitor->save();
            }
            // 不存在访客信息-分配客服
            if (empty($visitor)) {
                $app = Application::where(['app_uuid' => $appUuid])->first();
                // 直接分配给管理员-暂时这么写
                $admin = UserService::getAdminByAppId($app->id);

                $visitor = Visitor::create([
                    'visitor_id' => (string)Uuid::generate(),
                    'avatar' => UserService::generateAvatar(),
                    'user_id' => $admin->id,
                    'app_uuid' => $appUuid,
                    'ip' => '127.0.0.1',
                    'user_agent' => 'user agent',
                    'name' => '访客 ' . (Visitor::where(['app_uuid' => $app->app_uuid])->count() + 1)
                ]);
            }
            $this->server->push($this->fd, $this->packMessage(self::SET_VISITOR, new VisitorResource($visitor)));
            return $this->redis->visitorFd($visitor->visitor_id, $this->fd);

        } else {
            echo 'chat connect vid:' . $this->params['vid'] . '  fd:' . $this->fd;
            return $this->redis->visitorFd($this->params['vid'], $this->fd);
        }
    }

    /**
     *
     */
    public function send()
    {
        try {
            $userId = VisitorService::getUserIdByVisitorId($this->params['vid']);

            // 入表
            $chat = Chat::create([
                'visitor_id' => $this->params['vid'],
                'user_id' => $userId,
                'agent' => Chat::AGENT_VISITOR,
                'content' => $this->body['content']
            ]);
            // 发给自己
            dump('#visitorFd--->', $this->fd);
            $this->server->push($this->fd, json_encode(new ChatResource($chat)));

            // 发给客服
            $userFd = $this->redis->userFd($userId);
            dump('#userFd--->', $userFd);
            $this->server->push($userFd, json_encode(new ChatResource($chat)));

        } catch (ApiException $e) {
            dump($e->getMessage());
        }
    }


}