import { nativeMenu } from './modules/native';
import { svgMenu } from './modules/svg';
import { canvasMenu } from './modules/canvas';
import { gaodeMapMenu } from './modules/gaodeMap';
import { baiduMapMenu } from './modules/baiduMap';
import { tiandituMenu } from './modules/tianditu';
import { openlayersMenu } from './modules/openlayers';
import { arcgisMenu } from './modules/arcgis';
import { leafletMenu } from './modules/leaflet';
import { threeMenu } from './modules/three';

const menu = [
  nativeMenu,
  svgMenu,
  canvasMenu,
  gaodeMapMenu,
  baiduMapMenu,
  tiandituMenu,
  openlayersMenu,
  arcgisMenu,
  leafletMenu,
  threeMenu
];

export default menu;
