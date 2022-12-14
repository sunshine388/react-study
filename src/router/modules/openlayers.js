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
      label: <Link to='/openlayers/stated'>??????</Link>,
      key: '/openlayers/stated'
    },
    {
      label: <Link to='/openlayers/popup'>?????? popup</Link>,
      key: '/openlayers/popup'
    },
    {
      label: <Link to='/openlayers/zoom'>?????? zoom</Link>,
      key: '/openlayers/zoom'
    },
    {
      label: <Link to='/openlayers/tabIndex'>?????????????????? tabIndex</Link>,
      key: '/openlayers/tabIndex'
    },
    {
      label: <Link to='/openlayers/changeTarget'>??????????????????</Link>,
      key: '/openlayers/changeTarget'
    },
    {
      label: <Link to='/openlayers/synchronization'>??????????????????</Link>,
      key: '/openlayers/synchronization'
    },
    {
      label: <Link to='/openlayers/preloadMap'>????????? preload</Link>,
      key: '/openlayers/preloadMap'
    },
    {
      label: <Link to='/openlayers/vectorJSON'>????????? JSON</Link>,
      key: '/openlayers/vectorJSON'
    },
    {
      label: <Link to='/openlayers/vectorHigh'>????????? ??????</Link>,
      key: '/openlayers/vectorHigh'
    },
    {
      label: <Link to='/openlayers/rotationMap'>?????? rotation</Link>,
      key: '/openlayers/rotationMap'
    },
    {
      label: <Link to='/openlayers/mouseRotationMap'>??????????????????/??????</Link>,
      key: '/openlayers/mouseRotationMap'
    },
    {
      label: <Link to='/openlayers/viewAnimate'>?????? animate</Link>,
      key: '/openlayers/viewAnimate'
    },
    {
      label: <Link to='/openlayers/graticule'>?????? Graticule</Link>,
      key: '/openlayers/graticule'
    },
    {
      label: <Link to='/openlayers/heatmap'>?????????</Link>,
      key: '/openlayers/heatmap'
    },
    {
      label: <Link to='/openlayers/scaleLine'>??????????????? ScaleLine</Link>,
      key: '/openlayers/scaleLine'
    },
    {
      label: <Link to='/openlayers/fullScreen'>???????????? FullScreen</Link>,
      key: '/openlayers/fullScreen'
    },
    {
      label: <Link to='/openlayers/zoomToExtent'>???????????? ZoomToExtent</Link>,
      key: '/openlayers/zoomToExtent'
    },
    {
      label: <Link to='/openlayers/overviewMap'>????????????????????????????????????</Link>,
      key: '/openlayers/overviewMap'
    },
    {
      label: <Link to='/openlayers/mousePosition'>??????????????????</Link>,
      key: '/openlayers/mousePosition'
    },
    {
      label: <Link to='/openlayers/zoomSlider'>?????????????????? ZoomSlider</Link>,
      key: '/openlayers/zoomSlider'
    },
    {
      label: <Link to='/openlayers/layerGroup'>????????? LayerGroup</Link>,
      key: '/openlayers/layerGroup'
    },
    {
      label: <Link to='/openlayers/setZIndex'>????????????????????????</Link>,
      key: '/openlayers/setZIndex'
    },
    {
      label: <Link to='/openlayers/setResolution'>?????????????????????????????????</Link>,
      key: '/openlayers/setResolution'
    },
    {
      label: <Link to='/openlayers/setExtent'>????????????</Link>,
      key: '/openlayers/setExtent'
    },
    {
      label: <Link to='/openlayers/coverageModal'>????????????</Link>,
      key: '/openlayers/coverageModal'
    },
    {
      label: <Link to='/openlayers/setSource'>????????????</Link>,
      key: '/openlayers/setSource'
    },
    {
      label: <Link to='/openlayers/marker'>?????????</Link>,
      key: '/openlayers/marker'
    },
    {
      label: <Link to='/openlayers/simplenessLabel'>???????????????</Link>,
      key: '/openlayers/simplenessLabel'
    },
    {
      label: <Link to='/openlayers/brightMark'>??????????????????</Link>,
      key: '/openlayers/brightMark'
    },
    {
      label: <Link to='/openlayers/polymerization'>????????????</Link>,
      key: '/openlayers/polymerization'
    },
    {
      label: <Link to='/openlayers/basicDraw'>?????????????????????</Link>,
      key: '/openlayers/basicDraw'
    },
    {
      label: <Link to='/openlayers/drawGraph'>????????????</Link>,
      key: '/openlayers/drawGraph'
    },
    {
      label: <Link to='/openlayers/freeDrawing'>??????????????????</Link>,
      key: '/openlayers/freeDrawing'
    },
    {
      label: <Link to='/openlayers/arrowLine'>??????????????????</Link>,
      key: '/openlayers/arrowLine'
    },
    {
      label: <Link to='/openlayers/snapGraph'>????????????????????????</Link>,
      key: '/openlayers/snapGraph'
    }
  ]
};
