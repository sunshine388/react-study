import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, BackTop, message } from 'antd';
import './layout.scss';
import withRouter from '@/utils/withRouter';

import AppHeader from './AppHeader.jsx';
import AppAside from './AppAside.jsx';
import AppFooter from './AppFooter.jsx';

const { Content } = Layout;

class DefaultLayout extends Component {
  state = {
    menuToggle: false
  };

  isLogin = () => {
    if (!localStorage.getItem('user')) {
      this.props.navigate('/login');
    }
  };

  loginOut = () => {
    localStorage.clear();
    this.props.navigate('/login');
    message.success('登出成功!');
  };

  menuToggleAction = () => {
    this.setState({
      menuToggle: !this.state.menuToggle
    });
  };

  componentDidMount() {
    this.isLogin();
  }

  render() {
    return (
      <Layout className='app'>
        <BackTop />
        <AppAside menuToggle={this.state.menuToggle} />
        <Layout
          style={{
            width: this.state.menuToggle
              ? 'calc(100% - 80px)'
              : 'calc(100% - 200px)',
            height: '100%'
          }}>
          <AppHeader
            menuToggle={this.state.menuToggle}
            menuClick={this.menuToggleAction}
            loginOut={this.loginOut}
          />
          <Content className='content'>
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(DefaultLayout);
