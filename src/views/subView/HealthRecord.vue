<template>
    <ViewHeader title="健康档案"></ViewHeader>
    <div class="cover">
        <img :src="recordCoverImg" alt="封面" />
    </div>
    <ul>
        <li
            v-for="record of records"
            class="record-li"
            @click="(evt) => toDetailRepord(evt, record.id)"
        >
            <div class="record-icon">
                <IconBox width="60px" height="60px">
                    <SvgRecord />
                </IconBox>
            </div>
            <div class="intro">
                <p>{{ record.title }}</p>
                <p>{{ record.source }}</p>
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

const records = [
    {
        id: '1',
        title: '2021年11月24日体检报告',
        source: '沈阳熙康云医健康管理中心',
    },
    { id: '2', title: '2019年05月11日体检报告', source: '沈阳熙康云医院' },
]

function toDetailRepord(evt, recordId) {
    router.push(`/detail-record/${recordId}`)
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
