import { nativeMenu } from './modules/native';
import { svgMenu } from './modules/svg';
import { canvasMenu } from './modules/canvas';
import { gaodeMapMenu } from './modules/gaodeMap';
import { baiduMapMenu } from './modules/baiduMap';
import { openlayersMenu } from './modules/openlayers';
import { arcgisMenu } from './modules/arcgis';

const menu = [
  nativeMenu,
  svgMenu,
  canvasMenu,
  gaodeMapMenu,
  baiduMapMenu,
  openlayersMenu,
  arcgisMenu
];

export default menu;
