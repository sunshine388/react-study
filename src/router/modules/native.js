import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const BatmanView = React.lazy(() => import('@/views/Native/PureCSS/Batman'));
const ActiveTextView = React.lazy(() =>
  import('@/views/Native/PureCSS/ActiveText')
);
const GradientTextView = React.lazy(() =>
  import('@/views/Native/PureCSS/GradientText')
);
const ZebraShadowTextView = React.lazy(() =>
  import('@/views/Native/PureCSS/ZebraShadowText')
);
const MaterialInputView = React.lazy(() =>
  import('@/views/Native/PureCSS/MaterialInput')
);
const CarouselView = React.lazy(() =>
  import('@/views/Native/PureCSS/Carousel')
);
const TapeEdgeView = React.lazy(() =>
  import('@/views/Native/PureCSS/TapeEdge')
);
const MultilayerBorderView = React.lazy(() =>
  import('@/views/Native/PureCSS/MultilayerBorder')
);
const FilletedCornerView = React.lazy(() =>
  import('@/views/Native/PureCSS/FilletedCorner')
);
const ParallelogramView = React.lazy(() =>
  import('@/views/Native/PureCSS/Parallelogram')
);
const FrostedGlassView = React.lazy(() =>
  import('@/views/Native/PureCSS/FrostedGlass')
);
const PhotoFrameView = React.lazy(() =>
  import('@/views/Native/PureCSS/PhotoFrame')
);
const TurnBorderView = React.lazy(() =>
  import('@/views/Native/PureCSS/TurnBorder')
);
const LoadingView = React.lazy(() => import('@/views/Native/PureCSS/Loading'));
const GradientBGAnimationView = React.lazy(() =>
  import('@/views/Native/PureCSS/GradientBGAnimation')
);
const ParallaxView = React.lazy(() =>
  import('@/views/Native/ThreePiece/Parallax')
);

export const nativeRoutes = [
  { path: 'native/pureCSS/batman', component: <BatmanView /> },
  { path: 'native/pureCSS/activeText', component: <ActiveTextView /> },
  { path: 'native/pureCSS/gradientText', component: <GradientTextView /> },
  {
    path: 'native/pureCSS/zebraShadowText',
    component: <ZebraShadowTextView />
  },
  { path: 'native/pureCSS/materialInput', component: <MaterialInputView /> },
  { path: 'native/pureCSS/carousel', component: <CarouselView /> },
  { path: 'native/pureCSS/tapeEdge', component: <TapeEdgeView /> },
  {
    path: 'native/pureCSS/multilayerBorder',
    component: <MultilayerBorderView />
  },
  { path: 'native/pureCSS/filletedCorner', component: <FilletedCornerView /> },
  { path: 'native/pureCSS/parallelogram', component: <ParallelogramView /> },
  { path: 'native/pureCSS/frostedGlass', component: <FrostedGlassView /> },
  { path: 'native/pureCSS/photoFrame', component: <PhotoFrameView /> },
  { path: 'native/pureCSS/turnBorder', component: <TurnBorderView /> },
  { path: 'native/pureCSS/loading', component: <LoadingView /> },
  {
    path: 'native/pureCSS/gradientBGAnimation',
    component: <GradientBGAnimationView />
  },
  { path: 'native/threePiece/parallax', component: <ParallaxView /> }
];

export const nativeMenu = {
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
        },
        {
          label: <Link to='/native/pureCSS/activeText'>动态文字</Link>,
          key: '/native/pureCSS/activeText'
        },
        {
          label: <Link to='/native/pureCSS/gradientText'>渐变文字</Link>,
          key: '/native/pureCSS/gradientText'
        },
        {
          label: <Link to='/native/pureCSS/zebraShadowText'>斑马投影文字</Link>,
          key: '/native/pureCSS/zebraShadowText'
        },
        {
          label: (
            <Link to='/native/pureCSS/materialInput'>Material风格输入框</Link>
          ),
          key: '/native/pureCSS/materialInput'
        },
        {
          label: <Link to='/native/pureCSS/carousel'>走马灯（手动控制）</Link>,
          key: '/native/pureCSS/carousel'
        },
        {
          label: <Link to='/native/pureCSS/tapeEdge'>缝边边框</Link>,
          key: '/native/pureCSS/tapeEdge'
        },
        {
          label: <Link to='/native/pureCSS/multilayerBorder'>多重边框</Link>,
          key: '/native/pureCSS/multilayerBorder'
        },
        {
          label: <Link to='/native/pureCSS/filletedCorner'>内圆角</Link>,
          key: '/native/pureCSS/filletedCorner'
        },
        {
          label: <Link to='/native/pureCSS/parallelogram'>平行四边形</Link>,
          key: '/native/pureCSS/parallelogram'
        },
        {
          label: <Link to='/native/pureCSS/frostedGlass'>毛玻璃</Link>,
          key: '/native/pureCSS/frostedGlass'
        },
        {
          label: <Link to='/native/pureCSS/photoFrame'>相框</Link>,
          key: '/native/pureCSS/photoFrame'
        },
        {
          label: <Link to='/native/pureCSS/turnBorder'>旋转边框</Link>,
          key: '/native/pureCSS/turnBorder'
        },
        {
          label: <Link to='/native/pureCSS/loading'>Loading</Link>,
          key: '/native/pureCSS/loading'
        },
        {
          label: (
            <Link to='/native/pureCSS/gradientBGAnimation'>动态渐变背景</Link>
          ),
          key: '/native/pureCSS/gradientBGAnimation'
        }
      ]
    },
    {
      label: '三件套',
      key: '/native/threePiece',
      children: [
        {
          label: <Link to='/native/threePiece/parallax'>视差效果</Link>,
          key: '/native/threePiece/parallax'
        }
      ]
    }
  ]
};
