<template>
    <header>
        <button @click="back" class="back">
            <IconBox>
                <SvgBack />
            </IconBox>
        </button>
        <p class="title">{{ props.title }}</p>
    </header>
</template>

<script setup>
import IconBox from '@/components/IconBox.vue'
import SvgBack from '@/assets/svg/back.svg'

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

<style scoped lang="scss">
header {
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;

    --back-width: 40px;

    button {
        margin: 0;
        padding: 0;
        background-color: transparent;
        border: none;
    }
    .back {
        flex: 0 0 auto;
        width: var(--back-width);
        margin: 0 10px;
    }
    .title {
        flex: 1 0 auto;
        font-size: 1.2rem;
        padding-right: var(--back-width);
        text-align: center;
    }
}
</style>
