import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import loadable from '@/utils/loadable';

const StatedView = loadable(() => import('@/views/OpenLayers/Stated'));

export const openlayersRoutes = [
  { path: 'openlayers/stated', component: <StatedView /> }
];

export const openlayersMenu = {
  label: 'OpenLayers',
  key: '/openlayers',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/openlayers/stated'>起步</Link>,
      key: '/openlayers/stated'
    }
  ]
};
