import { post } from '@/request'
import requestSetmeal from '../setmeal/requestSetmeal'

/**
 * 获取医院信息
 * @param {string} hpId
 */
function hospital(hpId) {
    return post('/hospital/getHospitalById', { hpId })
}

/**
 * 根据 手机号 获取该用户的所有健康档案
 * @param {string} userId
 * @returns {Promise<Array<Orders>>}
 */
function getOrdersArr(userId) {
    return post('/orders/listOrdersByUserId', { userId })
}

/**
 * 根据 手机号 获取该用户的所有健康档案，包含医院信息
 * @param {{userId:string}} data
 * @returns {Promise<Array<OrdersHospital>>}
 */
export default async function requestOrdersByUserId(data) {
    const orders = await getOrdersArr(data.userId)
    const promiseArr = []
    orders.forEach((order) => {
        promiseArr.push(hospital(order.hpId))
    })
    const hospitals = await Promise.allSettled(promiseArr)
    orders.forEach((order, index) => {
        order.hospital = hospitals[index].value
    })
    return orders
}

/**
 * 根据 userId 获取预约订单的信息（包含套餐信息）
 * @param {string} userId
 * @returns {Promise<Array<OrdersSetmeal>>}
 */
export async function requestOrdersSetmealByUserId(userId) {
    const orders = await getOrdersArr(userId)
    const promiseArr = []
    orders.forEach((order) => {
        promiseArr.push(requestSetmeal(order.smId))
    })
    const setmeals = await Promise.allSettled(promiseArr)
    orders.forEach((order, index) => {
        order.setmeal = setmeals[index].value
    })
    return orders
}
