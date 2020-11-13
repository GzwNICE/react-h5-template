import Home from '@/pages/home';
import Garden from '@/pages/garden';
import Order from '@/pages/order';
import User from '@/pages/user';

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/home',
    exact: true,
    component: Home,
  },
  {
    path: '/garden',
    exact: true,
    component: Garden,
  },
  {
    path: '/order',
    exact: true,
    component: Order,
  },
  {
    path: '/user',
    exact: true,
    component: User,
  }
];
