import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const StatedView = React.lazy(() => import('@/views/Leaflet/Stated'));
const ControlView = React.lazy(() => import('@/views/Leaflet/Control'));
const MapOperationView = React.lazy(() =>
  import('@/views/Leaflet/MapOperation')
);
const MapEventView = React.lazy(() => import('@/views/Leaflet/MapEvent'));
const GraphicsOperationView = React.lazy(() =>
  import('@/views/Leaflet/GraphicsOperation')
);
const OtherGraphicsView = React.lazy(() =>
  import('@/views/Leaflet/OtherGraphics')
);
const DrawGraphicsView = React.lazy(() =>
  import('@/views/Leaflet/DrawGraphics')
);
const MapMarkerView = React.lazy(() => import('@/views/Leaflet/MapMarker'));
const ViewAnimationView = React.lazy(() =>
  import('@/views/Leaflet/ViewAnimation')
);
const AirlineAnimationView = React.lazy(() =>
  import('@/views/Leaflet/AirlineAnimation')
);
const ThirdPartyMapView = React.lazy(() =>
  import('@/views/Leaflet/ThirdPartyMap')
);
const OGCView = React.lazy(() => import('@/views/Leaflet/OGC'));
const HeatmapView = React.lazy(() => import('@/views/Leaflet/Heatmap'));

export const leafletRoutes = [
  { path: 'leaflet/stated', component: <StatedView /> },
  { path: 'leaflet/control', component: <ControlView /> },
  { path: 'leaflet/mapOperation', component: <MapOperationView /> },
  { path: 'leaflet/mapEvent', component: <MapEventView /> },
  { path: 'leaflet/graphicsOperation', component: <GraphicsOperationView /> },
  { path: 'leaflet/otherGraphics', component: <OtherGraphicsView /> },
  { path: 'leaflet/drawGraphics', component: <DrawGraphicsView /> },
  { path: 'leaflet/mapMarker', component: <MapMarkerView /> },
  { path: 'leaflet/viewAnimation', component: <ViewAnimationView /> },
  { path: 'leaflet/airlineAnimation', component: <AirlineAnimationView /> },
  { path: 'leaflet/thirdPartyMap', component: <ThirdPartyMapView /> },
  { path: 'leaflet/OGC', component: <OGCView /> },
  { path: 'leaflet/heatmap', component: <HeatmapView /> }
];

export const leafletMenu = {
  label: 'Leaflet',
  key: '/leaflet',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/leaflet/stated'>起步</Link>,
      key: '/leaflet/stated'
    },
    {
      label: <Link to='/leaflet/control'>控件</Link>,
      key: '/leaflet/control'
    },
    {
      label: <Link to='/leaflet/mapOperation'>地图操作</Link>,
      key: '/leaflet/mapOperation'
    },
    {
      label: <Link to='/leaflet/mapEvent'>地图事件</Link>,
      key: '/leaflet/mapEvent'
    },
    {
      label: <Link to='/leaflet/graphicsOperation'>图形操作</Link>,
      key: '/leaflet/graphicsOperation'
    },
    {
      label: <Link to='/leaflet/otherGraphics'>其它图形</Link>,
      key: '/leaflet/otherGraphics'
    },
    {
      label: <Link to='/leaflet/drawGraphics'>绘制图形</Link>,
      key: '/leaflet/drawGraphics'
    },
    {
      label: <Link to='/leaflet/mapMarker'>地图标注</Link>,
      key: '/leaflet/mapMarker'
    },
    {
      label: <Link to='/leaflet/viewAnimation'>要素动画</Link>,
      key: '/leaflet/viewAnimation'
    },
    {
      label: <Link to='/leaflet/airlineAnimation'>航线动画</Link>,
      key: '/leaflet/airlineAnimation'
    },
    {
      label: <Link to='/leaflet/thirdPartyMap'>第三方地图</Link>,
      key: '/leaflet/thirdPartyMap'
    },
    {
      label: <Link to='/leaflet/OGC'>OGC资源</Link>,
      key: '/leaflet/OGC'
    },
    {
      label: <Link to='/leaflet/heatmap'>热力图</Link>,
      key: '/leaflet/heatmap'
    }
  ]
};
