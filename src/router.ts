import Vue from 'vue';
import Router from 'vue-router';
import Signup from './views/Signup.vue';
import Chat from './views/Chat.vue';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ],
});
