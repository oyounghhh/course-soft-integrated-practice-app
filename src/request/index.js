import axios from 'axios'
import { BASE_URL } from '@/constants/request'

function getUrl(path) {
    if (path[0] !== '/') {
        throw new Error('path 格式错误')
    }
    return `${BASE_URL}${path}`
}

export async function requestGet(path, data) {
    const response = await axios.get(getUrl(path), data)
    return response.data
}

export async function requestPost(path, data) {
    const response = await axios.post(getUrl(path), data)
    return response.data
}
