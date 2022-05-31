import { nativeRoutes } from './modules/native';
import { canvasRoutes } from './modules/canvas';
import { gaodeMapRoutes } from './modules/gaodeMap';
import { baiduMapRoutes } from './modules/baiduMap';
import { openlayersRoutes } from './modules/openlayers';

const routes = [
  ...nativeRoutes,
  ...canvasRoutes,
  ...gaodeMapRoutes,
  ...baiduMapRoutes,
  ...openlayersRoutes
];

export default routes;
