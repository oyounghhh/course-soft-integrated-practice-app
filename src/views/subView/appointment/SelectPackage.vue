<template>
    <ViewHeader title="选择体检套餐"></ViewHeader>

    <main v-if="isShowAllSetmealRef">
        <div
            class="package"
            v-for="pack of packages"
            @click="(evt) => toSelectData(evt, pack.smId)"
        >
            <div class="package-info">
                <p class="font-bold">{{ packTypeMapping(pack.type) }}</p>
                <p class="font-color-not-main">{{ pack.name }}</p>
            </div>
            <div class="package-defail-toggle">
                <button
                    class="flex-level-center"
                    @click.stop="pack.isShow = !pack.isShow"
                >
                    <span>详细</span>
                    <IconBox width="20px">
                        <SvgPullDown />
                    </IconBox>
                </button>
            </div>
            <table
                @click.stop
                class="package-defail-contnet"
                v-show="pack.isShow"
            >
                <thead>
                    <tr>
                        <th>检查项目</th>
                        <th>检查内容</th>
                        <th>检查意义</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="packDetail in pack.sdList"
                        :key="packDetail.sdId"
                    >
                        <td>{{ packDetail.checkItem.ciName }}</td>
                        <td>{{ packDetail.checkItem.ciContent }}</td>
                        <td>{{ packDetail.checkItem.meaning }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import requestArrSetmeal from '@/request/setmeal/arrSetmeal'

import ViewHeader from '@/components/ViewHeader.vue'
import IconBox from '@/components/IconBox.vue'
import SvgPullDown from '@/assets/svg/pull-down.svg'

const isShowAllSetmealRef = ref(false)
const packages = ref([])

const packTypeMapping = (idSymbol) =>
    (['女士', '男士'][idSymbol] || '未知') + '套餐'

//////////////////////////////////

const route = useRoute()
const router = useRouter()
const hospitalId = route.params.id

function toSelectData(evt, packageId) {
    router.push({ path: '/select-date', query: { hospitalId, packageId } })
}

//------------------------------ life cycle ------------------------------

onBeforeMount(async () => {
    await getAllSetmeal()
    isShowAllSetmealRef.value = true
})

//------------------------------ fetch data ------------------------------

async function getAllSetmeal() {
    const setmealArr = await requestArrSetmeal()
    setmealArr.forEach((setmeal) => {
        setmeal.isShow = false
    })
    packages.value = setmealArr
}
</script>

<style scoped lang="scss">
// 结构
main {
    margin-top: 20px;
    padding: 10px;

    .package {
        display: grid;
        grid-template-areas:
            'info   btn'
            'detail detail';
        grid-template-columns: 1fr 70px;

        padding: 20px;
        padding-left: 40px;
        margin: 20px 0;

        .package-info {
            grid-area: info;
        }
        .package-defail-toggle {
            grid-area: btn;
            justify-self: center;
            align-self: center;
        }
        .package-defail-contnet {
            grid-area: detail;
            margin-top: 20px;
        }
    }
}

// 表格样式
table.package-defail-contnet {
    border-collapse: collapse;
    table-layout: fixed;

    td,
    th {
        padding: 8px 4px;
        text-align: left;
    }
    thead tr {
        border-top: 1px solid #ccc;
        border-bottom-color: #ccc;
    }
    tr {
        border-bottom: 1px solid #eee;
    }
}

// 样式
main {
    .package {
        box-shadow: 0 0 15px 1px #eee;
        border-radius: 10px;
        .package-info p {
            margin: 4px 0;
        }
        .package-defail-toggle {
            padding-left: 10px;
            border-left: 1px solid #eee;
            button {
                border: none;
                background-color: transparent;
            }
        }
    }
}
</style>
