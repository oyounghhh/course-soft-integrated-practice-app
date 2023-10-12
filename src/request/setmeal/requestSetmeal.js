import { post } from '@/request'

/**
 * 根据 id 获取套餐信息
 * @param {string} smId
 * @returns {Promise<Setmeal>}
 */
export default function requestSetmeal(smId) {
    return post('/setmeal/getSetmealById', { smId })
}
