import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import loadable from '@/utils/loadable';

const StatedView = loadable(() => import('@/views/BaiduMap/Stated'));
const Basic3DView = loadable(() => import('@/views/BaiduMap/Basic3D'));
const Earth3DView = loadable(() => import('@/views/BaiduMap/3DEarth'));
const ControlView = loadable(() => import('@/views/BaiduMap/Control'));
const CustomThemeView = loadable(() => import('@/views/BaiduMap/CustomTheme'));
const DrawIconView = loadable(() => import('@/views/BaiduMap/DrawIcon'));
const DrawLineView = loadable(() => import('@/views/BaiduMap/DrawLine'));
const DrawPolygonView = loadable(() => import('@/views/BaiduMap/DrawPolygon'));
const DrawLabelView = loadable(() => import('@/views/BaiduMap/DrawLabel'));
const InfoWindowView = loadable(() => import('@/views/BaiduMap/InfoWindow'));
const AnimationView = loadable(() => import('@/views/BaiduMap/Animation'));
const TrackAnimationView = loadable(() => import('@/views/BaiduMap/TrackAnimation'));
const ScatterDiagramView = loadable(() => import('@/views/BaiduMap/ScatterDiagram'));
const FlyLineView = loadable(() => import('@/views/BaiduMap/FlyLine'));
const FlyLine2View = loadable(() => import('@/views/BaiduMap/FlyLine2'));
const Architecture3DView = loadable(() => import('@/views/BaiduMap/3DArchitecture'));
const Architecture3D2View = loadable(() => import('@/views/BaiduMap/3DArchitecture2'));

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
  label: '百度地图',
  key: '/baiduMap',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: <Link to='/baiduMap/stated'>起步</Link>,
      key: '/baiduMap/stated'
    },
    {
      label: <Link to='/baiduMap/basic3D'>基础3D地图</Link>,
      key: '/baiduMap/basic3D'
    },
    {
      label: <Link to='/baiduMap/3DEarth'>3D 地球</Link>,
      key: '/baiduMap/3DEarth'
    },
    {
      label: <Link to='/baiduMap/control'>控件</Link>,
      key: '/baiduMap/control'
    },
    {
      label: <Link to='/baiduMap/customTheme'>自定义主题</Link>,
      key: '/baiduMap/customTheme'
    },
    {
      label: <Link to='/baiduMap/drawIcon'>绘制图标</Link>,
      key: '/baiduMap/drawIcon'
    },
    {
      label: <Link to='/baiduMap/drawLine'>绘制线段</Link>,
      key: '/baiduMap/drawLine'
    },
    {
      label: <Link to='/baiduMap/drawPolygon'>绘制多边形</Link>,
      key: '/baiduMap/drawPolygon'
    },
    {
      label: <Link to='/baiduMap/drawLabel'>绘制文本</Link>,
      key: '/baiduMap/drawLabel'
    },
    {
      label: <Link to='/baiduMap/infoWindow'>包含信息的窗口</Link>,
      key: '/baiduMap/infoWindow'
    },
    {
      label: <Link to='/baiduMap/animation'>动画 ViewAnimation</Link>,
      key: '/baiduMap/animation'
    },
    {
      label: <Link to='/baiduMap/trackAnimation'>轨迹动画 TrackAnimation</Link>,
      key: '/baiduMap/trackAnimation'
    },
    {
      label: <Link to='/baiduMap/scatterDiagram'>散点图</Link>,
      key: '/baiduMap/scatterDiagram'
    },
    {
      label: <Link to='/baiduMap/flyLine'>飞线图</Link>,
      key: '/baiduMap/flyLine'
    },
    {
      label: <Link to='/baiduMap/flyLine2'>飞线图2</Link>,
      key: '/baiduMap/flyLine2'
    },
    {
      label: <Link to='/baiduMap/3DArchitecture'>3D建筑</Link>,
      key: '/baiduMap/3DArchitecture'
    },
    {
      label: (
        <Link to='/baiduMap/3DArchitecture2'>3D建筑（墨卡托投影坐标）</Link>
      ),
      key: '/baiduMap/3DArchitecture2'
    }
  ]
};
