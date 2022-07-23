import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import '@/styles/index.scss';

const View404 = React.lazy(() => import('@/views/Others/404'));
const View500 = React.lazy(() => import('@/views/Others/500'));
const Login = React.lazy(() => import('@/views/Login'));
const Layout = React.lazy(() => import('@/layout'));

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24
    }}
    spin
  />
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Spin indicator={antIcon} />}>
        <Routes>
          <Route exact path='/login' name='Login Page' element={<Login />} />
          <Route exact path='/404' name='Page 404' element={<View404 />} />
          <Route exact path='/500' name='Page 500' element={<View500 />} />
          <Route path='*' name='Home' element={<Layout />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
