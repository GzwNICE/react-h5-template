import Home from '@/pages/home';
import Garden from '@/pages/garden';
import Order from '@/pages/order';
import User from '@/pages/user';
import Login from '@/pages/login';
import FeedBack from '@/pages/feedback';
import Context from '@/pages/context';

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
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/feedBack',
    exact: true,
    component: FeedBack,
  },
  {
    path: '/context',
    exact: true,
    component: Context,
  }
];
