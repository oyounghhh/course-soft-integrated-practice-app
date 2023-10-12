import { post } from '@/request'

/**
 * 根据 id 获取医院信息
 * @param {string} hpId
 * @returns {Promise<Hospital>}
 */
export default function requestHospital(hpId) {
    return post('/hospital/getHospitalById', { hpId })
}
