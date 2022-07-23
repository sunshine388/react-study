import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const BaseShapeView = React.lazy(() => import('@/views/SVG/BaseShape'));

export const svgRoutes = [
  { path: 'svg/baseShape', component: <BaseShapeView /> }
];

export const svgMenu = {
  label: 'SVG',
  key: '/svg',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/svg/baseShape'>基础形状</Link>,
      key: '/svg/baseShape'
    }
  ]
};
