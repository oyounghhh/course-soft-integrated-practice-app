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

router.beforeEach((to) => {
    const toPath = to.path
    const isLogin = getSessionStorage('isLogin')

    if (!publicPath.includes(toPath)) {
        if (!isLogin) {
            return '/login'
        }
    }
})

export default router
