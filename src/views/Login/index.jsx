import React, { Component } from 'react';
import { Layout, Input, Form, Button, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '@/styles/view-style/login.scss';
import withRouter from '@/utils/withRouter';

class Login extends Component {
  state = {
    loading: false
  };

  enterLoading = () => {
    this.setState({
      loading: true
    });
  };

  handleSubmit = (values) => {
    localStorage.setItem('user', JSON.stringify(values));
    this.enterLoading();
    this.timer = setTimeout(() => {
      message.success('登录成功!');
      this.props.navigate('/public/button');
    }, 2000);
  };

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <Layout className='login animated fadeIn'>
        <div className='model'>
          <div className='login-form'>
            <h3>登录</h3>
            <Divider />
            <Form
              onFinish={this.handleSubmit}
              initialValues={{ remember: true }}>
              <Form.Item
                name='username'
                rules={[{ required: true, message: '请输入用户名' }]}>
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='用户名'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[{ required: true, message: '请输入密码' }]}>
                <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='密码'
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                  loading={this.state.loading}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withRouter(Login);
