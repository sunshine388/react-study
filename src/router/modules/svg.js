import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import loadable from '@/utils/loadable';

const BaseShapeView = loadable(() => import('@/views/SVG/BaseShape'));

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
