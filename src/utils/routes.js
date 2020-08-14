import homePage from '@/pages/home';

import userPage from '@/pages/user';
import Payment from '@/pages/payment';
import Evaluation from '@/pages/user/evaluation';
import AddShow from '@/pages/user/evaluation/addShow';
import EditShow from '@/pages/user/evaluation/editShow';

import PayList from '@/pages/user/paylist';
import PayHistory from '@/pages/user/paylist/payhistory';
import Invitation from '@/pages/user/invitation';
import Rule from '@/pages/user/invitation/rule';
import Rank from '@/pages/user/invitation/rank';
import Reward from '@/pages/user/invitation/reward';
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

import Help from '@/pages/user/help';
import HelpItem from '@/pages/user/helpItem';
import HelpDetail from '@/pages/user/helpDetail';

import PrizeSelection from '@/pages/prizeSelection';
import Exchange from '@/pages/exchange';
import ChangeResult from '@/pages/changeResult';
import CommodityPage from '@/pages/commodity';
import ShopCart from '@/pages/shopCart';
import SingleRecord from '@/pages/singleRecord';
import Integral from '@/pages/user/integral';
import IntegralTurnover from '@/pages/user/integral/turnover';

// import { Route } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    exact: true,
    component: homePage,
  },
  {
    path: '/home',
    exact: true,
    component: homePage,
  },
  {
    path: '/commodity',
    exact: true,
    component: CommodityPage,
  },
  {
    path: '/shopCart',
    exact: true,
    component: ShopCart,
  },
  {
    path: '/user',
    exact: true,
    component: userPage,
  },
  {
    path: '/evaluation',
    exact: true,
    component: Evaluation,
  },
  {
    path: '/addShow/:activityTurnId',
    exact: true,
    component: AddShow,
  },
  {
    path: '/editShow/:id',
    exact: true,
    component: EditShow,
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
    path: '/invitation',
    exact: true,
    component: Invitation,
  },
  {
    path: '/rule',
    exact: true,
    component: Rule,
  },
  {
    path: '/reward',
    exact: true,
    component: Reward,
  },
  {
    path: '/rank',
    exact: true,
    component: Rank,
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
    path: '/help',
    exact: true,
    component: Help,
  },
  {
    path: '/helpItem/:id',
    exact: true,
    component: HelpItem,
  },
  {
    path: '/helpDetail/:id',
    exact: true,
    component: HelpDetail,
  },
  {
    path: '/prizeSelection/:activityTurnId',
    exact: true,
    component: PrizeSelection,
  },
  {
    path: '/exchange/:activityTurnId',
    exact: true,
    component: Exchange,
  },
  {
    path: '/changeResult',
    exact: true,
    component: ChangeResult,
  },
  {
    path: '/single',
    exact: true,
    component: SingleRecord,
  },
  {
    path: '/integral',
    exact: true,
    component: Integral,
  },
  {
    path: '/integral/turnover',
    exact: true,
    component: IntegralTurnover,
  },
];
