<template>
    <ViewHeader :title="title"></ViewHeader>
    <main>
        <div class="date-item" v-for="item of dataShow">
            <h2>{{ item.title }}</h2>
            <div>
                <p
                    v-for="(contentArr, i) of item.contents"
                    :key="i"
                    class="content-item"
                >
                    <span v-for="(c, i) of contentArr" :key="c.i">{{ c }}</span>
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
import { useRoute, useRouter } from 'vue-router'

import ViewHeader from '@/components/ViewHeader.vue'

const route = useRoute()
const router = useRouter()

const { hospitalId, packageId, examYear, examMonth, examDay, isShowPayment } =
    route.query
const totalAmount = 350
const title = `医院${hospitalId}-套餐${packageId}-确认订单`

const users = {
    userId: '1',
    userPhone: '123xxxx434',
    realName: '某某某',
    identityCard: '123456xxxxxxxxx',
    birthday: '2001-10-10',
}
const dateSelected = '2023-10-10'
const hospital = {
    name: 'xx医院',
    businessHours: '周一至周五',
    deadline: '采血截止时间10:00',
    telephone: '123xxxxxxx',
    address: 'xx省xx市',
}
const packageType = {
    name: '男士套餐',
}

const dataShow = [
    {
        title: '体检人信息',
        contents: [
            ['姓名：', users.realName],
            ['证件号码：', users.identityCard],
            ['出生日期：', users.birthday],
            ['手机号码：', users.userPhone],
        ],
    },
    { title: '体检日期', contents: [[dateSelected]] },
    {
        title: '体检机构',
        contents: [
            [hospital.name],
            ['营业时间：', hospital.businessHours],
            ['采血截止：', hospital.deadline],
            ['机构电话：', hospital.telephone],
            ['机构地址：', hospital.address],
        ],
    },
    { title: '套餐类型', contents: [[packageType.name]] },
]

//------------------------------ events ------------------------------

function pay() {
    router.push('/appointment-success')
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
