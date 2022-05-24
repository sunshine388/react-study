import loadable from '@/utils/loadable';

// 通用
const ButtonView = loadable(() => import('@/views/PublicView/Button'));

const Three = loadable(() => import('@/views/TestView'));
const About = loadable(() => import('@/views/About'));

const routes = [
  { path: 'public/button', component: <ButtonView /> },
  { path: 'one/two/three', component: <Three /> },
  { path: 'about', component: <About /> }
];

export default routes;
