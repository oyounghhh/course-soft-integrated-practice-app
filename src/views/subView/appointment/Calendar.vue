<template>
    <div class="calendar-wrapper">
        <div class="temeplate">
            <span class="top top-left" @click="prevMonth">
                <IconBox width="15px">
                    <SvgPrev />
                </IconBox>
            </span>
            <p class="top top-mid font-bold">
                {{ `${dateSelected.year} 年 ${dateSelected.month} 月` }}
            </p>
            <span class="top top-right" @click="nextMonth">
                <IconBox width="15px">
                    <SvgNext />
                </IconBox>
            </span>
        </div>
        <div class="temeplate">
            <p class="row-week" v-for="day of WEEK_SEQUENCE">{{ day }}</p>
        </div>
        <div class="temeplate">
            <div
                class="day-cell"
                v-for="i1 in 7 * 6"
                :key="i1"
                :class="{
                    activeDay:
                        dateSelectedIndexRef !== -1 &&
                        i1 - 1 === dateSelectedIndexRef,
                }"
                :title="getInfo(calendarMapping[i1 - 1])"
                @click="(evt) => clickDateCell(evt, calendarMapping[i1 - 1])"
            >
                <span>{{ calendarMapping[i1 - 1] }}</span>
                <span class="info">
                    {{ getInfo(calendarMapping[i1 - 1]) }}
                </span>
            </div>
        </div>
        <div class="column7"></div>
    </div>
</template>

<script setup>
import IconBox from '@/components/IconBox.vue'

import SvgPrev from '@/assets/svg/prev.svg'
import SvgNext from '@/assets/svg/next.svg'
import { reactive, ref, watch } from 'vue'

import {
    getMonthFirstDate,
    getMonthLastDate,
    getDayFormatChinese,
} from '@/utils/common'

const WEEK_SEQUENCE = ['一', '二', '三', '四', '五', '六', '日']

const emit = defineEmits(['selectDate'])
const props = defineProps({
    curYear: {
        type: [String, Number],
        required: false,
    },
    curMonth: {
        type: [String, Number],
        required: false,
    },
    curDay: {
        type: [String, Number],
        required: false,
    },
})

/*
数据驱动：
props 更新 / 用户修改日期
    --> selectDate 更新
        --> 如果月份发生变化，则更新 calendarMapping 和 dayInfo
        --> 更新当前选中日期在 calendarMapping 中的下标
            --> 页面更新
*/
const dateSelected = reactive({
    year: Number.isNaN(Number(props.curYear))
        ? new Date().getFullYear()
        : Number(props.curYear),
    month: Number.isNaN(Number(props.curMonth))
        ? new Date().getMonth() + 1
        : Number(props.curMonth),
    day: Number.isNaN(Number(props.curDay))
        ? new Date().getDate()
        : Number(props.curDay),
})
const dateSelectedIndexRef = ref(-1)
const calendarMapping = reactive(Array(42))

watch(
    () => ({
        year: dateSelected.year,
        month: dateSelected.month,
        day: dateSelected.day,
    }),
    (newValue, oldValue) => {
        if (
            newValue.year !== oldValue?.year ||
            newValue.month !== oldValue?.month
        ) {
            updateCalendarMapping()
        }
        updateSelectDayIndex()
        emit('selectDate', newValue.year, newValue.month, newValue.day)
    },
    {
        immediate: true,
    },
)

function updateCalendarMapping() {
    const selectDateStr = `${dateSelected.year}-${dateSelected.month}-${dateSelected.day}`
    const firstDayIndex = getFirstDateIndex(selectDateStr)
    const totalDateNum = getMonthLastDate(selectDateStr).getDate()

    calendarMapping.forEach((v, i, arr) => (arr[i] = ''))
    for (let i = firstDayIndex, d = 1; d <= totalDateNum; i++, d++) {
        calendarMapping[i] = d
    }
}
function updateSelectDayIndex() {
    const selectDateStr = `${dateSelected.year}-${dateSelected.month}-${dateSelected.day}`
    dateSelectedIndexRef.value = getDateIndex(selectDateStr)
}

//------------------------------ info ------------------------------
const dayInfo = {
    2023: {
        10: {
            19: '余80',
            20: '余80',
        },
    },
}
function getInfo(day) {
    const y = dateSelected.year
    const m = dateSelected.month
    if (/\d+/.test(day) === false) {
        return
    }
    const d = Number(day)
    if (!dayInfo[y] || !dayInfo[y][m] || !dayInfo[y][m][d]) {
        return
    }
    return dayInfo[y][m][d]
}

//------------------------------ event ------------------------------
function clickDateCell(evt, dateNum) {
    if (/\d+/.test(dateNum)) {
        dateSelected.day = dateNum
    }
}

function prevMonth() {
    if (dateSelected.month === 1) {
        dateSelected.month = 13
        dateSelected.year--
    }
    dateSelected.month--
    dateSelected.day = 1
}
function nextMonth() {
    if (dateSelected.month === 12) {
        dateSelected.month = 0
        dateSelected.year++
    }
    dateSelected.month++
    dateSelected.day = 1
}

//------------------------------ utils ------------------------------

/**
 * 获取日期 date 所在月份的第一天在 calendarMapping 中的下标，要求月份和年份是匹配的
 * @param {Date} date
 */
function getFirstDateIndex(date) {
    const d = new Date(date)
    if (d.toString() === 'Invalid Date') {
        throw Error('Invalid Date')
    }
    const firstDay = getMonthFirstDate(d)
    const firstDayIndex = WEEK_SEQUENCE.indexOf(getDayFormatChinese(firstDay))
    return firstDayIndex
}

/**
 * 获取日期 date 在 calendarMapping 中的下标，要求月份和年份是匹配的
 * @param {Date} date
 */
function getDateIndex(date) {
    const d = new Date(date)
    if (d.toString() === 'Invalid Date') {
        throw Error('Invalid Date')
    }
    const firstDayIndex = getFirstDateIndex(d)
    return firstDayIndex + d.getDate() - 1
}
</script>

<style scoped lang="scss">
@use 'sass:math';
.temeplate {
    display: contents;
}

//------------------------------ 日历结构 ------------------------------
.calendar-wrapper {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(8, 1fr);
    align-items: center;
    justify-items: center;
    gap: 20px 10px;

    .top {
        grid-row: 1/2;
        &.top-left {
            grid-column: 1/2;
        }
        &.top-mid {
            grid-column: 2/7;
        }
        &.top-right {
            grid-column: 7/8;
        }
    }

    .row-week {
        grid-row: 2/3;
        @for $i from 1 through 7 {
            &:nth-of-type(#{$i}) {
                grid-column: #{$i} / #{$i + 1};
            }
        }
    }

    @for $i from 1 through 7 {
        $nth-type: 7n - #{7-$i};
        .day-cell:nth-of-type(#{$nth-type}) {
            grid-column: #{$i} / #{$i + 1};
        }
    }

    @for $i from 1 through 42 {
        $j: math.floor(math.div($i - 1, 7));

        .day-cell:nth-of-type(#{$i}) {
            grid-row: #{3 + $j} / #{4 + $j};
        }
    }

    .day-cell {
        height: 40px;
        width: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}

//------------------------------ 样式 ------------------------------
.activeDay {
    border-radius: 50%;
    background-color: skyblue;
    color: white;
}
.info {
    color: red;
    font-size: 0.8rem;
    position: absolute;
    transform: translateY(1.5rem);
    width: 3rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.column7 {
    background-color: rgba($color: skyblue, $alpha: 0.3);
    grid-row: 2/9;
    grid-column: 7/8;
    width: 100%;
    height: 100%;
    z-index: -1;
}
</style>
