import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const menu = [
  {
    label: '原生',
    key: '/native',
    icon: <AppstoreOutlined />,
    children: [
      {
        label: '纯CSS',
        key: '/native/pureCSS',
        children: [
          {
            label: <Link to='/native/pureCSS/batman'>蝙蝠侠</Link>,
            key: '/native/pureCSS/batman'
          }
        ]
      }
    ]
  }
];

export default menu;
