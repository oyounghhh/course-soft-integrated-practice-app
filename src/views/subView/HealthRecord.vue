<template>
    <ViewHeader title="健康档案"></ViewHeader>
    <div class="cover">
        <img :src="recordCoverImg" alt="封面" />
    </div>
    <ul v-if="isShowRecordWrapper" class="gird-wrapper">
        <li
            v-for="record of orderArrRef"
            :key="record.orderId"
            class="record-li gird3"
            @click="(evt) => toDetailRepord(evt, record.orderId)"
        >
            <div class="grid-item record-icon">
                <IconBox width="60px" height="60px">
                    <SvgRecord />
                </IconBox>
            </div>
            <div class="grid-item intro">
                <p>{{ toLocalDate(record.orderDate) }} - 体检报告</p>
                <p>
                    {{ `${record.hospital.name} - ${record.hospital.address}` }}
                </p>
            </div>
            <div class="grid-item">
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

import requestOrdersByUserId from '@/request/orders/requestOrdersByUserId'
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
    const orderArr = await requestOrdersByUserId({ userId })
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

.gird-wrapper {
    padding: 20px;
    .gird3 {
        display: grid;
        padding: 10px 0;
        grid-template-columns: 70px 1fr 40px;
        justify-items: center;
        align-items: center;

        .grid-item:nth-of-type(2) {
            justify-self: left;
        }
    }
}
.record-li:not(:last-of-type) {
    border-bottom: 1px solid #eee;
}
.intro {
    p:nth-of-type(1) {
        font-size: 1.1rem;
        font-weight: bold;
        color: black;
    }
    p:nth-of-type(2) {
        font-size: 0.9rem;
        color: #999;
    }
}
.record-icon :deep(path) {
    fill: #abdae2;
}
</style>
