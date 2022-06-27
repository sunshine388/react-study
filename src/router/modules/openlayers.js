import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import loadable from '@/utils/loadable';

const StatedView = loadable(() => import('@/views/OpenLayers/Stated'));
const PopupView = loadable(() => import('@/views/OpenLayers/Popup'));
const ZoomView = loadable(() => import('@/views/OpenLayers/Zoom'));
const TabIndexView = loadable(() => import('@/views/OpenLayers/TabIndex'));
const ChangeTargetView = loadable(() =>
  import('@/views/OpenLayers/ChangeTarget')
);
const SynchronizationView = loadable(() =>
  import('@/views/OpenLayers/Synchronization')
);
const PreloadMapView = loadable(() => import('@/views/OpenLayers/PreloadMap'));
const VectorJSONView = loadable(() => import('@/views/OpenLayers/VectorJSON'));
const VectorHighView = loadable(() => import('@/views/OpenLayers/VectorHigh'));
const RotationMapView = loadable(() =>
  import('@/views/OpenLayers/RotationMap')
);

export const openlayersRoutes = [
  { path: 'openlayers/stated', component: <StatedView /> },
  { path: 'openlayers/popup', component: <PopupView /> },
  { path: 'openlayers/zoom', component: <ZoomView /> },
  { path: 'openlayers/tabIndex', component: <TabIndexView /> },
  { path: 'openlayers/changeTarget', component: <ChangeTargetView /> },
  { path: 'openlayers/synchronization', component: <SynchronizationView /> },
  { path: 'openlayers/preloadMap', component: <PreloadMapView /> },
  { path: 'openlayers/vectorJSON', component: <VectorJSONView /> },
  { path: 'openlayers/vectorHigh', component: <VectorHighView /> },
  { path: 'openlayers/rotationMap', component: <RotationMapView /> },
];

export const openlayersMenu = {
  label: 'OpenLayers',
  key: '/openlayers',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/openlayers/stated'>起步</Link>,
      key: '/openlayers/stated'
    },
    {
      label: <Link to='/openlayers/popup'>弹窗 popup</Link>,
      key: '/openlayers/popup'
    },
    {
      label: <Link to='/openlayers/zoom'>缩放 zoom</Link>,
      key: '/openlayers/zoom'
    },
    {
      label: <Link to='/openlayers/tabIndex'>点击激活地图 tabIndex</Link>,
      key: '/openlayers/tabIndex'
    },
    {
      label: <Link to='/openlayers/changeTarget'>切换地图容器</Link>,
      key: '/openlayers/changeTarget'
    },
    {
      label: <Link to='/openlayers/synchronization'>同步两个地图</Link>,
      key: '/openlayers/synchronization'
    },
    {
      label: <Link to='/openlayers/preloadMap'>预加载 preload</Link>,
      key: '/openlayers/preloadMap'
    },
    {
      label: <Link to='/openlayers/vectorJSON'>矢量图 JSON</Link>,
      key: '/openlayers/vectorJSON'
    },
    {
      label: <Link to='/openlayers/vectorHigh'>矢量图 高亮</Link>,
      key: '/openlayers/vectorHigh'
    },
    {
      label: <Link to='/openlayers/rotationMap'>旋转 rotation</Link>,
      key: '/openlayers/rotationMap'
    }
  ]
};
