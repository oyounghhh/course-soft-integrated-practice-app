<template>
    <ViewHeader title="用户体检预约"></ViewHeader>
    <main>
        <div class="cover">
            <img :src="coverImg" alt="预约封面" />
        </div>
        <nav>
            <div @click="bookSelf">
                <img :src="selfAppointmentImg" alt="本人预约" />
            </div>
            <div>
                <img :src="familyAppointmentImg" alt="家属预约" />
            </div>
        </nav>
    </main>
</template>

<script setup>
import ViewHeader from '@/components/ViewHeader.vue'
import coverImg from '@/assets/img/appointment-cover.png'
import familyAppointmentImg from '@/assets/img/appointment-family.png'
import selfAppointmentImg from '@/assets/img/appointment-self.png'

import { useRouter } from 'vue-router'

const router = useRouter()

function bookSelf() {
    router.push('/select-hospital')
}
</script>

<style scoped lang="scss">
nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    padding: 20px;
}
</style>
