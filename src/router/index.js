import { nativeRoutes } from './modules/native';
import { svgRoutes } from './modules/svg';
import { canvasRoutes } from './modules/canvas';
import { gaodeMapRoutes } from './modules/gaodeMap';
import { baiduMapRoutes } from './modules/baiduMap';
import { openlayersRoutes } from './modules/openlayers';
import { arcgisRoutes } from './modules/arcgis';

const routes = [
  ...nativeRoutes,
  ...svgRoutes,
  ...canvasRoutes,
  ...gaodeMapRoutes,
  ...baiduMapRoutes,
  ...openlayersRoutes,
  ...arcgisRoutes
];

export default routes;
