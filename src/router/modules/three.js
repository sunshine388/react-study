import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import loadable from '@/utils/loadable';

const ThreeMapView = loadable(() => import('@/views/Three/ThreeMap'));

export const threeRoutes = [
  { path: 'three/threeMap', component: <ThreeMapView /> }
];

export const threeMenu = {
  label: 'Three',
  key: '/three',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/three/threeMap'>三维地图</Link>,
      key: '/three/threeMap'
    }
  ]
};
