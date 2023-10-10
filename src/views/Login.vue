<template>
    <div class="wrapper">
        <h1>体检预约-登录</h1>
        <form class="wrapper-content">
            <div class="box-item input-box">
                <label for="phone">
                    <IconBox>
                        <SvgUser />
                    </IconBox>
                </label>
                <input
                    type="number"
                    id="phone"
                    placeholder="输入手机号"
                    v-model="loginInfoRef.phone"
                />
            </div>
            <div class="box-item input-box">
                <label for="password">
                    <IconBox>
                        <SvgPassword />
                    </IconBox>
                </label>
                <input
                    autocomplete
                    type="password"
                    id="password"
                    placeholder="输入登录密码"
                    v-model="loginInfoRef.password"
                />
            </div>
            <div class="box-item option-box">
                <router-link to="/register">注册</router-link>
                <p>忘记密码？</p>
            </div>
            <div class="box-item button-box">
                <button @click.prevent="login">
                    登录
                    <span class="loading-span" :class="{ logining: isLogining }"
                        >......</span
                    >
                </button>
            </div>
        </form>

        <footer>
            <div class="contact-tips">
                <span class="line"></span>
                <p class="tip-title">有疑问请联系客服</p>
                <span class="line"></span>
            </div>
            <p>4008-XXX-XXX</p>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { requestPost } from '@/request/index'
import { setSessionStorage } from '@/utils/storage'

import IconBox from '@/components/IconBox.vue'
import SvgUser from '@/assets/svg/user.svg'
import SvgPassword from '@/assets/svg/password.svg'

const router = useRouter()

const loginInfoRef = ref({
    phone: '',
    password: '',
})

const isLogining = ref(false)

function login() {
    if (isLogining.value || !validLoginInfo(loginInfoRef.value)) {
        return
    }
    isLogining.value = true
    const phone = loginInfoRef.value.phone
    const password = loginInfoRef.value.password
    requestPost('/login', {
        phone,
        password,
    })
        .then((data) => {
            if (data.status === 'OK') {
                router.push('/')
                setSessionStorage('isLogin', true)
            } else {
                alert('登录错误')
            }
        })
        .catch((error) => {
            alert(error.message)
        })
        .finally(() => {
            isLogining.value = false
        })
}

///////////////// util ////////////////////
function validLoginInfo(loginInfo) {
    const phone = loginInfo.phone
    const password = loginInfo.password
    if (!phone) {
        alert('请输入手机号')
        return false
    }
    if (!password) {
        alert('请输入密码')
        return false
    }
    return true
}
</script>

<style scoped lang="scss">
/*********************** 总容器 ***********************/
.wrapper {
    width: 100%;
    min-height: 100vh;
    background-image: linear-gradient(45deg, #266c9f, #266c9f, #7eb059);
    overflow: hidden;

    /*********************** 标题部分 ***********************/
    h1 {
        text-align: center;
        color: #fff;
        font-size: 2rem;
        font-weight: bold;
        margin: 50px 0;
    }

    /*********************** 内容部分 ***********************/
    .wrapper-content {
        width: 86%;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 15px;

        box-sizing: border-box;
        padding: 20px;

        .box-item {
            width: 100%;
            height: 45px;
            padding: 0 5px;
            margin: 10px 0;
            overflow: hidden;
        }

        .input-box {
            border: 1px solid #ccc;
            border-radius: 7px;
            display: flex;
            align-items: center;

            label {
                margin: 0 5px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            input {
                font-size: 1rem;
                flex-grow: 1;
                border: none;
                outline: none;
            }
        }
        .option-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .button-box {
            button {
                width: 100%;
                height: 100%;
                border: none;
                background-color: #70b0bc;
                color: white;
                border-radius: 8px;
                font-size: 1.2rem;
                .loading-span {
                    display: none;
                    overflow: hidden;

                    &.logining {
                        width: 0rem;
                        display: inline-block;
                        animation: loading 3s infinite forwards;
                    }
                }
            }
            button:active {
                filter: brightness(1.1);
            }
        }
    }

    /*********************** footer部分 ***********************/
    footer {
        width: 86%;
        margin: 20px auto;
        display: flex;
        flex-direction: column;

        --color: #eee;

        .contact-tips {
            margin: 10px 0;
            display: flex;
            justify-content: space-evenly;
            align-items: center;

            .line {
                flex: 1;
                height: 1px;
                flex-basis: 30px;
                background-color: var(--color, #ccc);
            }
            .tip-title {
                color: var(--color, #ccc);
                margin: 0 10px;
            }
        }
        p {
            color: var(--color, #ccc);
            text-align: center;
        }
    }
}
@media screen and (min-width: 450px) {
    .wrapper {
        margin: auto;
        width: 450px;
    }
}
@keyframes loading {
    0% {
        width: 0rem;
    }
    50% {
        width: 2rem;
    }
    100% {
        width: 0rem;
    }
}
</style>
