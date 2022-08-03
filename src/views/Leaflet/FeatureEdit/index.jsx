import { Tabs } from 'antd';
import './FeatureEdit.scss';
import Feature1 from './Feature1.jsx';
import Feature2 from './Feature2.jsx';
import Feature3 from './Feature3.jsx';
import Feature4 from './Feature4.jsx';
import Feature5 from './Feature5.jsx';
import Feature6 from './Feature6.jsx';
import Feature7 from './Feature7.jsx';
import Feature8 from './Feature8.jsx';
import Feature9 from './Feature9.jsx';
import Feature10 from './Feature10.jsx';
import Feature11 from './Feature11.jsx';
import Feature12 from './Feature12.jsx';
import Feature13 from './Feature13.jsx';
import Feature14 from './Feature14.jsx';
import Feature15 from './Feature15.jsx';
import Feature16 from './Feature16.jsx';
import Feature17 from './Feature17.jsx';
import Feature18 from './Feature18.jsx';

const { TabPane } = Tabs;

export default function FeatureEditView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='地图文档点要素添加' key='1'>
        <Feature1 />
      </TabPane>
      <TabPane tab='地图文档点要素删除' key='2'>
        <Feature2 />
      </TabPane>
      <TabPane tab='地图文档点要素更新' key='3'>
        <Feature3 />
      </TabPane>
      <TabPane tab='地图文档线要素添加' key='4'>
        <Feature4 />
      </TabPane>
      <TabPane tab='地图文档线要素删除' key='5'>
        <Feature5 />
      </TabPane>
      <TabPane tab='地图文档线要素更新' key='6'>
        <Feature6 />
      </TabPane>
      <TabPane tab='地图文档区要素添加' key='7'>
        <Feature7 />
      </TabPane>
      <TabPane tab='地图文档区要素删除' key='8'>
        <Feature8 />
      </TabPane>
      <TabPane tab='地图文档区要素更新' key='9'>
        <Feature9 />
      </TabPane>
      <TabPane tab='矢量图层点要素添加' key='10'>
        <Feature10 />
      </TabPane>
      <TabPane tab='矢量图层点要素删除' key='11'>
        <Feature11 />
      </TabPane>
      <TabPane tab='矢量图层点要素更新' key='12'>
        <Feature12 />
      </TabPane>
      <TabPane tab='矢量图层线要素添加' key='13'>
        <Feature13 />
      </TabPane>
      <TabPane tab='矢量图层线要素删除' key='14'>
        <Feature14 />
      </TabPane>
      <TabPane tab='矢量图层线要素更新' key='15'>
        <Feature15 />
      </TabPane>
      <TabPane tab='矢量图层区要素添加' key='16'>
        <Feature16 />
      </TabPane>
      <TabPane tab='矢量图层区要素删除' key='17'>
        <Feature17 />
      </TabPane>
      <TabPane tab='矢量图层区要素更新' key='18'>
        <Feature18 />
      </TabPane>
    </Tabs>
  );
}
