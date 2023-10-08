<template>
    <div class="wrapper">
        <h1>体检预约-登录</h1>
        <form class="wrapper-content">
            <div class="box-item input-box">
                <label for="phone">
                    <i class="icon-box">
                        <svg
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M511.913993 941.605241c-255.612968 0-385.311608-57.452713-385.311608-170.810012 0-80.846632 133.654964-133.998992 266.621871-151.88846L393.224257 602.049387c-79.986561-55.904586-118.86175-153.436587-118.86175-297.240383 0-139.33143 87.211154-222.586259 233.423148-222.586259l7.912649 0c146.211994 0 233.423148 83.254829 233.423148 222.586259 0 54.184445 0 214.67361-117.829666 297.412397l-0.344028 16.685369c132.966907 18.061482 266.105829 71.041828 266.105829 151.716445C897.225601 884.152528 767.526961 941.605241 511.913993 941.605241zM507.957668 141.567613c-79.470519 0-174.250294 28.382328-174.250294 163.241391 0 129.698639 34.230808 213.469511 104.584579 255.784982 8.944734 5.332437 14.277171 14.965228 14.277171 25.286074l0 59.344868c0 15.309256-11.524945 28.0383-26.662187 29.414413-144.319839 14.449185-239.959684 67.429531-239.959684 95.983874 0 92.199563 177.346548 111.637158 325.966739 111.637158 148.792206 0 325.966739-19.26558 325.966739-111.637158 0-28.726356-95.639845-81.534688-239.959684-95.983874-15.48127-1.548127-27.006215-14.621199-26.662187-30.102469l1.376113-59.344868c0.172014-10.148833 5.676466-19.437594 14.277171-24.770032 70.525785-42.487485 103.208466-123.678145 103.208466-255.784982 0-135.031077-94.779775-163.241391-174.250294-163.241391L507.957668 141.567613 507.957668 141.567613z"
                                fill="#575B66"
                            ></path>
                        </svg>
                    </i>
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
                    <i class="icon-box">
                        <svg
                            t="1695872235533"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="5146"
                        >
                            <path
                                d="M839.68 384h-43.52v-97.28C796.16 135.68 673.28 10.24 519.68 10.24S245.76 135.68 245.76 286.72V384H184.32c-46.08 0-84.48 38.4-84.48 84.48v460.8c0 46.08 38.4 84.48 84.48 84.48h657.92c46.08 0 84.48-38.4 84.48-84.48v-460.8c-2.56-46.08-40.96-84.48-87.04-84.48z m-529.92-97.28c0-115.2 94.72-212.48 212.48-212.48s212.48 94.72 212.48 212.48V384H309.76v-97.28z m550.4 642.56c0 10.24-7.68 20.48-20.48 20.48H184.32c-10.24 0-20.48-7.68-20.48-20.48v-460.8c0-10.24 7.68-20.48 20.48-20.48h657.92c10.24 0 20.48 7.68 20.48 20.48v460.8z"
                                fill="#737373"
                                p-id="5147"
                            ></path>
                            <path
                                d="M512 814.08c-20.48 0-38.4-17.92-38.4-38.4v-156.16c0-20.48 17.92-38.4 38.4-38.4s38.4 17.92 38.4 38.4v156.16c0 20.48-17.92 38.4-38.4 38.4z"
                                fill="#737373"
                                p-id="5148"
                            ></path>
                        </svg>
                    </i>
                </label>
                <input
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
    height: 100%;
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
.icon-box {
    display: inline-block;
    --width: 23px;
    width: var(--width, 27px);
    height: var(--width, 27px);
    .icon {
        width: 100%;
        height: 100%;
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
