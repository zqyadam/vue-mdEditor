import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  }]
})

router.beforeEach((to, form, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({ name: 'login' })
    }
  }
  next();
})


export default router
