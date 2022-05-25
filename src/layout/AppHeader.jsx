import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Layout, Avatar } from 'antd';
import {
  UserOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import avatar from '@/assets/images/user.jpg';

const { Header } = Layout;

const AppHeader = (props) => {
  let { menuClick, menuToggle, loginOut } = props;
  const menu = (
    <Menu
      onClick={loginOut}
      items={[
        {
          label: '退出登录',
          key: 'logout',
          icon: <LoginOutlined />
        }
      ]}></Menu>
  );
  return (
    <Header className='header'>
      <div className='left'>
        {menuToggle ? (
          <MenuFoldOutlined onClick={menuClick} />
        ) : (
          <MenuUnfoldOutlined onClick={menuClick} />
        )}
      </div>
      <div className='right'>
        <div>
          <Dropdown overlay={menu} overlayStyle={{ width: '120px' }}>
            <div className='ant-dropdown-link'>
              <Avatar
                icon={<UserOutlined />}
                src={avatar}
                alt='avatar'
                style={{ cursor: 'pointer' }}
              />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

AppHeader.propTypes = {
  menuClick: PropTypes.func,
  menuToggle: PropTypes.bool,
  loginOut: PropTypes.func
};

export default React.memo(AppHeader);
