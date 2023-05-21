import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import PageNotFound from '@/views/NotFound.vue'
import TeacherTable from '@/views/teacher/TeacherTable.vue';
import TeacherOrder from '@/views/teacher/TeacherOrder.vue';
import TeacherProfile from '@/views/teacher/TeacherProfile.vue';
import LibrarianTable from '@/views/librarian/LibrarianTable.vue'
import PriceList from '@/views/librarian/PriceList.vue';
import OrderList from '@/views/librarian/OrderList.vue';
import AdminTable from '@/views/admin/AdminTable.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
	  children: [
		{
			path: '/teacher',
			props: true,
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
			path: '/admin',
			name: 'admin-main',
			component: AdminTable,
		},
		{
			path: '/admin/:table',
			name: 'admin-table',
			props: true,
			component: AdminTable,
		},
	  ]
    },
	{ 
		path: "/:catchAll(.*)", 
		name: 'PageNotFound',
		component: PageNotFound 
	}
  ],
})

export default router
