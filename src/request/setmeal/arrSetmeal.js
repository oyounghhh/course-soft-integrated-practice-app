import { post } from '@/request'

/**
 * 获取所有套餐
 * @param {number} type
 * @returns {Promise<Array<Setmeal>>}
 */
export default function arrSetmeal(type) {
    return post('/setmeal/listSetmealByType', {
        type,
    })
}
