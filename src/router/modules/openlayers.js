import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const StatedView = React.lazy(() => import('@/views/OpenLayers/Stated'));
const PopupView = React.lazy(() => import('@/views/OpenLayers/Popup'));
const ZoomView = React.lazy(() => import('@/views/OpenLayers/Zoom'));
const TabIndexView = React.lazy(() => import('@/views/OpenLayers/TabIndex'));
const ChangeTargetView = React.lazy(() =>
  import('@/views/OpenLayers/ChangeTarget')
);
const SynchronizationView = React.lazy(() =>
  import('@/views/OpenLayers/Synchronization')
);
const PreloadMapView = React.lazy(() =>
  import('@/views/OpenLayers/PreloadMap')
);
const VectorJSONView = React.lazy(() =>
  import('@/views/OpenLayers/VectorJSON')
);
const VectorHighView = React.lazy(() =>
  import('@/views/OpenLayers/VectorHigh')
);
const RotationMapView = React.lazy(() =>
  import('@/views/OpenLayers/RotationMap')
);
const MouseRotationMapView = React.lazy(() =>
  import('@/views/OpenLayers/MouseRotationMap')
);
const ViewAnimateView = React.lazy(() =>
  import('@/views/OpenLayers/ViewAnimate')
);
const GraticuleView = React.lazy(() => import('@/views/OpenLayers/Graticule'));
const HeatmapView = React.lazy(() => import('@/views/OpenLayers/Heatmap'));
const ScaleLineView = React.lazy(() => import('@/views/OpenLayers/ScaleLine'));
const FullScreenView = React.lazy(() =>
  import('@/views/OpenLayers/FullScreen')
);
const ZoomToExtentView = React.lazy(() =>
  import('@/views/OpenLayers/ZoomToExtent')
);
const OverviewMapView = React.lazy(() =>
  import('@/views/OpenLayers/OverviewMap')
);
const MousePositionView = React.lazy(() =>
  import('@/views/OpenLayers/MousePosition')
);
const ZoomSliderView = React.lazy(() =>
  import('@/views/OpenLayers/ZoomSlider')
);
const LayerGroupView = React.lazy(() =>
  import('@/views/OpenLayers/LayerGroup')
);
const SetZIndexView = React.lazy(() => import('@/views/OpenLayers/SetZIndex'));
const SetResolutionView = React.lazy(() =>
  import('@/views/OpenLayers/SetResolution')
);
const SetExtentView = React.lazy(() => import('@/views/OpenLayers/SetExtent'));
const CoverageModalView = React.lazy(() =>
  import('@/views/OpenLayers/CoverageModal')
);
const SetSourceView = React.lazy(() => import('@/views/OpenLayers/SetSource'));
const MarkerView = React.lazy(() => import('@/views/OpenLayers/Marker'));
const SimplenessLabelView = React.lazy(() =>
  import('@/views/OpenLayers/SimplenessLabel')
);
const BrightMarkView = React.lazy(() =>
  import('@/views/OpenLayers/BrightMark')
);
const PolymerizationView = React.lazy(() =>
  import('@/views/OpenLayers/Polymerization')
);
const BasicDrawView = React.lazy(() => import('@/views/OpenLayers/BasicDraw'));
const DrawGraphView = React.lazy(() => import('@/views/OpenLayers/DrawGraph'));
const FreeDrawingView = React.lazy(() =>
  import('@/views/OpenLayers/FreeDrawing')
);
const ArrowLineView = React.lazy(() => import('@/views/OpenLayers/ArrowLine'));
const SnapGraphView = React.lazy(() => import('@/views/OpenLayers/SnapGraph'));

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
  { path: 'openlayers/setZIndex', component: <SetZIndexView /> },
  { path: 'openlayers/setResolution', component: <SetResolutionView /> },
  { path: 'openlayers/setExtent', component: <SetExtentView /> },
  { path: 'openlayers/coverageModal', component: <CoverageModalView /> },
  { path: 'openlayers/setSource', component: <SetSourceView /> },
  { path: 'openlayers/marker', component: <MarkerView /> },
  { path: 'openlayers/simplenessLabel', component: <SimplenessLabelView /> },
  { path: 'openlayers/brightMark', component: <BrightMarkView /> },
  { path: 'openlayers/polymerization', component: <PolymerizationView /> },
  { path: 'openlayers/basicDraw', component: <BasicDrawView /> },
  { path: 'openlayers/drawGraph', component: <DrawGraphView /> },
  { path: 'openlayers/freeDrawing', component: <FreeDrawingView /> },
  { path: 'openlayers/arrowLine', component: <ArrowLineView /> },
  { path: 'openlayers/snapGraph', component: <SnapGraphView /> }
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
    },
    {
      label: <Link to='/openlayers/setZIndex'>控制图层层叠关系</Link>,
      key: '/openlayers/setZIndex'
    },
    {
      label: <Link to='/openlayers/setResolution'>不同分辨率显示不同图层</Link>,
      key: '/openlayers/setResolution'
    },
    {
      label: <Link to='/openlayers/setExtent'>区域图层</Link>,
      key: '/openlayers/setExtent'
    },
    {
      label: <Link to='/openlayers/coverageModal'>图层遮罩</Link>,
      key: '/openlayers/coverageModal'
    },
    {
      label: <Link to='/openlayers/setSource'>切换图源</Link>,
      key: '/openlayers/setSource'
    },
    {
      label: <Link to='/openlayers/marker'>点标记</Link>,
      key: '/openlayers/marker'
    },
    {
      label: <Link to='/openlayers/simplenessLabel'>简单的标记</Link>,
      key: '/openlayers/simplenessLabel'
    },
    {
      label: <Link to='/openlayers/brightMark'>定义标记颜色</Link>,
      key: '/openlayers/brightMark'
    },
    {
      label: <Link to='/openlayers/polymerization'>聚合数据</Link>,
      key: '/openlayers/polymerization'
    },
    {
      label: <Link to='/openlayers/basicDraw'>绘制点、线、面</Link>,
      key: '/openlayers/basicDraw'
    },
    {
      label: <Link to='/openlayers/drawGraph'>绘制图形</Link>,
      key: '/openlayers/drawGraph'
    },
    {
      label: <Link to='/openlayers/freeDrawing'>自由绘制图形</Link>,
      key: '/openlayers/freeDrawing'
    },
    {
      label: <Link to='/openlayers/arrowLine'>带箭头的线段</Link>,
      key: '/openlayers/arrowLine'
    },
    {
      label: <Link to='/openlayers/snapGraph'>修改已绘制的图形</Link>,
      key: '/openlayers/snapGraph'
    }
  ]
};
