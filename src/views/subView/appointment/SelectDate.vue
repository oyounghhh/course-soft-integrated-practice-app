<template>
    <ViewHeader title="选择体检日期"></ViewHeader>
    <main>
        <section class="calendar-wrapper">
            <div class="calendar-header">
                <span @click="prevMonth">
                    <IconBox width="15px"> <SvgPrev /> </IconBox>
                </span>
                <p>
                    {{ calendarState.year + '年' + calendarState.month + '月' }}
                </p>
                <span class="top top-right" @click="nextMonth">
                    <IconBox width="15px"> <SvgNext /> </IconBox>
                </span>
            </div>
            <div class="date-grid">
                <div
                    v-for="week of '日一二三四五六'"
                    :key="week"
                    class="date-grid-cell date-grid-week"
                >
                    {{ week }}
                </div>
                <div
                    v-for="(calendar, index) in calendarState.calendarArr"
                    :key="calendar.ymd"
                    class="date-grid-cell pointer"
                    @click="selectDay(index)"
                >
                    <span
                        class="date-grid-day-cell"
                        :class="{ selected: calendar.isSelected }"
                    >
                        {{ calendar.day }}
                    </span>
                    <span>
                        {{
                            typeof calendar.remainder === 'number' &&
                            calendar.remainder > 0
                                ? '余' + calendar.remainder
                                : ''
                        }}
                    </span>
                </div>
            </div>
        </section>

        <div class="btn-box">
            <button @click="toConfirmOrder">下一步</button>
        </div>
    </main>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import arrAppointmentCalendar from '@/request/calendar/arrAppointmentCalendar'

import ViewHeader from '@/components/ViewHeader.vue'
import IconBox from '@/components/IconBox.vue'

import SvgPrev from '@/assets/svg/prev.svg'
import SvgNext from '@/assets/svg/next.svg'

const router = useRouter()
const route = useRoute()
const curDate = new Date()

const hpId = route.query.hpId
const smId = route.query.smId
const calendarState = reactive({
    year: curDate.getFullYear(),
    month: curDate.getMonth() + 1,
    calendarArr: [],
    dateSelected: '',
})

// 获取日历
getCalendar()
function getCalendar() {
    arrAppointmentCalendar({
        hpId,
        year: calendarState.year,
        month: calendarState.month,
    })
        .then((data) => {
            calendarState.calendarArr = data
            processCalendarArr()
        })
        .catch((error) => {
            alert(error.message)
        })
}

function processCalendarArr() {
    const calendarArr = calendarState.calendarArr || []
    calendarArr.forEach((calendar) => {
        if (!calendar.ymd) {
            return
        }
        const ymd = new Date(calendar.ymd)
        calendar.day = ymd.getDate()
        calendar.isSelected = checkSameDay(ymd, calendarState.dateSelected)
    })
}
function checkSameDay(day1, day2) {
    const d1 = new Date(day1)
    const d2 = new Date(day2)
    return (
        d2.toString() !== 'Invalid Date' &&
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d3.getDay() === d3.getDay()
    )
}

//------------------------------ caldaren events ------------------------------
function prevMonth() {
    if (calendarState.month === curDate.getMonth() + 1) {
        return
    }
    if (calendarState.month <= 1) {
        calendarState.year--
        calendarState.month = 12
    } else {
        calendarState.month--
    }
    getCalendar()
}

function nextMonth() {
    if (calendarState.month >= 12) {
        calendarState.year++
        calendarState.month = 1
    } else {
        calendarState.month++
    }
    getCalendar()
}

function selectDay(index) {
    const arr = calendarState.calendarArr
    const remainder = arr[index].remainder
    if (typeof remainder === 'number' && remainder > 1) {
        arr.forEach((item) => (item.isSelected = false))
        arr[index].isSelected = true
        calendarState.dateSelected = arr[index].ymd
    }
}

//------------------------------ btn events ------------------------------

function toConfirmOrder() {
    const dateSelected = calendarState.dateSelected
    if (dateSelected == '') {
        alert('请选择体检预约日期！')
        return
    }
    router.push({
        name: 'ConfirmOrder',
        query: { hpId, smId, dateSelected, isShowPayment: true },
    })
}
</script>

<style scoped lang="scss">
main {
    padding: 20px;
}
.calendar-wrapper {
    .calendar-header {
        width: 100%;
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 1rem;
        font-weight: bold;
        p {
            color: #000;
        }
        span {
            color: #999;
            user-select: none;
            cursor: pointer;
        }
    }
    .date-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(7, 1fr);
        justify-items: stretch;
        align-items: stretch;

        .date-grid-cell {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            &.date-grid-week {
                justify-content: center;
            }

            span:first-of-type {
                margin: 4px;
                font-size: 1.2rem;
                font-weight: bold;
                text-align: center;
            }
            span:last-of-type {
                color: #bbb;
                font-size: 1rem;
            }
        }
        .date-grid-day-cell {
            --side: 2rem;
            line-height: var(--side);
            width: var(--side);
            border-radius: 50%;
        }

        .selected {
            background-color: var(--theme-color);
            color: #fff;
        }
    }
}

.btn-box {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    button {
        padding: 10px 20px;
        font-size: 2rem;
    }
}
</style>
