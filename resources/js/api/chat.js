import request from '../utils/request'

/**
 * 访客首次咨询
 *
 * @param data
 * @returns {*}
 */
export function store(data) {
    return request({
        url: '/visitor/store',
        method: 'post',
        data
    })
}

/**
 * 访客端获取聊天内容
 *
 * @param params
 * @returns {*}
 */
export function visitorMessages(params) {
    return request({
        url: '/visitor/messages',
        method: 'get',
        params
    })
}

/**
 * 客服端获取聊天内容
 *
 * @param params
 * @returns {*}
 */
export function servicerMessages(params) {
    return request({
        'url': '/service/messages',
        'method': 'get',
        params
    })
}
