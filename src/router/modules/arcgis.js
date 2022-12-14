import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const StatedView = React.lazy(() => import('@/views/Arcgis/Stated'));

export const arcgisRoutes = [
  { path: 'arcgis/stated', component: <StatedView /> }
];

export const arcgisMenu = {
  label: 'Arcgis',
  key: '/arcgis',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/arcgis/stated'>起步</Link>,
      key: '/arcgis/stated'
    }
  ]
};
