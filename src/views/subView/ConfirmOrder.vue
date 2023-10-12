<template>
    <ViewHeader :title="title"></ViewHeader>
    <main>
        <div class="date-item" v-for="item of dataShow">
            <h2>{{ item.title }}</h2>
            <div v-if="item.isShow">
                <p
                    v-for="(contentArr, i) of item.contents"
                    :key="i"
                    class="content-item"
                >
                    <span v-for="(c, i) of contentArr" :key="c?.i">{{
                        c
                    }}</span>
                </p>
            </div>
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
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ViewHeader from '@/components/ViewHeader.vue'
import requestHospital from '@/request/hospital/requestHospital'
import { onBeforeMount } from 'vue'
import requestSetmeal from '@/request/setmeal/requestSetmeal'
import { getSessionStorage } from '@/utils/storage'

const route = useRoute()
const router = useRouter()

const { hpId, smId, dateSelected, isShowPayment } = route.query
const totalAmount = 350
const title = `确认订单`

const users = getSessionStorage('user')
// const setmealRef = ref({})
// const hospitalRef = ref({})

const dataShow = reactive([
    {
        title: '体检人信息',
        isShow: true,
        contents: [
            ['姓名：', users.realName],
            ['证件号码：', users.identityCard],
            ['出生日期：', users.birthday],
            ['手机号码：', users.userId],
        ],
    },
    {
        title: '体检日期',
        isShow: true,
        contents: [[dateSelected]],
    },
    {
        title: '体检机构',
        isShow: false,
        contents: [
            [
                /* hospitalRef.value?.name */
            ],
            ['营业时间：' /* , hospitalRef.value?.businessHours */],
            ['采血截止：' /* , hospitalRef.value?.deadline */],
            ['机构电话：' /* , hospitalRef.value?.telephone */],
            ['机构地址：' /* , hospitalRef.value?.address */],
        ],
    },
    {
        title: '套餐类型',
        isShow: false,
        contents: [
            [
                /* setmealRef.value?.name */
            ],
        ],
    },
])
//------------------------------ events ------------------------------

function pay() {
    router.push('/appointment-success')
}

//------------------------------ life cycle ------------------------------
onBeforeMount(async () => {
    await getHospitalById(hpId)
    await getSetmealById(smId)
})

//------------------------------ fetch data ------------------------------

async function getHospitalById(hpId) {
    const hospital = await requestHospital(hpId)
    // hospitalRef.value = hospital
    dataShow[2].isShow = true
    dataShow[2].contents[0].push(hospital.name)
    dataShow[2].contents[1].push(hospital.businessHours)
    dataShow[2].contents[2].push(hospital.deadline)
    dataShow[2].contents[3].push(hospital.telephone)
    dataShow[2].contents[4].push(hospital.address)
}
async function getSetmealById(smId) {
    const setmeal = await requestSetmeal(smId)
    // setmealRef.value = setmeal
    dataShow[3].isShow = true
    dataShow[3].contents[0].push(setmeal.name)
}
</script>

<style scoped lang="scss">
main {
    padding: 20px;

    .date-item {
        h2 {
            padding-left: 20px;
            border-left: 6px solid skyblue;
            font-size: 1.3rem;
            margin-bottom: 14px;
        }
        &:not(:first-of-type) h2 {
            margin-top: 40px;
        }
        .content-item {
            margin: 10px;
        }
    }
}

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
