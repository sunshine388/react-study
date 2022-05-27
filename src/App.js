import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import loadable from '@/utils/loadable';
import routes from '@/router';
import '@/styles/index.scss';

const View404 = loadable(() => import('@/views/Others/404'));
const View500 = loadable(() => import('@/views/Others/500'));
const Login = loadable(() => import('@/views/Login'));
const Layout = loadable(() => import('@/layout'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          {routes.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={item.component}></Route>
            );
          })}
          <Route path='' element={<Navigate to={'/native/pureCSS/batman'} />} />
        </Route>
        <Route path='*' element={<View404 />} />
        <Route path='/500' element={<View500 />} />
      </Routes>
    </Router>
  );
}

export default App;
