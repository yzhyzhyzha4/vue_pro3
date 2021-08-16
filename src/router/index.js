import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: login
    }, {
        path: '/home',
        component: home
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        window.sessionStorage.removeItem('token')
        return next()
    } else {
        console.log(window.sessionStorage.getItem('token'));
        if (!window.sessionStorage.getItem('token')) {
            window.sessionStorage.removeItem('token')
            return next('/login');
        }
        next()
    }
})
export default router