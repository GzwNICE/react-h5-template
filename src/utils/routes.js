import homePage from '@/pages/home';

import userPage from '@/pages/user';
import Payment from '@/pages/payment';

import PayList from '@/pages/user/paylist';
import PayHistory from '@/pages/user/paylist/payhistory';
import Feedback from '@/pages/user/feedback';
import Join from '@/pages/user/join';
import Setting from '@/pages/user/set';
import AboutUs from '@/pages/user/set/aboutus';

import Personal from '@/pages/user/personal';
import EditName from '@/pages/user/personal/editname';
import AddressList from '@/pages/user/personal/addressList';
import AddressAdd from '@/pages/user/personal/addressList/addressAdd';
import Order from '@/pages/user/order';
import loginPage from '@/pages/login';
import regPage from '@/pages/register';
import Password from '@/pages/password';
import ProductDetail from '@/pages/productDetail';
import RulePage from '@/pages/rules';
import GetPrize from '@/pages/getPrize';
import AwardResults from '@/pages/awardResults';
import PayResult from '@/pages/payResult';
import Agreement from '@/pages/agreement';
import PrizeSelection from '@/pages/prizeSelection';
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
    component: EditName,
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
    path: '/set',
    exact: true,
    component: Setting,
  },
  {
    path: '/aboutus',
    exact: true,
    component: AboutUs,
  },
  {
    path: '/join',
    exact: true,
    component: Join,
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
  {
    path: '/awardResult',
    exact: true,
    component: AwardResults,
  },
  {
    path: '/payment',
    exact: true,
    component: Payment,
  },
  {
    path: '/payResult',
    exact: true,
    component: PayResult,
  },
  {
    path: '/agreement/:type',
    exact: true,
    component: Agreement,
  },
  {
    path: '/prizeSelection/:activityTurnId',
    exact: true,
    component: PrizeSelection,
  },
];
