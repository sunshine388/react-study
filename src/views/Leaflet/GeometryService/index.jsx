import { Tabs } from 'antd';
import './GeometryService.scss';
import Map1 from './Map1.jsx';
import Map2 from './Map2.jsx';
import Map3 from './Map3.jsx';
import Map4 from './Map4.jsx';
import Map5 from './Map5.jsx';
import Map6 from './Map6.jsx';

const { TabPane } = Tabs;

export default function GeometryServiceView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='计算面积' key='1'>
        <Map1 />
      </TabPane>
      <TabPane tab='计算折线长度' key='2'>
        <Map2 />
      </TabPane>
      <TabPane tab='投影点' key='3'>
        <Map3 />
      </TabPane>
      <TabPane tab='投影矩形' key='4'>
        <Map4 />
      </TabPane>
      <TabPane tab='光滑线' key='5'>
        <Map5 />
      </TabPane>
      <TabPane tab='拓扑分析' key='6'>
        <Map6 />
      </TabPane>
    </Tabs>
  );
}
