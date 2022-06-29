import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import loadable from '@/utils/loadable';

const StatedView = loadable(() => import('@/views/FabricJS/Basic/Stated'));
const CustomControlRenderView = loadable(() =>
  import('@/views/FabricJS/Demo/CustomControlRender')
);

export const fabricRoutes = [
  { path: 'fabric/basic/stated', component: <StatedView /> },
  {
    path: 'fabric/demo/customControlRender',
    component: <CustomControlRenderView />
  }
];

export const fabricMenu = {
  label: 'FabricJS',
  key: '/fabric',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: '基础',
      key: '/fabric/basic',
      children: [
        {
          label: <Link to='/fabric/basic/stated'>起步</Link>,
          key: '/fabric/basic/stated'
        }
      ]
    },
    {
      label: '模板',
      key: '/fabric/demo',
      children: [
        {
          label: <Link to='/fabric/demo/customControlRender'>自定义控件</Link>,
          key: '/fabric/demo/customControlRender'
        }
      ]
    }
  ]
};
