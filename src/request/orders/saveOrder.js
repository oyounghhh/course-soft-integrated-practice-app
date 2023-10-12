import { post } from '@/request'

/**
 * 保存预约订单，生成订单信息
 * @param {{orderDate:string, userId:string, hpId:string, smId:string}} data
 * @returns {Promise<number>} 1 表示成功
 */
export default function saveOrder(data) {
    return post('/orders/saveOrders', data)
}
