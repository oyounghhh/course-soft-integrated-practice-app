import { post } from '@/request'

/**
 *
 * @param {Users} data
 * @returns {Promise<number>} 1 表示成功
 */
export default function register(data) {
    return post('/users/saveUsers', data)
}
