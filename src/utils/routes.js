import homePage from '@/pages/home';
import userPage from '@/pages/user';
import loginPage from '@/pages/login';
import regPage from '@/pages/register';

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
];
