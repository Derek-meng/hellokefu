<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    /**
     * 消息来源-客服
     */
    const AGENT_USER = 'user';

    /**
     * 消息来源-访客
     */
    const AGENT_VISITOR = 'visitor';

    protected $fillable = ['visitor_id', 'user_id', 'app_uuid', 'avatar', 'visit_number', 'unread_number', 'name', 'age', 'sex', 'company', 'qq', 'wechat', 'mobile', 'email', 'address', 'remark', 'region', 'ip', 'user_agent', 'lasted_message', 'lasted_at'];

    protected $appends = ['lasted_at', 'lasted_message', 'unread'];

    /**
     * 最后一条消息的时间
     *
     * @return string
     */
    public function getLastedAtAttribute()
    {
//        $lastChat = Chat::where(['agent' => self::AGENT_VISITOR, 'visitor_id' => $this->visitor_id])->whereNull('received_at')->orderBy('id', SORT_DESC)->first();
//        return $lastChat ? $lastChat->created_at->diffForHumans() : '';
        return '';
    }

    public function getLastedMessageAttribute()
    {
        return 'lasted message';
    }

    /**
     * 未读消息数
     *
     * @return mixed
     */
    public function getUnreadAttribute()
    {
        return Chat::where(['agent' => self::AGENT_VISITOR, 'visitor_id' => $this->visitor_id])->whereNull('received_at')->count();
    }

    /**
     * 关联客服
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
