import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import loadable from '@/utils/loadable';

const StatedView = loadable(() => import('@/views/Leaflet/Stated'));
const ControlView = loadable(() => import('@/views/Leaflet/Control'));

export const leafletRoutes = [
  { path: 'leaflet/stated', component: <StatedView />},
  { path: 'leaflet/control', component: <ControlView /> }
];

export const leafletMenu = {
  label: 'Leaflet',
  key: '/leaflet',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/leaflet/stated'>起步</Link>,
      key: '/leaflet/stated'
    },
    {
      label: <Link to='/leaflet/control'>控件</Link>,
      key: '/leaflet/control'
    }
  ]
};
