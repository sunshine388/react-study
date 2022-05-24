import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import withRouter from '@/utils/withRouter';
import menu from '@/router/menu';

const { Sider } = Layout;

class AppAside extends Component {
  state = {
    openKeys: [],
    selectedKeys: []
  };

  // 处理 pathname
  getOpenKeys = (string) => {
    let newStr = '',
      newArr = [],
      arr = string.split('/').map((i) => '/' + i);
    for (let i = 1; i < arr.length - 1; i++) {
      newStr += arr[i];
      newArr.push(newStr);
    }
    return newArr;
  };

  componentDidMount() {
    let { pathname } = this.props.location;
    this.setState({
      selectedKeys: [pathname],
      openKeys: this.getOpenKeys(pathname)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let { pathname } = this.props.location;
    if (prevProps.location.pathname !== pathname) {
      this.setState({
        selectedKeys: [pathname],
        openKeys: this.getOpenKeys(pathname)
      });
    }
  }

  onOpenChange = (openKeys) => {
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys
      });
      return;
    }

    const latestOpenKey = openKeys[openKeys.length - 1];

    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      });
    } else {
      this.setState({
        openKeys: [latestOpenKey]
      });
    }
  };
  onClick = ({ key }) => {
    this.setState({ selectedKeys: [key] });
  };

  render() {
    let { openKeys, selectedKeys } = this.state;
    return (
      <Sider className='aside' collapsed={this.props.menuToggle}>
        <div className='logo'>
          <a
            rel='noopener noreferrer'
            href='https://github.com/sunshine388'
            target='_blank'>
            <GithubOutlined style={{ fontSize: '3.8rem', color: '#fff' }} />
          </a>
        </div>
        <Menu
          mode='inline'
          theme='dark'
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onClick={this.onClick}
          onOpenChange={this.onOpenChange}
          items={menu}></Menu>
      </Sider>
    );
  }
}

AppAside.propTypes = {
  menuToggle: PropTypes.bool
};

export default withRouter(AppAside);
