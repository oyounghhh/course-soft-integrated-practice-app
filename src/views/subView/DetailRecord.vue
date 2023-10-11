<template>
    <ViewHeader :title="title"></ViewHeader>

    <nav class="nav">
        <div
            class="nav-item"
            :class="{ active: navFlagRef === 'general' }"
            @click="changeNavFlag('general')"
        >
            总检结论
        </div>
        <div
            class="nav-item"
            :class="{ active: navFlagRef === 'detailed' }"
            @click="changeNavFlag('detailed')"
        >
            报告详情 - 体检各项检测值
        </div>
    </nav>

    <div class="nav-content">
        <template v-if="navFlagRef === 'general'">
            <div class="nav-content-item">
                <div class="title">异常项</div>
                <ul v-if="isShowErrorListRef">
                    <li
                        v-for="item in generalRecordRef.errorCheckItemArr"
                        :key="item.cidrId"
                        class="content-item-li key-value-li"
                    >
                        <div class="key">
                            <span class="abnormal-icon">异</span>
                            <span class="key-name">{{ item.name }}</span>
                        </div>
                        <div class="value">
                            <p>{{ item.value }} {{ item.unit }}</p>
                            <p>正常值范围：{{ item.normalValueString }}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="nav-content-item">
                <div class="title">一、尊敬的顾客，您本次体检结论如下：</div>
                <ul v-if="isShowOverallRef">
                    <li
                        v-for="(
                            item, index
                        ) in generalRecordRef.overallResultArr"
                        :key="item.orId"
                        class="content-item-li one-line-li"
                    >
                        {{ `${index + 1}、${item.title}` }}
                    </li>
                </ul>
            </div>
            <div class="nav-content-item">
                <div class="title">
                    二、尊敬的顾客，您本次体检建议信息日下：
                </div>
                <ul>
                    <li
                        v-for="(
                            item, index
                        ) in generalRecordRef.overallResultArr"
                        :key="item.orId"
                        class="content-item-li head-content-li"
                    >
                        <h3>{{ `${index + 1}、${item.title}` }}</h3>
                        <p>{{ item.content }}</p>
                    </li>
                </ul>
            </div>
        </template>
        <template v-else-if="navFlagRef === 'detailed'">
            <div
                v-for="ci of detailRecordRef"
                :key="ci.cirId"
                class="nav-content-item"
            >
                <div class="title">{{ ci.ciName }}</div>
                <ul>
                    <li
                        v-for="item in ci.cidrList"
                        :key="item.cidrId"
                        class="content-item-li key-value-li"
                    >
                        <div class="key">
                            <span v-if="item.isError" class="abnormal-icon"
                                >异</span
                            >
                            <span class="key-name">{{ item.name }}</span>
                        </div>
                        <div class="value">
                            <p>
                                {{ item.value }}
                                {{ item.type === SIMPLE_INFO ? '' : item.unit }}
                            </p>
                            <p v-if="item.normalValueString">
                                正常值范围：{{ item.normalValueString }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import ViewHeader from '@/components/ViewHeader.vue'

import requestOrdersById from '@/request/orders/requestOrdersById'
import getCiReportByOrderId from '@/request/ciReport/getCiReportByOrderId'
import requestOverallResultByOrderId from '@/request/overallResult/requestOverallResultByOrderId'
import { formatChineseDate } from '@/utils/common'

const title = ref('体检报告')

const route = useRoute()
const orderId = route.query.orderId
const SIMPLE_INFO = 'simpleInfo'

const navFlagRef = ref('general')
const isShowErrorListRef = ref(false)
const isShowOverallRef = ref(false)
const generalRecordRef = ref({})
const detailRecordRef = ref()

/////////////////////////////////////////
function changeNavFlag(navFlag) {
    navFlagRef.value = navFlag
}

//------------------------------ life cycle ------------------------------
onBeforeMount(async () => {
    await getOrdersById(orderId)
    await getCiReports(orderId)
    isShowErrorListRef.value = true
    await getOverallResult(orderId)
    isShowOverallRef.value = true
})

//------------------------------ fetch data ------------------------------

async function getOrdersById(orderId) {
    const order = await requestOrdersById(orderId)
    title.value = `${formatChineseDate(order.orderDate)} ${title.value}`
}

async function getCiReports(orderId) {
    const ciReportArr = await getCiReportByOrderId(orderId)
    const errorCheckItemArr = []
    // 提取异常项
    ciReportArr.forEach((ciReport) => {
        ciReport.cidrList.forEach((item) => {
            if (item.isError) {
                errorCheckItemArr.push(item)
            }
        })
    })
    generalRecordRef.value.errorCheckItemArr = errorCheckItemArr
    detailRecordRef.value = ciReportArr
}

async function getOverallResult(orderId) {
    const overallResultArr = await requestOverallResultByOrderId(orderId)
    generalRecordRef.value.overallResultArr = overallResultArr
}
</script>

<style scoped lang="scss">
.nav {
    display: flex;
    align-items: center;
    background-color: #f9f9f9;

    .nav-item {
        flex: 1 0 auto;
        padding: 15px;
        text-align: center;
        color: #555;
        border-bottom: 2px solid transparent;

        &.active {
            border-bottom-color: #137e92;
            color: #137e92;
        }
    }
}

.nav-content {
    /////////////////////// 通用结构
    .nav-content-item {
        margin-top: 20px;
        padding: 10px;
        .title {
            font-size: 1rem;
            color: white;
            padding: 10px;
            padding-left: 15px;
            border-radius: 10px 10px 0 0;
            background-color: #7bafd7;
        }

        .content-item-li {
            padding: 10px;
            &:not(:last-of-type) {
                border-bottom: 1px solid #eee;
            }
        }
        .key-value-li {
            display: flex;
            align-items: center;
            .key,
            .value {
                flex: 1;
            }
        }
        .one-line-li {
            padding: 10px;
        }
        .head-content-li {
            h3 {
                margin: 10px 0;
            }
            p {
                text-indent: 1rem;
            }
        }
    }
    /////////////////////// 特定项结构
    .nav-content-item {
        ///////////////异常项
        .abnormal-icon {
            background-color: red;
            color: white;
            font-size: 0.8rem;
            padding: 2px 4px;
            margin-right: 2px;
            border-radius: 4px;
        }
    }
}
</style>
