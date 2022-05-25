import loadable from '@/utils/loadable';

const Batman = loadable(() => import('@/views/Native/PureCSS/Batman'));

const routes = [{ path: 'native/pureCSS/batman', component: <Batman /> }];

export default routes;
