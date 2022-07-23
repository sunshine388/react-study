import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const StatedView = React.lazy(() => import('@/views/Leaflet/Stated'));
const ControlView = React.lazy(() => import('@/views/Leaflet/Control'));
const MapOperationView = React.lazy(() => import('@/views/Leaflet/MapOperation'));
const MapEventView = React.lazy(() => import('@/views/Leaflet/MapEvent'));
const GraphicsOperationView = React.lazy(() =>
  import('@/views/Leaflet/GraphicsOperation')
);

export const leafletRoutes = [
  { path: 'leaflet/stated', component: <StatedView /> },
  { path: 'leaflet/control', component: <ControlView /> },
  { path: 'leaflet/mapOperation', component: <MapOperationView /> },
  { path: 'leaflet/mapEvent', component: <MapEventView /> },
  { path: 'leaflet/graphicsOperation', component: <GraphicsOperationView /> }
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
    }
  ]
};
