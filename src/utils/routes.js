import homePage from '@/pages/home';

import userPage from '@/pages/user';
import PayList from '@/pages/user/paylist';
import PayHistory from '@/pages/user/paylist/payhistory';
import Feedback from '@/pages/user/feedback';
import Personal from '@/pages/user/personal';
import Editname from '@/pages/user/personal/editname';
import AddressList from '@/pages/user/personal/addressList';
import AddressAdd from '@/pages/user/personal/addressList/addressAdd';
import Order from '@/pages/user/order';
import loginPage from '@/pages/login';
import regPage from '@/pages/register';
import Password from '@/pages/password';
import ProductDetail from '@/pages/productDetail';
import RulePage from '@/pages/rules';
import GetPrize from '@/pages/getPrize';
// import { Route } from 'react-router-dom';

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
    path: '/personal',
    exact: true,
    component: Personal,
  },
  {
    path: '/rules/:activityTurnId',
    exact: true,
    component: RulePage,
  },
  {
    path: '/product/:activityTurnId',
    exact: true,
    component: ProductDetail,
  },
  {
    path: '/editname',
    exact: true,
    component: Editname,
  },
  {
    path: '/addressList',
    exact: true,
    component: AddressList,
  },
  {
    path: '/addressAdd',
    exact: true,
    component: AddressAdd,
  },
  {
    path: '/feedback',
    exact: true,
    component: Feedback,
  },
  {
    path: '/paylist',
    exact: true,
    component: PayList,
  },
  {
    path: '/payhistory',
    exact: true,
    component: PayHistory,
  },
  {
    path: '/prize/:activityTurnId',
    exact: true,
    component: GetPrize,
  },
];
