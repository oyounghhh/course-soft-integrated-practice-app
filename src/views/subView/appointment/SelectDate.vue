<template>
    <ViewHeader :title="title"></ViewHeader>

    <main>
        <!-- <Calendar curYear="2023" curMonth="10" curDay="9"></Calendar> -->
        <Calendar
            :curYear="dateSelected.year"
            :curMonth="dateSelected.month"
            :curDay="dateSelected.day"
            @selectDate="selectDate"
        ></Calendar>
        <div class="btn">
            <button @click="toNext">下一步</button>
        </div>
    </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import Calendar from './Calendar.vue'

import ViewHeader from '@/components/ViewHeader.vue'
import { reactive } from 'vue'

const dateSelected = reactive({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
})
const route = useRoute()
const router = useRouter()
const { hospitalId, packageId } = route.query
const title = `医院${hospitalId}-套餐${packageId}-选择体检日期`

function toNext() {
    console.log(dateSelected.year)
    console.log(dateSelected.month)
    console.log(dateSelected.day)
    console.log('下一步 confirmOrder')
}

function selectDate(year, month, day) {
    dateSelected.year = year
    dateSelected.month = month
    dateSelected.day = day
}
</script>

<style scoped lang="scss">
.btn {
    display: flex;
    justify-content: flex-end;
    padding: 20px;

    button {
        width: 100px;
        height: 50px;
    }
}

button {
    background-color: #117c94;
    color: white;
    border: none;
    font-size: 1.1rem;
    border-radius: 5px;
}
</style>
