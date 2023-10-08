<template>
    <h1>个人中心</h1>
    <section>
        <div class="info-box">
            <div class="content">
                <img class="avatarImg" :src="users.avatarUrl" />
                <div class="user-info">
                    <p>{{ users.realName }}</p>
                    <p>账号: {{ users.userId }}</p>
                </div>
            </div>
        </div>
        <ul class="options-box">
            <li class="options-li">
                <router-link to="/personal" class="options-item"
                    ><span>我的预约</span> <span>></span></router-link
                >
            </li>
            <li class="options-li">
                <router-link to="/personal" class="options-item"
                    ><span>我的服务</span> <span>></span></router-link
                >
            </li>
            <li class="options-li">
                <router-link to="/personal" class="options-item"
                    ><span>我的医生</span> <span>></span></router-link
                >
            </li>
            <li class="options-li">
                <router-link to="/personal" class="options-item"
                    ><span>问诊订单</span> <span>></span></router-link
                >
            </li>
            <li class="options-li">
                <router-link to="/personal" class="options-item"
                    ><span>商城订单</span> <span>></span></router-link
                >
            </li>
            <li class="options-li">
                <button
                    to="/personal"
                    class="options-item logout"
                    @click="logout"
                >
                    <span>退出登录</span> <span>></span>
                </button>
            </li>
        </ul>
    </section>
    <FooterNavigate />
</template>

<script setup>
import FooterNavigate from '@/components/FooterNavigate.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { setSessionStorage } from '@/utils/storage'

const router = useRouter()
const users = ref({
    realName: '某某某',
    userId: '134*****1234',
    avatarUrl: 'https://pic.imgdb.cn/item/6304358116f2c2beb15e9a9b.jpg',
})

function logout() {
    if (window.confirm('确定退出登录吗？')) {
        setSessionStorage('isLogin', false)
        router.push('/login')
        // TODO: 发送退出登录请求
    }
}
</script>

<style scoped lang="scss">
h1 {
    text-align: center;
    font-size: 1.3rem;
    margin: 10px 0;
}

section {
    .info-box {
        padding: 10px 20px;
        background: linear-gradient(135deg, #74b263, #02a6c9);

        .content {
            height: 100px;
            display: flex;
            align-items: center;
            .avatarImg {
                margin-right: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                object-fit: cover;
            }
            .user-info {
                p {
                    color: white;
                    margin: 5px 0;
                    &:nth-of-type(1) {
                        font-size: 1.1rem;
                    }
                    &:not(:nth-of-type(1)) {
                        font-size: 0.9rem;
                        color: aliceblue;
                    }
                }
            }
        }
    }

    .options-box {
        .options-li {
            &:not(:last-of-type) {
                border-bottom: 1px solid #eee;
            }
            .options-item {
                color: black;
                font-size: 1rem;
                background-color: transparent;

                padding: 10px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                &.logout {
                    border: none;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>
