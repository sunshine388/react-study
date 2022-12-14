import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const StatedView = React.lazy(() => import('@/views/BaiduMap/Stated'));
const Basic3DView = React.lazy(() => import('@/views/BaiduMap/Basic3D'));
const Earth3DView = React.lazy(() => import('@/views/BaiduMap/3DEarth'));
const ControlView = React.lazy(() => import('@/views/BaiduMap/Control'));
const CustomThemeView = React.lazy(() =>
  import('@/views/BaiduMap/CustomTheme')
);
const DrawIconView = React.lazy(() => import('@/views/BaiduMap/DrawIcon'));
const DrawLineView = React.lazy(() => import('@/views/BaiduMap/DrawLine'));
const DrawPolygonView = React.lazy(() =>
  import('@/views/BaiduMap/DrawPolygon')
);
const DrawLabelView = React.lazy(() => import('@/views/BaiduMap/DrawLabel'));
const InfoWindowView = React.lazy(() => import('@/views/BaiduMap/InfoWindow'));
const AnimationView = React.lazy(() => import('@/views/BaiduMap/Animation'));
const TrackAnimationView = React.lazy(() =>
  import('@/views/BaiduMap/TrackAnimation')
);
const ScatterDiagramView = React.lazy(() =>
  import('@/views/BaiduMap/ScatterDiagram')
);
const FlyLineView = React.lazy(() => import('@/views/BaiduMap/FlyLine'));
const FlyLine2View = React.lazy(() => import('@/views/BaiduMap/FlyLine2'));
const Architecture3DView = React.lazy(() =>
  import('@/views/BaiduMap/3DArchitecture')
);
const Architecture3D2View = React.lazy(() =>
  import('@/views/BaiduMap/3DArchitecture2')
);

export const baiduMapRoutes = [
  { path: 'baiduMap/stated', component: <StatedView /> },
  { path: 'baiduMap/basic3D', component: <Basic3DView /> },
  { path: 'baiduMap/3DEarth', component: <Earth3DView /> },
  { path: 'baiduMap/control', component: <ControlView /> },
  { path: 'baiduMap/customTheme', component: <CustomThemeView /> },
  { path: 'baiduMap/drawIcon', component: <DrawIconView /> },
  { path: 'baiduMap/drawLine', component: <DrawLineView /> },
  { path: 'baiduMap/drawPolygon', component: <DrawPolygonView /> },
  { path: 'baiduMap/drawLabel', component: <DrawLabelView /> },
  { path: 'baiduMap/infoWindow', component: <InfoWindowView /> },
  { path: 'baiduMap/animation', component: <AnimationView /> },
  { path: 'baiduMap/trackAnimation', component: <TrackAnimationView /> },
  { path: 'baiduMap/scatterDiagram', component: <ScatterDiagramView /> },
  { path: 'baiduMap/flyLine', component: <FlyLineView /> },
  { path: 'baiduMap/flyLine2', component: <FlyLine2View /> },
  { path: 'baiduMap/3DArchitecture', component: <Architecture3DView /> },
  { path: 'baiduMap/3DArchitecture2', component: <Architecture3D2View /> }
];

export const baiduMapMenu = {
  label: '????????????',
  key: '/baiduMap',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/baiduMap/stated'>??????</Link>,
      key: '/baiduMap/stated'
    },
    {
      label: <Link to='/baiduMap/basic3D'>??????3D??????</Link>,
      key: '/baiduMap/basic3D'
    },
    {
      label: <Link to='/baiduMap/3DEarth'>3D ??????</Link>,
      key: '/baiduMap/3DEarth'
    },
    {
      label: <Link to='/baiduMap/control'>??????</Link>,
      key: '/baiduMap/control'
    },
    {
      label: <Link to='/baiduMap/customTheme'>???????????????</Link>,
      key: '/baiduMap/customTheme'
    },
    {
      label: <Link to='/baiduMap/drawIcon'>????????????</Link>,
      key: '/baiduMap/drawIcon'
    },
    {
      label: <Link to='/baiduMap/drawLine'>????????????</Link>,
      key: '/baiduMap/drawLine'
    },
    {
      label: <Link to='/baiduMap/drawPolygon'>???????????????</Link>,
      key: '/baiduMap/drawPolygon'
    },
    {
      label: <Link to='/baiduMap/drawLabel'>????????????</Link>,
      key: '/baiduMap/drawLabel'
    },
    {
      label: <Link to='/baiduMap/infoWindow'>?????????????????????</Link>,
      key: '/baiduMap/infoWindow'
    },
    {
      label: <Link to='/baiduMap/animation'>?????? ViewAnimation</Link>,
      key: '/baiduMap/animation'
    },
    {
      label: <Link to='/baiduMap/trackAnimation'>???????????? TrackAnimation</Link>,
      key: '/baiduMap/trackAnimation'
    },
    {
      label: <Link to='/baiduMap/scatterDiagram'>?????????</Link>,
      key: '/baiduMap/scatterDiagram'
    },
    {
      label: <Link to='/baiduMap/flyLine'>?????????</Link>,
      key: '/baiduMap/flyLine'
    },
    {
      label: <Link to='/baiduMap/flyLine2'>?????????2</Link>,
      key: '/baiduMap/flyLine2'
    },
    {
      label: <Link to='/baiduMap/3DArchitecture'>3D??????</Link>,
      key: '/baiduMap/3DArchitecture'
    },
    {
      label: (
        <Link to='/baiduMap/3DArchitecture2'>3D?????????????????????????????????</Link>
      ),
      key: '/baiduMap/3DArchitecture2'
    }
  ]
};
