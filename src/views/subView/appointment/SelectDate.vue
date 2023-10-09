<template>
    <ViewHeader :title="title"></ViewHeader>
</template>

<script setup>
import { useRoute } from 'vue-router'
import ViewHeader from '@/components/ViewHeader.vue'

const route = useRoute()
const { hospitalId, packageId } = route.query
const title = `医院${hospitalId}-套餐${packageId}-选择体检日期`
</script>
