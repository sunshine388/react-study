import { nativeRoutes } from './modules/native';
import { gaodeMapRoutes } from './modules/gaodeMap';
import { baiduMapRoutes } from './modules/baiduMap';
import { openlayersRoutes } from './modules/openlayers';

const routes = [
  ...nativeRoutes,
  ...gaodeMapRoutes,
  ...baiduMapRoutes,
  ...openlayersRoutes
];

export default routes;
