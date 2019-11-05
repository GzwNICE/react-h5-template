import CommentPage from '@/pages/comments';
import TopicPage from '@/pages/topics';

export const routes = [
  {
    path: '/',
    exact: true,
    component: TopicPage,
  },
  {
    path: '/topics',
    exact: true,
    component: TopicPage,
  },
  {
    path: '/comments',
    exact: true,
    component: CommentPage,
  },
];
