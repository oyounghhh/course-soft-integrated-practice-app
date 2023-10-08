<template>
    <i class="icon-box" :style="{ width, height }">
        <slot class="icon"></slot>
    </i>
</template>

<script setup>
const props = defineProps({
    width: {
        type: String,
        required: false,
    },
    height: {
        type: String,
        required: false,
    },
})
</script>

<style scoped lang="scss">
.icon-box {
    display: block;
    width: 60px;
    height: 60px;
}
.icon {
    width: 100%;
    height: 100%;
}
</style>
