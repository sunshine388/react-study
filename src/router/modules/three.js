import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const ThreeMapView = React.lazy(() => import('@/views/Three/ThreeMap'));
const CubeView = React.lazy(() => import('@/views/Three/Cube'));

export const threeRoutes = [
  { path: 'three/threeMap', component: <ThreeMapView /> },
  { path: 'three/cube', component: <CubeView /> }
];

export const threeMenu = {
  label: 'Three',
  key: '/three',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/three/threeMap'>三维地图</Link>,
      key: '/three/threeMap'
    },
    {
      label: <Link to='/three/cube'>立方体</Link>,
      key: '/three/cube'
    }
  ]
};
