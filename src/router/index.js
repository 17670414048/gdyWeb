import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import axios from 'axios'
// 测试环境
//axios.defaults.baseURL = 'https://api.wiwcc.com'

// 正式环境
axios.defaults.baseURL = 'http://api.gongduyuan.com'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.withCredentials = true

Vue.prototype.$axios = axios

/**
 * 这里导入组件
 */
const pageHome = () => import('../components/pageHome.vue')
const lessonCollection = () => import('../components/gdyActivities/lessonCollection.vue')
const userInfoPage = () => import('../components/registrationPage/userInfoPage.vue')
const activeVideoPage = () => import('../components/activeVideoPage.vue')
const teachingMaterials = () => import('../components/registrationPage/teachingMaterials.vue')
const newsList = () => import('../components/news/newsList.vue')
const myNews = () => import('../components/news/myNews.vue')
const myContribute = () => import('../components/myContribute.vue')
//创建路由对象
const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/lessonCollection'
        },
        {
            path: '/lessonCollection',
            component: lessonCollection
        },
        {
            path: '/lessonCollection',
            component: lessonCollection
        },
        {
            path: '/userInfoPage',
            component: userInfoPage
        },
        {
            path: '/activeVideoPage',
            component: activeVideoPage
        },
        {
            path: '/teachingMaterials',
            component: teachingMaterials
        },
        {
            path: '/newsList',
            component: newsList,
            meta: {
               keepAlive: true, //此组件需要被缓存
             
            }
        },
        {
            path: '/myNews',
            component: myNews
        },
        {
            path: '/myContribute',
            component: myContribute
        }
    ]
})
//导航守卫
router.beforeEach((to, from, next) => {
    if (to.path == '/activeVideoPage') {
        if (sessionStorage.getItem('userLoginInfo')) {
            next();
        } else {
            router.push('/lessonCollection');
        }
    }
    console.log(to);
    next();
})

export {
    router
}