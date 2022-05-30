import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import loadable from '@/utils/loadable';

const StatedView = loadable(() => import('@/views/BaiduMap/Stated'));

export const baiduMapRoutes = [
  { path: 'baiduMap/stated', component: <StatedView /> }
];

export const baiduMapMenu = {
  label: '百度地图',
  key: '/baiduMap',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/baiduMap/stated'>起步</Link>,
      key: '/baiduMap/stated'
    }
  ]
};
