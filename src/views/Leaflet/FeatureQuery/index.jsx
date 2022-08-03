import { Tabs } from 'antd';
import './FeatureQuery.scss';
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

const { TabPane } = Tabs;

export default function FeatureQueryView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='地图文档要素查询(高亮)' key='1'>
        <Feature1 />
      </TabPane>
      <TabPane tab='地图文档圆查询(JSON)' key='2'>
        <Feature2 />
      </TabPane>
      <TabPane tab='地图文档线查询(JSON)' key='3'>
        <Feature3 />
      </TabPane>
      <TabPane tab='地图文档矩形查询(JSON)' key='4'>
        <Feature4 />
      </TabPane>
      <TabPane tab='地图文档多边形查询(JSON)' key='5'>
        <Feature5 />
      </TabPane>
      <TabPane tab='地图文档属性查询(JSON)' key='6'>
        <Feature6 />
      </TabPane>
      <TabPane tab='地图文档几何属性查询(JSON)' key='7'>
        <Feature7 />
      </TabPane>
      <TabPane tab='地图文档FID查询(JSON)' key='8'>
        <Feature8 />
      </TabPane>
      <TabPane tab='地图文档点图层查询(JSON)' key='9'>
        <Feature9 />
      </TabPane>
      <TabPane tab='矢量图层点图层查询(JSON)' key='10'>
        <Feature10 />
      </TabPane>
      <TabPane tab='矢量图层要素查询(高亮)' key='11'>
        <Feature11 />
      </TabPane>
      <TabPane tab='矢量图层属性查询(返回JSON)' key='12'>
        <Feature12 />
      </TabPane>
      <TabPane tab='矢量图层几何查询(返回JSON)' key='13'>
        <Feature13 />
      </TabPane>
      <TabPane tab='矢量图层FID查询(返回JSON)' key='14'>
        <Feature14 />
      </TabPane>
      <TabPane tab='对象类要素查询' key='15'>
        <Feature15 />
      </TabPane>
      <TabPane tab='多几何要素查询' key='16'>
        <Feature16 />
      </TabPane>
    </Tabs>
  );
}
