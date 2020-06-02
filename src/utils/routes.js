import indexPage from '@/pages/homePage';
import homePage from '@/pages/home';
import userPage from '@/pages/user';

export const routes = [
  {
    path: '/index',
    exact: true,
    component: indexPage,
  },
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
  // {
  //   path: '/topics',
  //   exact: true,
  //   component: TopicPage,
  // },
  // {
  //   path: '/comments',
  //   exact: true,
  //   component: CommentPage,
  // },
];
