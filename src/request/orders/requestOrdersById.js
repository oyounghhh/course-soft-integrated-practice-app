import { post } from '@/request'

/**
 *
 * @param {*} data
 * @returns {Promise<Orders>}
 */
export default function requestOrdersById(data) {
    return post('/orders/getOrdersById', data)
}
