import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'TodoCreate',
        component: () => import('../views/TodoCreate.vue')
    },
    {
        path: '/todos',
        name: 'TodoList',
        component: () => import('../views/TodoList.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
