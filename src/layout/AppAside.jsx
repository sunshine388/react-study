import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import menu from '@/router/menu';
import { useLocation } from 'react-router-dom';

const { Sider } = Layout;

const AppAside = (props) => {
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const location = useLocation();

  // 处理 pathname
  const getOpenKeys = (string) => {
    let newStr = '',
      newArr = [],
      arr = string.split('/').map((i) => '/' + i);
    for (let i = 1; i < arr.length - 1; i++) {
      newStr += arr[i];
      newArr.push(newStr);
    }
    return newArr;
  };

  const onOpenChange = (openKeys) => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      setOpenKeys(openKeys);
      return;
    }

    const latestOpenKey = openKeys[openKeys.length - 1];

    if (latestOpenKey.includes(openKeys[0])) {
      setOpenKeys(openKeys);
    } else {
      setOpenKeys([latestOpenKey]);
    }
  };

  const onClick = ({ key }) => {
    setSelectedKeys([key]);
  };

  useEffect(() => {
    let { pathname } = location;
    setSelectedKeys([pathname]);
    setOpenKeys(() => getOpenKeys(pathname));
  }, [location]);

  return (
    <Sider className='aside' collapsed={props.menuToggle}>
      <div className='logo'>
        <a
          rel='noopener noreferrer'
          href='https://github.com/sunshine388'
          target='_blank'>
          <GithubOutlined style={{ fontSize: '45px', color: '#fff' }} />
        </a>
      </div>
      <Menu
        mode='inline'
        theme='dark'
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onClick={onClick}
        onOpenChange={onOpenChange}
        items={menu}></Menu>
    </Sider>
  );
};

AppAside.propTypes = {
  menuToggle: PropTypes.bool
};

export default React.memo(AppAside);
