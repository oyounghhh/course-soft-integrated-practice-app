<template>
    <ViewHeader title="健康档案"></ViewHeader>
    <div class="cover">
        <img :src="recordCoverImg" alt="封面" />
    </div>
    <ul v-if="isShowRecordWrapper">
        <li
            v-for="record of orderArrRef"
            :key="record.orderId"
            class="record-li"
            @click="(evt) => toDetailRepord(evt, record.orderId)"
        >
            <div class="record-icon">
                <IconBox width="60px" height="60px">
                    <SvgRecord />
                </IconBox>
            </div>
            <div class="intro">
                <p>{{ toLocalDate(record.orderDate) }} - 体检报告</p>
                <p>
                    {{ `${record.hospital.name} - ${record.hospital.address}` }}
                </p>
            </div>
            <div>
                <IconBox>
                    <SvgEnter />
                </IconBox>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { useRouter } from 'vue-router'

import ViewHeader from '@/components/ViewHeader.vue'
import IconBox from '@/components/IconBox.vue'
import SvgRecord from '@/assets/svg/record.svg'
import SvgEnter from '@/assets/svg/enter.svg'
import recordCoverImg from '@/assets/img/report.png'

const router = useRouter()

import requestOrdersById from '@/request/orders/requestOrdersById'
import { onBeforeMount, ref } from 'vue'
import { getSessionStorage } from '@/utils/storage'

const userId = getSessionStorage('user')?.userId

const orderArrRef = ref(null)
const isShowRecordWrapper = ref(false)

function toDetailRepord(evt, orderId) {
    router.push({
        name: 'DetailRecord',
        query: {
            orderId,
        },
    })
}

//------------------------------ life cycle ------------------------------
onBeforeMount(async () => {
    try {
        await getOrdersById(userId)
        isShowRecordWrapper.value = true
    } catch (error) {
        alert(error.message)
    }
})

//------------------------------ fetch data ------------------------------
async function getOrdersById(userId) {
    const orderArr = await requestOrdersById({ userId })
    console.log(orderArr)
    orderArrRef.value = orderArr
}

//------------------------------ util ------------------------------
function toLocalDate(dateStr) {
    const date = new Date(dateStr)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDay()}日`
}
</script>

<style scoped lang="scss">
.cover {
    width: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.record-li {
    box-sizing: border-box;
    padding: 20px 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    &:not(:last-of-type) {
        border-bottom: 1px solid #eee;
    }

    .intro p:nth-of-type(1) {
        font-size: 1.1rem;
        font-weight: bold;
        color: black;
    }
    .intro p:nth-of-type(2) {
        font-size: 0.9rem;
        color: #999;
    }
}

.record-icon :deep(path) {
    fill: #abdae2;
}
</style>
