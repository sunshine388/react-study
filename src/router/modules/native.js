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
  label: '??????',
  key: '/native',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: '???CSS',
      key: '/native/pureCSS',
      children: [
        {
          label: <Link to='/native/pureCSS/batman'>?????????</Link>,
          key: '/native/pureCSS/batman'
        },
        {
          label: <Link to='/native/pureCSS/activeText'>????????????</Link>,
          key: '/native/pureCSS/activeText'
        },
        {
          label: <Link to='/native/pureCSS/gradientText'>????????????</Link>,
          key: '/native/pureCSS/gradientText'
        },
        {
          label: <Link to='/native/pureCSS/zebraShadowText'>??????????????????</Link>,
          key: '/native/pureCSS/zebraShadowText'
        },
        {
          label: (
            <Link to='/native/pureCSS/materialInput'>Material???????????????</Link>
          ),
          key: '/native/pureCSS/materialInput'
        },
        {
          label: <Link to='/native/pureCSS/carousel'>???????????????????????????</Link>,
          key: '/native/pureCSS/carousel'
        },
        {
          label: <Link to='/native/pureCSS/tapeEdge'>????????????</Link>,
          key: '/native/pureCSS/tapeEdge'
        },
        {
          label: <Link to='/native/pureCSS/multilayerBorder'>????????????</Link>,
          key: '/native/pureCSS/multilayerBorder'
        },
        {
          label: <Link to='/native/pureCSS/filletedCorner'>?????????</Link>,
          key: '/native/pureCSS/filletedCorner'
        },
        {
          label: <Link to='/native/pureCSS/parallelogram'>???????????????</Link>,
          key: '/native/pureCSS/parallelogram'
        },
        {
          label: <Link to='/native/pureCSS/frostedGlass'>?????????</Link>,
          key: '/native/pureCSS/frostedGlass'
        },
        {
          label: <Link to='/native/pureCSS/photoFrame'>??????</Link>,
          key: '/native/pureCSS/photoFrame'
        },
        {
          label: <Link to='/native/pureCSS/turnBorder'>????????????</Link>,
          key: '/native/pureCSS/turnBorder'
        },
        {
          label: <Link to='/native/pureCSS/loading'>Loading</Link>,
          key: '/native/pureCSS/loading'
        },
        {
          label: (
            <Link to='/native/pureCSS/gradientBGAnimation'>??????????????????</Link>
          ),
          key: '/native/pureCSS/gradientBGAnimation'
        }
      ]
    },
    {
      label: '?????????',
      key: '/native/threePiece',
      children: [
        {
          label: <Link to='/native/threePiece/parallax'>????????????</Link>,
          key: '/native/threePiece/parallax'
        }
      ]
    }
  ]
};
