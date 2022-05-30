import { nativeRoutes } from './modules/native';
import { gaodeMapRoutes } from './modules/gaodeMap';
import { baiduMapRoutes } from './modules/baiduMap';

const routes = [...nativeRoutes, ...gaodeMapRoutes, ...baiduMapRoutes];

export default routes;
