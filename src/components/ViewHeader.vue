<template>
    <header>
        <router-link class="back" :to="props.toRouter">&lt;</router-link>
        <span class="title">{{ props.title }}</span>
    </header>
</template>

<script setup>
const props = defineProps({
    toRouter: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
})
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
