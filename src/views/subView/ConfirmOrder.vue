<template>
    <ViewHeader :title="title"></ViewHeader>
    <main>
        <h2>体检日期</h2>
        <div class="content">
            {{ `${examYear}年${examMonth}月${examDay}日` }}
        </div>
    </main>
    <div v-if="isShowPayment === 'true'" class="payment">
        <p>
            实付款 <span>￥{{ totalAmount }}</span>
        </p>
        <button @click="pay">确认支付</button>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

import ViewHeader from '@/components/ViewHeader.vue'

const route = useRoute()
const router = useRouter()

const { hospitalId, packageId, examYear, examMonth, examDay, isShowPayment } =
    route.query
const totalAmount = 350
const title = `医院${hospitalId}-套餐${packageId}-确认订单`

//------------------------------ events ------------------------------

function pay() {
    router.push('/appointment-success')
}
</script>

<style scoped lang="scss">
.payment {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 450px;

    // 样式
    & {
        border-top: 1px solid #ddd;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    p {
        margin-left: 20px;
        font-size: 1.2rem;

        span {
            color: orange;
            font-weight: bold;
            font-size: 1.2rem;
        }
    }
    button {
        height: 50px;
        width: 120px;
        font-size: 1.2rem;
        border: none;
        background-color: #117c94;
        color: white;
    }
}
</style>
