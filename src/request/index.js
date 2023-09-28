import axios from 'axios'

// const BASE_URL = 'http://192.168.43.89:8080'
const BASE_URL = 'http://192.168.43.191:4523/m1/3350410-0-default'
function getUrl(path) {
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
