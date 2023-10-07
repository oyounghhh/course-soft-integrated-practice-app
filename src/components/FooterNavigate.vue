<template>
    <footer>
        <nav>
            <router-link
                class="router-link"
                :class="{ active: curRouterName === 'Home' }"
                to="/"
            >
                <span>云医院</span>
            </router-link>
            <router-link
                class="router-link"
                :class="{ active: curRouterName === 'Shop' }"
                to="/"
            >
                <span>商城</span>
            </router-link>
            <router-link
                class="router-link"
                :class="{ active: curRouterName === 'More' }"
                to="/"
            >
                <span>发现</span>
            </router-link>
            <router-link
                class="router-link"
                :class="{ active: curRouterName === 'Personal' }"
                to="/personal"
            >
                <span>我</span>
            </router-link>
        </nav>
    </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const curRouterName = router.currentRoute.value.name
</script>

<style scoped>
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
}
</style>
