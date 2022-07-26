import { Tabs } from 'antd';
import './ProjectionTransformation.scss';
import Layer from './Layer.jsx';
import SpatialReference from './SpatialReference.jsx';

const { TabPane } = Tabs;

export default function ProjectionTransformationView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='投影转换(图层)' key='1'>
        <Layer />
      </TabPane>
      <TabPane tab='投影转换(空间参照)' key='2'>
        <SpatialReference />
      </TabPane>
    </Tabs>
  );
}
