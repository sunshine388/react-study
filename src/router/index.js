import { nativeRoutes } from './modules/native';
import { svgRoutes } from './modules/svg';
import { canvasRoutes } from './modules/canvas';
import { gaodeMapRoutes } from './modules/gaodeMap';
import { baiduMapRoutes } from './modules/baiduMap';
import { tiandituRoutes } from './modules/tianditu';
import { openlayersRoutes } from './modules/openlayers';
import { arcgisRoutes } from './modules/arcgis';
import { leafletRoutes } from './modules/leaflet';
import { threeRoutes } from './modules/three';
import { fabricRoutes } from './modules/fabric';

const routes = [
  ...nativeRoutes,
  ...svgRoutes,
  ...canvasRoutes,
  ...gaodeMapRoutes,
  ...baiduMapRoutes,
  ...tiandituRoutes,
  ...openlayersRoutes,
  ...arcgisRoutes,
  ...leafletRoutes,
  ...threeRoutes,
  ...fabricRoutes
];

export default routes;
