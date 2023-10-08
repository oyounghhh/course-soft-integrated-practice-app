<template>
    <footer>
        <nav>
            <router-link
                class="router-link"
                :class="{ active: curRouterName === 'Home' }"
                to="/"
            >
                <IconBox :width="width" :height="height">
                    <SvgHospital />
                </IconBox>
                <span>云医院</span>
            </router-link>
            <router-link
                class="router-link"
                :class="{ active: curRouterName === 'Shop' }"
                to="/"
            >
                <IconBox :width="width" :height="height">
                    <SvgShop />
                </IconBox>
                <span>商城</span>
            </router-link>
            <router-link
                class="router-link"
                :class="{ active: curRouterName === 'More' }"
                to="/"
            >
                <IconBox :width="width" :height="height">
                    <SvgFind />
                </IconBox>
                <span>发现</span>
            </router-link>
            <router-link
                class="router-link"
                :class="{ active: curRouterName === 'Personal' }"
                to="/personal"
            >
                <IconBox :width="width" :height="height">
                    <SvgUser />
                </IconBox>
                <span>我</span>
            </router-link>
        </nav>
    </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

import IconBox from '@/components/IconBox.vue'
import SvgHospital from '@/assets/svg/hospital.svg'
import SvgShop from '@/assets/svg/shop.svg'
import SvgFind from '@/assets/svg/find.svg'
import SvgUser from '@/assets/svg/user.svg'

const width = '20px'
const height = width

const router = useRouter()
const curRouterName = router.currentRoute.value.name
</script>

<style scoped lang="scss">
/*********************** footer ***********************/
footer {
    width: 100%;
    height: 55px;
    box-sizing: border-box;
    border-top: solid 1px #e9e9e9;
    background-color: #fff;

    position: fixed;
    left: 0;
    bottom: 0;
}
footer nav {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.router-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 1.1rem;
    color: #999;

    user-select: none;
    cursor: pointer;
}
.router-link:hover,
.router-link:active {
    filter: brightness(1.1);
}

.router-link.active {
    color: skyblue;

    :deep(path) {
        fill: skyblue;
    }
}
</style>
