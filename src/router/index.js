import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Editor from '../components/Editor'
import Dashboard from '../components/Dashboard'
import Posts from '../components/Dashboard/Posts'
import Images from '../components/Dashboard/Images'
import Category from '../components/Dashboard/Category'

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
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
    children: [{
      path: '/dashboard/posts',
      name: 'posts',
      component: Posts,
      meta: {
        requiresAuth: true
      }
    },{
      path: '/dashboard/category',
      name: 'category',
      component: Category,
      meta: {
        requiresAuth: true
      }
    },{
      path: '/dashboard/images',
      name: 'images',
      component: Images,
      meta: {
        requiresAuth: true
      }
    }]
  }, {
    path: '/editor',
    name: 'editor',
    component: Editor,
    meta: {
      requiresAuth: true,
      callback:function() {
        localStorage.setItem('currentPostID','');
      }
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
      if (to.meta.callback) {
      console.log(to);
        to.meta.callback();
      }
      next();
    }
  } else {
    next();
  }
})


export default router
