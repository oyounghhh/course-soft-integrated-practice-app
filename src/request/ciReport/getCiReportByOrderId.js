import { post } from '@/request'

/**
 * 根据 orderId 获取 ciReport
 * @param {string} orderId
 * @returns {Promise<Array<CiReport>}
 */
export default function getCiReportByOrderId(orderId) {
    return post('/ciReport/listCiReport', { orderId })
}
