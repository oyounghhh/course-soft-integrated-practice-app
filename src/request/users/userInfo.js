import { post } from '@/request'

/**
 * 根据 userId 获取用户信息
 * @param {{userId}} data
 * @returns {Promise<Users>}
 */
export default function userInfo(data) {
    return post('/users/getUsersById', data)
}
