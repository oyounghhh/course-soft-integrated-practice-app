import { post } from '@/request'

/**
 * 取消预约订单
 * @param {string} orderId
 * @returns {Promise<number>} 1 表示成功
 */
export default function cancelOrder(orderId) {
    return post('/orders/removeOrders', { orderId })
}
