import { createRouter, createWebHistory } from 'vue-router'
import mainPage from '@/components/main-page.vue';
import adminPanel from '@/components/admin-panel.vue';
import login from '@/components/login.vue';
import { isTokenValid } from '@/utils/tokenUtils';
import order from "@/components/order.vue";
import addPriceList from "@/components/add-price-list.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/main',
    name: 'main',
    component: mainPage
  },
  {
    path: '/adm-panel',
    name: 'adm-panel',
    component: adminPanel
  },
  {
    path: '/order',
    name: 'order',
    component: order
  },
  {
    path: '/add-price-list',
    name: 'add-price-list',
    component: addPriceList
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.path !== '/' && (!token || !isTokenValid(token))) {
    next('/');
  } else {
    next();
  }
});

export default router
