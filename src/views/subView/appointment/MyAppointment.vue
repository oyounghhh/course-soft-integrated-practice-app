<template>
    <ViewHeader title="我的预约"></ViewHeader>
    <main v-if="isShowOrders">
        <div
            v-for="item of appointments"
            class="appointment-item"
            @click="routeConfirmOrder(item.hpId, item.smId, item.orderDate)"
        >
            <div class="info">
                <p>{{ item.orderDate }}</p>
                <p>{{ item.setmeal.name }}</p>
            </div>
            <div class="btn-box" @click.stop>
                <button>取消预约</button>
            </div>
        </div>
    </main>
</template>

<script setup>
import ViewHeader from '@/components/ViewHeader.vue'
import { requestOrdersSetmealByUserId } from '@/request/orders/requestOrdersByUserId'
import { getSessionStorage } from '@/utils/storage'
import { onBeforeMount, ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const user = getSessionStorage('user')
const userId = user.userId

const appointments = ref([])
const isShowOrders = ref(false)

//------------------------------ router ------------------------------

function routeConfirmOrder(hpId, smId, dateSelected) {
    router.push({
        name: 'ConfirmOrder',
        query: { hpId, smId, dateSelected },
    })
}

//------------------------------ life cycle ------------------------------
onBeforeMount(async () => {
    await getAllOrdersByUserId(userId)
    isShowOrders.value = true
})

//------------------------------ fetch data ------------------------------

async function getAllOrdersByUserId(userId) {
    const orders = await requestOrdersSetmealByUserId(userId)
    appointments.value = orders
}
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
