import Home from '@/pages/home';
import Garden from '@/pages/garden';


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
  }
];
