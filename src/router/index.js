import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import { getSessionStorage } from '@/utils/storage'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 路由拦截

const publicPath = ['/login', '/register']

router.beforeEach((to, from) => {
    const toPath = to.path
    const isLogin = getSessionStorage('isLogin')
    console.log(isLogin, toPath)
    if (isLogin && toPath === '/login') {
        // 已经登录时，不允许进入登录页
        return false
    } else if (!isLogin && !publicPath.includes(toPath)) {
        // 未登录时，只允许进入公共页面
        return '/login'
    }
})

export default router
