import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const StatedView = React.lazy(() => import('@/views/GaodeMap/Stated'));

export const gaodeMapRoutes = [{ path: 'gaodeMap/stated', component: <StatedView /> }];

export const gaodeMapMenu = {
  label: '高德地图',
  key: '/gaodeMap',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/gaodeMap/stated'>起步</Link>,
      key: '/gaodeMap/stated'
    }
  ]
};
