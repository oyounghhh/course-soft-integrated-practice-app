import { post } from '@/request'

/**
 * 获取所有医院
 * @returns {Promise<Array<Hospital>>}
 */
export default function listHospital() {
    return post('/hospital/listHospital', { state: 1 })
}
