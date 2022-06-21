import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import loadable from '@/utils/loadable';

const StatedView = loadable(() => import('@/views/OpenLayers/Stated'));
const PopupView = loadable(() => import('@/views/OpenLayers/Popup'));
const ZoomView = loadable(() => import('@/views/OpenLayers/Zoom'));
const TabIndexView = loadable(() => import('@/views/OpenLayers/TabIndex'));

export const openlayersRoutes = [
  { path: 'openlayers/stated', component: <StatedView /> },
  { path: 'openlayers/popup', component: <PopupView /> },
  { path: 'openlayers/zoom', component: <ZoomView /> },
  { path: 'openlayers/tabIndex', component: <TabIndexView /> },
];

export const openlayersMenu = {
  label: 'OpenLayers',
  key: '/openlayers',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/openlayers/stated'>起步</Link>,
      key: '/openlayers/stated'
    },
    {
      label: <Link to='/openlayers/popup'>弹窗 popup</Link>,
      key: '/openlayers/popup'
    },
    {
      label: <Link to='/openlayers/zoom'>缩放 zoom</Link>,
      key: '/openlayers/zoom'
    },
    {
      label: <Link to='/openlayers/tabIndex'>点击激活地图 tabIndex</Link>,
      key: '/openlayers/tabIndex'
    },
    }
  ]
};
