import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Editor from '../components/Editor'
import { isLoggedIn } from '../api/api'

Vue.use(Router)

let router = new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  }, {
    path: '/editor',
    name: 'editor',
    component: Editor,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '*',
    redirect: '/editor',
  }]
})

router.beforeEach((to, form, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({ name: 'login' })
    } else {
      next();
    }
  } else {
    next();
  }
})


export default router
