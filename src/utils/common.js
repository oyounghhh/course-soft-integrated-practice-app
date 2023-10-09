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

// 获取 date 所在月份的最后一天，相当于当前月份的总天数
export function getMonthLastDate(date) {
    const d = new Date(date)
    if (d.toString() === 'Invalid Date') {
        throw Error('Invalid Date')
    }
    const y = d.getFullYear()
    // x 月份的最后一天 等于 x+1 月份第一天的前一天
    const m = d.getMonth() + 1
    return new Date(y, m, 0)
}

// 获取 date 所在月份的第一天
export function getMonthFirstDate(date) {
    const d = new Date(date)
    if (d.toString() === 'Invalid Date') {
        throw Error('Invalid Date')
    }
    const y = d.getFullYear()
    const m = d.getMonth()
    return new Date(y, m, 1)
}

export function getDayFormatChinese(date) {
    const d = new Date(date)
    if (d.toString() === 'Invalid Date') {
        throw Error('Invalid Date')
    }
    return ['日', '一', '二', '三', '四', '五', '六'][d.getDay()]
}
