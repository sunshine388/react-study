import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import loadable from '@/utils/loadable';

const BubbleView = loadable(() => import('@/views/Canvas/Bubble'));

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
