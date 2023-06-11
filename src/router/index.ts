import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import PageNotFound from '@/views/NotFound.vue'
import TeacherTable from '@/views/teacher/TeacherTable.vue'
import TeacherOrder from '@/views/teacher/TeacherOrder.vue'
import TeacherProfile from '@/views/teacher/TeacherProfile.vue'
import LibrarianTable from '@/views/librarian/LibrarianTable.vue'
import PriceList from '@/views/librarian/PriceList.vue'
import OrderList from '@/views/librarian/OrderList.vue'
import AdminMain from '@/views/admin/AdminMain.vue'
import OrderHistoryList from '@/views/librarian/OrderHistoryList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: '/teacher/:page',
          props: true,
          name: 'teacher-main-page',
          component: TeacherTable,
        },
		{
			path: '/teacher',
			name: 'teacher-main',
			component: TeacherTable,
		  },
        {
          path: '/order/:id',
          props: true,
          name: 'teacher-order',
          component: TeacherOrder,
        },
        {
          path: '/profile',
          props: true,
          name: 'teacher-profile',
          component: TeacherProfile,
        },

        {
          path: '/librarian',
          props: true,
          name: 'librarian-main',
          component: LibrarianTable,
        },
        {
          path: '/price-list',
          name: 'price-list',
          component: PriceList,
        },
        {
          path: '/order',
          name: 'order-list',
          component: OrderList,
        },
        {
          path: '/orders-history',
          name: 'orders-history',
          component: OrderHistoryList,
        },

        {
          path: '/admin',
          name: 'admin-main',
          component: AdminMain,
        },
        {
          path: '/admin/:table',
          name: 'admin-table',
          props: true,
          component: AdminMain,
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      name: 'PageNotFound',
      component: PageNotFound,
    },
  ],
})

export default router
