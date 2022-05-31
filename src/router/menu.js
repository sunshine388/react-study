import { nativeMenu } from './modules/native';
import { svgMenu } from './modules/svg';
import { canvasMenu } from './modules/canvas';
import { gaodeMapMenu } from './modules/gaodeMap';
import { baiduMapMenu } from './modules/baiduMap';
import { openlayersMenu } from './modules/openlayers';

const menu = [
  nativeMenu,
  svgMenu,
  canvasMenu,
  gaodeMapMenu,
  baiduMapMenu,
  openlayersMenu
];

export default menu;
