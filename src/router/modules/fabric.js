import { AppstoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const StatedView = React.lazy(() => import('@/views/FabricJS/Basic/Stated'));
const BasicGraphView = React.lazy(() =>
  import('@/views/FabricJS/Basic/BasicGraph')
);
const UseImageView = React.lazy(() =>
  import('@/views/FabricJS/Basic/UseImage')
);
const DrawPathView = React.lazy(() =>
  import('@/views/FabricJS/Basic/DrawPath')
);
const AnimationView = React.lazy(() =>
  import('@/views/FabricJS/Basic/Animation')
);
const FilterView = React.lazy(() => import('@/views/FabricJS/Basic/Filter'));
const GradientView = React.lazy(() =>
  import('@/views/FabricJS/Basic/Gradient')
);
const ColorView = React.lazy(() => import('@/views/FabricJS/Basic/Color'));
const TextView = React.lazy(() => import('@/views/FabricJS/Basic/Text'));
const ITextView = React.lazy(() => import('@/views/FabricJS/Basic/IText'));
const TextboxView = React.lazy(() => import('@/views/FabricJS/Basic/Textbox'));
const EventView = React.lazy(() => import('@/views/FabricJS/Basic/Event'));
const GroupsView = React.lazy(() => import('@/views/FabricJS/Basic/Groups'));
const FreeDrawingView = React.lazy(() =>
  import('@/views/FabricJS/Basic/FreeDrawing')
);
const LockingView = React.lazy(() => import('@/views/FabricJS/Basic/Locking'));
const ChangingBordersCornersView = React.lazy(() =>
  import('@/views/FabricJS/Basic/ChangingBordersCorners')
);
const SelectedStyleView = React.lazy(() =>
  import('@/views/FabricJS/Basic/SelectedStyle')
);
const ZoomAndPanningView = React.lazy(() =>
  import('@/views/FabricJS/Basic/ZoomAndPanning')
);
const ClipPathView = React.lazy(() =>
  import('@/views/FabricJS/Basic/ClipPath')
);
const SerializationView = React.lazy(() =>
  import('@/views/FabricJS/Basic/Serialization')
);
const DeserializationView = React.lazy(() =>
  import('@/views/FabricJS/Basic/Deserialization')
);

const CustomControlRenderView = React.lazy(() =>
  import('@/views/FabricJS/Demo/CustomControlRender')
);
const ManageSelectionView = React.lazy(() =>
  import('@/views/FabricJS/Demo/ManageSelection')
);
const CopyPasteView = React.lazy(() =>
  import('@/views/FabricJS/Demo/CopyPaste')
);
const AnimationEasingView = React.lazy(() =>
  import('@/views/FabricJS/Demo/AnimationEasing')
);
const HoveringView = React.lazy(() => import('@/views/FabricJS/Demo/Hovering'));
const CustomizationView = React.lazy(() =>
  import('@/views/FabricJS/Demo/Customization')
);

export const fabricRoutes = [
  { path: 'fabric/basic/stated', component: <StatedView /> },
  { path: 'fabric/basic/basicGraph', component: <BasicGraphView /> },
  { path: 'fabric/basic/useImage', component: <UseImageView /> },
  { path: 'fabric/basic/drawPath', component: <DrawPathView /> },
  { path: 'fabric/basic/animation', component: <AnimationView /> },
  { path: 'fabric/basic/filter', component: <FilterView /> },
  { path: 'fabric/basic/gradient', component: <GradientView /> },
  { path: 'fabric/basic/color', component: <ColorView /> },
  { path: 'fabric/basic/text', component: <TextView /> },
  { path: 'fabric/basic/iText', component: <ITextView /> },
  { path: 'fabric/basic/textbox', component: <TextboxView /> },
  { path: 'fabric/basic/event', component: <EventView /> },
  { path: 'fabric/basic/groups', component: <GroupsView /> },
  { path: 'fabric/basic/freeDrawing', component: <FreeDrawingView /> },
  { path: 'fabric/basic/locking', component: <LockingView /> },
  {
    path: 'fabric/basic/changingBordersCorners',
    component: <ChangingBordersCornersView />
  },
  { path: 'fabric/basic/selectedStyle', component: <SelectedStyleView /> },
  { path: 'fabric/basic/zoomAndPanning', component: <ZoomAndPanningView /> },
  { path: 'fabric/basic/clipPath', component: <ClipPathView /> },
  { path: 'fabric/basic/serialization', component: <SerializationView /> },
  { path: 'fabric/basic/deserialization', component: <DeserializationView /> },
  {
    path: 'fabric/demo/customControlRender',
    component: <CustomControlRenderView />
  },
  {
    path: 'fabric/demo/manageSelection',
    component: <ManageSelectionView />
  },
  {
    path: 'fabric/demo/copyPaste',
    component: <CopyPasteView />
  },
  {
    path: 'fabric/demo/animationEasing',
    component: <AnimationEasingView />
  },
  {
    path: 'fabric/demo/hovering',
    component: <HoveringView />
  },
  {
    path: 'fabric/demo/customization',
    component: <CustomizationView />
  }
];

export const fabricMenu = {
  label: 'FabricJS',
  key: '/fabric',
  icon: <AppstoreOutlined />,
  children: [
    {
      label: '基础',
      key: '/fabric/basic',
      children: [
        {
          label: <Link to='/fabric/basic/stated'>起步</Link>,
          key: '/fabric/basic/stated'
        },
        {
          label: <Link to='/fabric/basic/basicGraph'>基础图形</Link>,
          key: '/fabric/basic/basicGraph'
        },
        {
          label: <Link to='/fabric/basic/useImage'>使用图片</Link>,
          key: '/fabric/basic/useImage'
        },
        {
          label: <Link to='/fabric/basic/drawPath'>绘制路径</Link>,
          key: '/fabric/basic/drawPath'
        },
        {
          label: <Link to='/fabric/basic/animation'>动画</Link>,
          key: '/fabric/basic/animation'
        },
        {
          label: <Link to='/fabric/basic/filter'>滤镜</Link>,
          key: '/fabric/basic/filter'
        },
        {
          label: <Link to='/fabric/basic/gradient'>渐变</Link>,
          key: '/fabric/basic/gradient'
        },
        {
          label: <Link to='/fabric/basic/color'>颜色转换/颜色叠加</Link>,
          key: '/fabric/basic/color'
        },
        {
          label: <Link to='/fabric/basic/text'>文本</Link>,
          key: '/fabric/basic/text'
        },
        {
          label: <Link to='/fabric/basic/iText'>可编辑文本</Link>,
          key: '/fabric/basic/iText'
        },
        {
          label: <Link to='/fabric/basic/textbox'>文本框</Link>,
          key: '/fabric/basic/textbox'
        },
        {
          label: <Link to='/fabric/basic/event'>事件</Link>,
          key: '/fabric/basic/event'
        },
        {
          label: <Link to='/fabric/basic/groups'>分组</Link>,
          key: '/fabric/basic/groups'
        },
        {
          label: <Link to='/fabric/basic/freeDrawing'>自由绘画</Link>,
          key: '/fabric/basic/freeDrawing'
        },
        {
          label: <Link to='/fabric/basic/locking'>锁定</Link>,
          key: '/fabric/basic/locking'
        },
        {
          label: (
            <Link to='/fabric/basic/changingBordersCorners'>修改边角状态</Link>
          ),
          key: '/fabric/basic/changingBordersCorners'
        },
        {
          label: <Link to='/fabric/basic/selectedStyle'>选中状态的样式</Link>,
          key: '/fabric/basic/selectedStyle'
        },
        {
          label: <Link to='/fabric/basic/zoomAndPanning'>缩放和平移</Link>,
          key: '/fabric/basic/zoomAndPanning'
        },
        {
          label: <Link to='/fabric/basic/clipPath'>路径裁剪</Link>,
          key: '/fabric/basic/clipPath'
        },
        {
          label: <Link to='/fabric/basic/serialization'>序列化</Link>,
          key: '/fabric/basic/serialization'
        },
        {
          label: <Link to='/fabric/basic/deserialization'>反序列化</Link>,
          key: '/fabric/basic/deserialization'
        }
      ]
    },
    {
      label: '模板',
      key: '/fabric/demo',
      children: [
        {
          label: <Link to='/fabric/demo/customControlRender'>自定义控件</Link>,
          key: '/fabric/demo/customControlRender'
        },
        {
          label: <Link to='/fabric/demo/manageSelection'>框选管理</Link>,
          key: '/fabric/demo/manageSelection'
        },
        {
          label: <Link to='/fabric/demo/copyPaste'>复制粘贴</Link>,
          key: '/fabric/demo/copyPaste'
        },
        {
          label: <Link to='/fabric/demo/animationEasing'>动画集</Link>,
          key: '/fabric/demo/animationEasing'
        },
        {
          label: <Link to='/fabric/demo/hovering'>鼠标经过时</Link>,
          key: '/fabric/demo/hovering'
        },
        {
          label: (
            <Link to='/fabric/demo/customization'>自定义对象操作方式</Link>
          ),
          key: '/fabric/demo/customization'
        }
      ]
    }
  ]
};
