import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const StatedView = React.lazy(() => import('@/views/Tianditu/Stated'));

export const tiandituRoutes = [
  { path: 'tianditu/stated', component: <StatedView /> }
];

export const tiandituMenu = {
  label: '天地图',
  key: '/tianditu',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/tianditu/stated'>起步</Link>,
      key: '/tianditu/stated'
    }
  ]
};
