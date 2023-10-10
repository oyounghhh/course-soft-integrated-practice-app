<template>
    <ViewHeader title="我的预约"></ViewHeader>
    <main>
        <div
            v-for="item of appointments"
            class="appointment-item"
            @click="routeConfirmOrder"
        >
            <div class="info">
                <p>{{ item.orderDate }}</p>
                <p>{{ item.packageName }}</p>
            </div>
            <div class="btn-box" @click.stop>
                <button>取消预约</button>
            </div>
        </div>
    </main>
</template>

<script setup>
import ViewHeader from '@/components/ViewHeader.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

function routeConfirmOrder() {
    router.push({
        name: 'ConfirmOrder',
    })
}

const appointments = [
    {
        orderId: '1',
        orderDate: '2021-11-22',
        packageName: '普通男士客户-基础套餐',
    },
    {
        orderId: '2',
        orderDate: '2021-12-22',
        packageName: '普通男士客户-脑血管系统',
    },
]
</script>

<style scoped lang="scss">
main {
    padding: 20px;
}
.appointment-item {
    display: flex;
    align-items: center;
    margin: 20px 0;
    padding: 20px;
    box-shadow: 0 0 5px 0px #ccc;
    border-radius: 5px;

    &:not(:last-of-type) {
        border-bottom: 1px solid #ccc;
    }

    .info {
        flex: 1 0 auto;
    }
    .btn-box {
        button {
            padding: 10px 20px;
            border: 1px solid orange;
            border-radius: 4px;
            background-color: transparent;
            color: orange;
        }
    }
}
</style>
