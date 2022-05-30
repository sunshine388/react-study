import loadable from '@/utils/loadable';

const Batman = loadable(() => import('@/views/Native/PureCSS/Batman'));

const ParallaxView = loadable(() =>
  import('@/views/Native/ThreePiece/Parallax')
);

const routes = [
  { path: 'native/pureCSS/batman', component: <Batman /> },
  { path: 'native/threePiece/parallax', component: <ParallaxView /> }
];

export default routes;
