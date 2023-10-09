<template>
    <ViewHeader :title="title"></ViewHeader>
</template>

<script setup>
import { useRoute } from 'vue-router'

import ViewHeader from '@/components/ViewHeader.vue'

const route = useRoute()

const title = `医院${route.params.id} - 选择体检套餐`
</script>
