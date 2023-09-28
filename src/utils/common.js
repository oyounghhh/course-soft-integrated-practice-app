export function leftFillZero(num, targetLength = 2) {
    return num.toString().padStart(targetLength, '0')
}

//获取当前时间（XXXX-XX-XX）
export function getCurDate() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    return `${year}-${leftFillZero(month)}-${leftFillZero(day)}`
}

///////////////////// 本地存储  ////////////////////////////////
