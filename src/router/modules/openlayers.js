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
const MouseRotationMapView = loadable(() =>
  import('@/views/OpenLayers/MouseRotationMap')
);
const ViewAnimateView = loadable(() =>
  import('@/views/OpenLayers/ViewAnimate')
);
const GraticuleView = loadable(() => import('@/views/OpenLayers/Graticule'));
const HeatmapView = loadable(() => import('@/views/OpenLayers/Heatmap'));
const ScaleLineView = loadable(() => import('@/views/OpenLayers/ScaleLine'));
const FullScreenView = loadable(() => import('@/views/OpenLayers/FullScreen'));
const ZoomToExtentView = loadable(() =>
  import('@/views/OpenLayers/ZoomToExtent')
);
const OverviewMapView = loadable(() =>
  import('@/views/OpenLayers/OverviewMap')
);
const MousePositionView = loadable(() =>
  import('@/views/OpenLayers/MousePosition')
);
const ZoomSliderView = loadable(() => import('@/views/OpenLayers/ZoomSlider'));
const LayerGroupView = loadable(() => import('@/views/OpenLayers/LayerGroup'));

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
  { path: 'openlayers/mouseRotationMap', component: <MouseRotationMapView /> },
  { path: 'openlayers/viewAnimate', component: <ViewAnimateView /> },
  { path: 'openlayers/graticule', component: <GraticuleView /> },
  { path: 'openlayers/heatmap', component: <HeatmapView /> },
  { path: 'openlayers/scaleLine', component: <ScaleLineView /> },
  { path: 'openlayers/fullScreen', component: <FullScreenView /> },
  { path: 'openlayers/zoomToExtent', component: <ZoomToExtentView /> },
  { path: 'openlayers/overviewMap', component: <OverviewMapView /> },
  { path: 'openlayers/mousePosition', component: <MousePositionView /> },
  { path: 'openlayers/zoomSlider', component: <ZoomSliderView /> },
  { path: 'openlayers/layerGroup', component: <LayerGroupView /> },
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
    },
    {
      label: <Link to='/openlayers/mouseRotationMap'>鼠标拖拽旋转/缩放</Link>,
      key: '/openlayers/mouseRotationMap'
    },
    {
      label: <Link to='/openlayers/viewAnimate'>动画 animate</Link>,
      key: '/openlayers/viewAnimate'
    },
    {
      label: <Link to='/openlayers/graticule'>网格 Graticule</Link>,
      key: '/openlayers/graticule'
    },
    {
      label: <Link to='/openlayers/heatmap'>热力图</Link>,
      key: '/openlayers/heatmap'
    },
    {
      label: <Link to='/openlayers/scaleLine'>比例尺控件 ScaleLine</Link>,
      key: '/openlayers/scaleLine'
    },
    {
      label: <Link to='/openlayers/fullScreen'>全屏控件 FullScreen</Link>,
      key: '/openlayers/fullScreen'
    },
    {
      label: <Link to='/openlayers/zoomToExtent'>导览控件 ZoomToExtent</Link>,
      key: '/openlayers/zoomToExtent'
    },
    {
      label: <Link to='/openlayers/overviewMap'>总览控件（鹰眼、小地图）</Link>,
      key: '/openlayers/overviewMap'
    },
    {
      label: <Link to='/openlayers/mousePosition'>鼠标位置控件</Link>,
      key: '/openlayers/mousePosition'
    },
    {
      label: <Link to='/openlayers/zoomSlider'>缩放滑块控件 ZoomSlider</Link>,
      key: '/openlayers/zoomSlider'
    },
    {
      label: <Link to='/openlayers/layerGroup'>图层组 LayerGroup</Link>,
      key: '/openlayers/layerGroup'
    }
  ]
};
