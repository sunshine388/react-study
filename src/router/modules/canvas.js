import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const BubbleView = React.lazy(() => import('@/views/Canvas/Bubble'));

export const canvasRoutes = [
  { path: 'canvas/bubble', component: <BubbleView /> }
];

export const canvasMenu = {
  label: 'Canvas',
  key: '/canvas',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/canvas/bubble'>泡泡</Link>,
      key: '/canvas/bubble'
    }
  ]
};
