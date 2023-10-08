<template>
    <i class="icon-box" :style="{ width, height }">
        <slot></slot>
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
    width: 30px;
    height: 30px;
}

.icon-box :deep(svg) {
    width: 100%;
    height: 100%;
}
</style>
