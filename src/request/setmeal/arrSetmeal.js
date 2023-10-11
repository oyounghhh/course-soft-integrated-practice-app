import { post } from '@/request'

/**
 * 获取所有套餐
 * @returns {Promise<Array<Setmeal>>}
 */
export default function arrSetmeal() {
    return post('/setmeal/listSetmealByType')
}
