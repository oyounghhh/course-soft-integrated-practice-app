<template>
    <h1>个人中心</h1>
    <section>
        <div class="info-box">
            <div class="content">
                <img class="avatarImg" :src="users.avatarUrl" alt="avatar" />
                <div class="user-info">
                    <p>{{ users.realName }}</p>
                    <p>账号: {{ users.userId }}</p>
                </div>
            </div>
        </div>
        <ul class="menus-ul">
            <li v-for="menu of menus" class="menu-li">
                <router-link :to="menu.routeTo" class="menu-item"
                    ><p class="title-wrap">
                        <IconBox width="24px" height="24px">
                            <component :is="menu.icon" />
                        </IconBox>
                        <span>{{ menu.title }}</span>
                    </p>
                    <IconBox width="20px" height="20px">
                        <SvgEnter />
                    </IconBox>
                </router-link>
            </li>
            <li class="menu-li">
                <button to="/personal" class="menu-item logout" @click="logout">
                    <p class="title-wrap">
                        <IconBox width="24px" height="24px">
                            <SvgLogout />
                        </IconBox>
                        <span>退出登录</span>
                    </p>
                    <IconBox width="20px" height="20px">
                        <SvgEnter />
                    </IconBox>
                </button>
            </li>
        </ul>
    </section>
    <FooterNavigate />
</template>

<script setup>
import FooterNavigate from '@/components/FooterNavigate.vue'
import IconBox from '@/components/IconBox.vue'
import SvgAppointment from '@/assets/svg/appointment.svg'
import SvgEnter from '@/assets/svg/enter.svg'
import SvgLogout from '@/assets/svg/logout.svg'
import SvgService from '@/assets/svg/service.svg'
import SvgDoctor from '@/assets/svg/doctor.svg'
import SvgBill from '@/assets/svg/bill.svg'
import SvgShopOrder from '@/assets/svg/shop-order.svg'

import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { setSessionStorage } from '@/utils/storage'

const menus = [
    { routeTo: '/my-appointment', title: '我的预约', icon: SvgAppointment },
    { routeTo: '/personal', title: '我的服务', icon: SvgService },
    { routeTo: '/personal', title: '我的医生', icon: SvgDoctor },
    { routeTo: '/personal', title: '问诊订单', icon: SvgBill },
    { routeTo: '/personal', title: '商城订单', icon: SvgShopOrder },
]

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

    .menus-ul > .menu-li:not(:last-of-type) {
        border-bottom: 1px solid #eee;
    }
    .menus-ul > .menu-li > .menu-item {
        color: black;
        font-size: 1rem;
        background-color: transparent;

        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title-wrap {
            display: flex;

            span {
                margin-left: 6px;
                font-size: 1.1rem;
                color: black;
            }
        }
    }
    .logout {
        border: none;
        width: 100%;
        height: 100%;
    }
    .logout:active {
        filter: brightness(1.1);
    }
}
</style>
