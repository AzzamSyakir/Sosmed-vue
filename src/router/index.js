import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Posts from '@/views/Posts/Posts.vue';
import CreatePost from '@/views/Posts/BuatPostingan.vue';
import ChangeUser from '@/views/ChangeUser.vue';
import Chat from '@/views/Conversation.vue';
import SearchUser from '@/views/SearchUser.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import AboutView from '@/views/AboutView.vue';

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/search-user',
    name: 'search-user',
    component: SearchUser,
  },
  {
    path: '/ProfilePage/:username',
    name: 'ProfilePage',
    component: ProfilePage,
  },  
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
  },
  {
    path: '/change-user',
    name: 'change-user',
    component: ChangeUser,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/',
    name: 'posts',
    component: Posts,
  },
  {
    path: '/create-post',
    name: 'create-post',
    component: CreatePost,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
