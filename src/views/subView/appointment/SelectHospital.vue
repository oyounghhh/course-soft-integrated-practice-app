<template>
    <ViewHeader title="请选择体检机构"></ViewHeader>

    <main v-if="isShowAllHospital">
        <div
            v-for="hospital of hospitalArrRef"
            :key="hospital.hpId"
            class="hospital-item"
            @click="(evt) => toHospital(evt, hospital.hpId)"
        >
            <div class="grid-top">
                <h2 class="title">
                    <span>{{ hospital.name }}</span>
                    <IconBox width="20px">
                        <SvgEnter />
                    </IconBox>
                </h2>
            </div>
            <div class="grid-mid-left">
                <div class="hospital-picture">
                    <img :src="hospital.picture" alt="医院图片" />
                </div>
            </div>
            <div class="grid-mid-right hospital-info">
                <p class="info-item">
                    <span class="font-bold">营业时间</span>
                    <span>{{ hospital.businessHours }}</span>
                </p>
                <p class="info-item">
                    <span class="font-bold">采血截止</span>
                    <span>{{ hospital.deadline }}</span>
                </p>
                <p class="info-item">
                    <span class="font-bold">电话</span>
                    <span>{{ hospital.telephone }}</span>
                </p>
                <p class="info-item">
                    <span class="font-bold">地址</span>
                    <span>{{ hospital.address }}</span>
                </p>
            </div>
            <div class="grid-bottom hospital-other">
                <button class="item" @click.stop>
                    <IconBox width="20px"> <SvgContact /> </IconBox>
                    <span>联系我们</span>
                </button>
                <button class="item" @click.stop>
                    <IconBox width="20px"> <SvgAddress /> </IconBox>
                    <span>查找位置</span>
                </button>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import IconBox from '@/components/IconBox.vue'
import ViewHeader from '@/components/ViewHeader.vue'
import SvgEnter from '@/assets/svg/enter.svg'
import SvgContact from '@/assets/svg/contact.svg'
import SvgAddress from '@/assets/svg/address.svg'

import requestAllHospital from '@/request/hospital/listHospital'
import { onBeforeMount } from 'vue'

const router = useRouter()
const hospitalArrRef = ref([])
const isShowAllHospital = ref(false)

///////////////////////////////////

function toHospital(evt, id) {
    router.push(`/select-package/${id}`)
}

//------------------------------ life cycle ------------------------------
onBeforeMount(async () => {
    await getAllHospital()
    isShowAllHospital.value = true
})

//------------------------------ fetch data ------------------------------

async function getAllHospital() {
    const hospitalArr = await requestAllHospital()
    hospitalArrRef.value = hospitalArr
}
</script>

<style scoped lang="scss">
////////////////////////////结构

// 医院 item 的 grid 布局结构
.hospital-item {
    display: grid;
    padding: 10px;
    gap: 10px;
    margin: 15px;

    grid-template-areas:
        'top top'
        'left right'
        'bottom  bottom';

    .grid-top {
        grid-area: top;
    }
    .grid-mid-left {
        width: 100px;
        grid-area: left;
    }
    .grid-mid-right {
        grid-area: right;
    }
    .grid-bottom {
        grid-area: bottom;
    }
}
// “医院介绍”结构
.hospital-info {
    .info-item {
        display: flex;
        padding: 5px 0;
        & > span:first-child {
            flex: 0 0 auto;
            margin-right: 5px;
        }
    }
}

// “医院其他”结构
.hospital-other {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .item {
        padding: 3px 12px;
        margin: 0 6px;

        display: flex;
        align-items: center;
        justify-content: space-evenly;

        span {
            margin: 0 6px;
        }
    }
}
///////////////////////  样式

// “医院 item”样式
.hospital-item {
    box-shadow: 0 0 10px 1px #ddd;
    border-radius: 5px;
    padding-bottom: 20px;
}

// “医院标题”样式
.title {
    font-size: 1.2rem;
    border-left: 4px solid #3b8fa9;
    padding: 0 6px;
    margin: 10px 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    :deep(path) {
        fill: black;
    }
}
// 医院封面样式
.hospital-picture {
    width: 100px;
    height: 100px;
}

// “医院其他”样式
.hospital-other .item {
    --color: #529db3;
    background-color: white;
    border: 1px solid var(--color);
    border-radius: 5px;
    font-size: 1rem;
    color: var(--color);
}
</style>
