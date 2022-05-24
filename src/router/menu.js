import {
  AppstoreOutlined,
  DesktopOutlined,
  MailOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const menu = [
  {
    label: '通用',
    key: '/public',
    icon: <AppstoreOutlined />,
    children: [
      { label: <Link to='/public/button'>按钮</Link>, key: '/public/button' }
    ]
  },
  {
    label: '多级导航',
    key: '/one',
    icon: <DesktopOutlined />,
    children: [
      {
        label: '二级',
        key: '/one/two',
        children: [{ label: <Link to='/one/two/three'>三级</Link>, key: '/one/two/three' }]
      }
    ]
  },
  {
    label: <Link to='/about'>关于</Link>,
    key: '/about',
    icon: <MailOutlined />
  }
];

export default menu;
