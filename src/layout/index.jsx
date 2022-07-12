import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, message } from 'antd';
import './layout.scss';
import { useNavigate } from 'react-router-dom';

import AppHeader from './AppHeader.jsx';
import AppAside from './AppAside.jsx';
import AppFooter from './AppFooter.jsx';

const { Content } = Layout;

export default function DefaultLayout() {
  const [menuToggle, setMenuToggle] = useState();
  const navigate = useNavigate();

  const isLogin = () => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  };

  const loginOut = () => {
    localStorage.clear();
    navigate('/login');
    message.success('登出成功!');
  };

  const menuToggleAction = () => {
    setMenuToggle((val) => !val);
  };

  useEffect(() => {
    isLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout className='app'>
      <AppAside menuToggle={menuToggle} />
      <Layout
        style={{
          width: menuToggle ? 'calc(100% - 80px)' : 'calc(100% - 200px)',
          height: '100%'
        }}>
        <AppHeader
          menuToggle={menuToggle}
          menuClick={menuToggleAction}
          loginOut={loginOut}
        />
        <Content className='app_content'>
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
}
