<?php
/**
 * Created by PhpStorm.
 * User: bing
 * Date: 2019/11/2
 * Time: 13:41
 */

namespace App\Services;


class EventService
{
    protected $redis;

    /**
     * 通知客服端消息
     */
    const MUTATE_SERVICE_ON_MESSAGE = 'SERVICE_ON_MESSAGE';

    /**
     * 通知访客端消息
     */
    const MUTATE_CLIENT_ON_MESSAGE = 'CLIENT_ON_MESSAGE';


    public function __construct(RedisService $redis)
    {
        $this->redis = $redis;
    }

    /**
     * 打包带有 Action 消息
     *
     * @param $action
     * @param $data
     * @return string
     */
    public function packActionMessage($action, $data)
    {
        return json_encode(['action' => $action, 'data' => $data]);
    }

    /**
     * 打包带有 Mutation 消息
     *
     * @param $mutation
     * @param $data
     * @return string
     */
    public function packMutationMessage($mutation, $data)
    {
        return json_encode(['mutation' => $mutation, 'message' => $data]);
    }
}