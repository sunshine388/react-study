import React, { useEffect, useState } from 'react';
import { Layout, Input, Form, Button, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';
import { useNavigate } from 'react-router-dom';

let timer = null;
export default function Login() {
  const [loading, setLoading] = useState();

  const navigate = useNavigate();

  const enterLoading = () => {
    setLoading(true);
  };

  const handleSubmit = (values) => {
    localStorage.setItem('user', JSON.stringify(values));
    enterLoading();
    timer = setTimeout(() => {
      message.success('登录成功!');
      navigate('/native/pureCSS/batman');
    }, 2000);
  };

  useEffect(() => {
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  return (
    <Layout className='login animated fadeIn'>
      <div className='model'>
        <div className='login-form'>
          <h3>登录</h3>
          <Divider />
          <Form onFinish={handleSubmit} initialValues={{ remember: true }}>
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
                loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
