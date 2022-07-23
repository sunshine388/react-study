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

export const leafletRoutes = [
  { path: 'leaflet/stated', component: <StatedView /> },
  { path: 'leaflet/control', component: <ControlView /> },
  { path: 'leaflet/mapOperation', component: <MapOperationView /> },
  { path: 'leaflet/mapEvent', component: <MapEventView /> },
  { path: 'leaflet/graphicsOperation', component: <GraphicsOperationView /> },
  { path: 'leaflet/otherGraphics', component: <OtherGraphicsView /> },
  { path: 'leaflet/drawGraphics', component: <DrawGraphicsView /> }
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
    }
  ]
};
