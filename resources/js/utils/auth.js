
/**
 * Token key
 * @type {string}
 */
const tokenKey = 'hello_token'

export function getToken() {
    return window.localStorage.getItem(tokenKey)
}

export function setToken(token) {
    return window.localStorage.setItem(tokenKey,token)
}

export function destroyToken() {
    return window.localStorage.removeItem(tokenKey)
}

/**
 * visitor uuid
 * @type {string}
 */
const visitorUid = 'hello_visitor_uuid'

/**
 * get visitor uuid
 *
 * @returns {string}
 */
export function getVisitorId() {
    return window.localStorage.getItem(visitorUid) || ''
}

/**
 * set visitor uuid
 * @param uuid
 */
export function setVisitorId(uuid = '') {
    return window.localStorage.setItem(visitorUid,uuid)
}

