import { createRouter, createWebHistory } from 'vue-router'
import register from '../views/Register.vue'
import Login from '../views/Login.vue'
import dashboard from '../views/Dashboard.vue'
import feed from '../views/Posts/Posts.vue'
import CreatePost from '../views/Posts/buat_postingan.vue'
import ChangeUser from '../views/ChangeUser.vue'
import chat from '../views/Message.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //authorization
    {
      path: '/register',
      name: 'register',
      component: register
    },    {
      path: '/chat',
      name: 'chat',
      component: chat
    },
    {
      path: '/change-user',
      name: 'ChangeUser',
      component: ChangeUser
    },   
    {
      path: '/login',
      name: 'Login',
      component: Login
    },    
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },   {
      path: '/',
      name: 'feed',
      component: feed
    }, {
      path: '/posts', 
    component: CreatePost,
    name: 'createPost' 
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
