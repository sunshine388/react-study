import { Tabs } from 'antd';
import './ThematicMapService.scss';
import Map1 from './Map1.jsx';
import Map2 from './Map2.jsx';
import Map3 from './Map3.jsx';
import Map4 from './Map4.jsx';
import Map5 from './Map5.jsx';
import Map6 from './Map6.jsx';
import Map7 from './Map7.jsx';
import Map8 from './Map8.jsx';

const { TabPane } = Tabs;

export default function ThematicMapServiceView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='获取专题图信息' key='1'>
        <Map1 />
      </TabPane>
      <TabPane tab='获取单值专题图' key='2'>
        <Map2 />
      </TabPane>
      <TabPane tab='添加分段专题图' key='3'>
        <Map3 />
      </TabPane>
      <TabPane tab='添加多字段分段专题图' key='4'>
        <Map4 />
      </TabPane>
      <TabPane tab='添加统一专题图' key='5'>
        <Map5 />
      </TabPane>
      <TabPane tab='添加统计专题图' key='6'>
        <Map6 />
      </TabPane>
      <TabPane tab='添加密度专题图' key='7'>
        <Map7 />
      </TabPane>
      <TabPane tab='添加等级专题图' key='8'>
        <Map8 />
      </TabPane>
    </Tabs>
  );
}
