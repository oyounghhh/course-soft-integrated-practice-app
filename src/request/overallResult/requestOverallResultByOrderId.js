import { post } from '@/request'

/**
 *
 * @param {string} orderId
 * @returns {Promise<Array<OverallResult>>}
 */
export default function requestOverallResultByOrderId(orderId) {
    return post('/overallResult/listOverallResultByOrderId', { orderId })
}
