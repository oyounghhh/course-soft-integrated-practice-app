<template>
    <div class="wrapper" ref="wrapperEle">
        <ViewHeader title="注册" />
        <h1>欢迎注册</h1>
        <form @focusin="focusin" @focusout="focusout">
            <label class="label" for="phone">手机号码</label>
            <input
                type="number"
                id="phone"
                placeholder="请输入手机号码"
                v-model="usersRef.userId"
            />
            <!-- <span class="line"></span> -->
            <label class="label" for="realname">真实姓名</label>
            <input
                type="text"
                id="realname"
                placeholder="真实姓名便于查看体检报告"
                v-model="usersRef.realName"
            />
            <!-- <span class="line"></span> -->
            <label class="label" for="birthday">生日</label>
            <input type="date" id="birthday" v-model="usersRef.birthday" />
            <!-- <span class="line"></span> -->
            <p class="label">性别</p>
            <div>
                <input
                    type="radio"
                    name="gender"
                    id="man"
                    value="1"
                    v-model="usersRef.sex"
                />
                <label for="man"> 男 </label>
                <input
                    type="radio"
                    name="gender"
                    id="woman"
                    value="0"
                    v-model="usersRef.sex"
                />
                <label for="woman"> 女 </label>
            </div>
            <!-- <span class="line"></span> -->
            <label class="label" for="user-id">身份证号</label>
            <input
                type="number"
                id="user-id"
                placeholder="请输入身份证号"
                v-model="usersRef.identityCard"
            />
            <!-- <span class="line"></span> -->
            <label class="label" for="password-first">密码</label>
            <input
                autocomplete
                type="password"
                id="password-first"
                placeholder="请输入密码"
                v-model="usersRef.password"
            />
            <!-- <span class="line"></span> -->
            <label class="label" for="password-again">密码</label>
            <input
                autocomplete
                type="password"
                id="password-again"
                placeholder="请再次输入密码"
                v-model="usersRef.passwordAgain"
            />
            <!-- <span class="line"></span> -->
            <button id="register" @click.prevent="register">注册</button>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import ViewHeader from '@/components/ViewHeader.vue'

import requestRegister from '@/request/users/register'
import requestUserInfo from '@/request/users/userInfo'

const router = useRouter()
const wrapperEle = ref(null)

const usersRef = ref({
    userId: '',
    password: '',
    passwordAgain: '',
    realName: '',
    sex: 1,
    identityCard: '',
    birthday: '',
})

async function register() {
    if (!validate(usersRef.value)) {
        return
    }

    const usersData = usersRef.value
    usersData.identityCard = usersData.identityCard.toString()
    usersData.userId = usersData.userId.toString()

    try {
        const isHad = await requestUserInfo({ userId: usersData.userId })
        if (isHad) {
            alert('该手机号码已注册')
            return
        }
        const isSucceed = await requestRegister(usersData)
        if (isSucceed > 0) {
            alert('注册成功')
            router.push({ name: 'Login' })
        } else {
            alert('注册失败')
        }
    } catch (err) {
        alert(err.message)
    }
}

function focusin() {
    wrapperEle.value.style.minHeight = `150vh`
}
function focusout() {
    if (wrapperEle.value) {
        wrapperEle.value.style.minHeight = ''
    }
}

/////////////////////////////////////

function validate(users) {
    if (users.userId === '') {
        alert('手机号码不能为空！')
        return false
    }
    if (users.realName === '') {
        alert('真实姓名不能为空！')
        return false
    }
    if (users.birthday === '') {
        alert('生日不能为空！')
        return false
    }
    if (users.identityCard === '') {
        alert('身份证号不能为空！')
        return false
    }
    if (users.password === '') {
        alert('密码不能为空！')
        return false
    }
    if (users.password !== users.passwordAgain) {
        alert('两次输入密码不一致！')
        return false
    }
    return true
}
</script>

<style scoped lang="scss">
.wrapper {
    --left: 10px;
    min-height: 100vh;

    h1 {
        margin-top: 10px;
        margin-left: var(--left);
    }

    form {
        width: 100%;
        padding: 15px;
        padding-left: var(--left);
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-auto-rows: minmax(30px, auto);
        column-gap: 10px;
        row-gap: 10px;
        align-items: end;

        input {
            border: none;
            border-bottom: 1px solid #ccc;
        }

        #register {
            grid-column: 1/3;
            margin: 10px 20px;
            border: none;
            padding: 10px;
            border-radius: 4px;
            color: white;
            font-size: 1rem;
            background-color: #70b0bc;
        }
        #register:active {
            filter: brightness(1.1);
        }
    }
}

@media screen and (min-width: 450px) {
    .wrapper {
        width: 450px;
        margin: auto;
    }
}
</style>
