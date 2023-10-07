<template>
    <header>
        <button @click="back" class="back">&lt;</button>
        <span class="title">{{ props.title }}</span>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
})

function back() {
    router.back()
}
</script>

<style scoped>
header {
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
}
header .back {
    margin: 0 10px;
    font-size: 1.5rem;
    font-weight: bold;
    justify-self: start;
}
header .title {
    font-size: 1.2rem;
}
</style>
