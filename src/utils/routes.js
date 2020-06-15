import homePage from '@/pages/home';
import userPage from '@/pages/user';
import loginPage from '@/pages/login';
import regPage from '@/pages/register';
import Password from '@/pages/password';
import Order from '@/pages/order';
import ProductDetail from '@/pages/productDetail';
import Personal from '@/pages/personal';

export const routes = [
  {
    path: '/home',
    exact: true,
    component: homePage,
  },
  {
    path: '/user',
    exact: true,
    component: userPage,
  },
  {
    path: '/login',
    exact: true,
    component: loginPage,
  },
  {
    path: '/register',
    exact: true,
    component: regPage,
  },
  {
    path: '/password',
    exact: true,
    component: Password,
  },
  {
    path: '/order',
    exact: true,
    component: Order,
  },
  {
    path: '/product/:activityTurnId',
    exact: true,
    component: ProductDetail,
  },
  {
    path: '/personal',
    exact: true,
    component: Personal,
  },
];
