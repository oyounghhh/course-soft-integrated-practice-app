import { post } from '@/request'

/**
 *
 * @param {{userId: string, password: string}} data
 * @returns {Promise<Users>}
 */
export default function login(data) {
    return post('/users/getUsersByUserIdByPass', data)
}
