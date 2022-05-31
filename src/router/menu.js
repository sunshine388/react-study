import { nativeMenu } from './modules/native';
import { canvasMenu } from './modules/canvas';
import { gaodeMapMenu } from './modules/gaodeMap';
import { baiduMapMenu } from './modules/baiduMap';
import { openlayersMenu } from './modules/openlayers';

const menu = [
  nativeMenu,
  canvasMenu,
  gaodeMapMenu,
  baiduMapMenu,
  openlayersMenu
];

export default menu;
