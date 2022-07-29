import { Tabs } from 'antd';
import './MapService.scss';
import Map1 from './Map1.jsx';
import Map2 from './Map2.jsx';
import Map3 from './Map3.jsx';
import Map4 from './Map4.jsx';
import Map5 from './Map5.jsx';
import Map6 from './Map6.jsx';

const { TabPane } = Tabs;

export default function MapServiceView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='获取地图图片文档URL' key='1'>
        <Map1 />
      </TabPane>
      <TabPane tab='获取图层图片URL' key='2'>
        <Map2 />
      </TabPane>
      <TabPane tab='获取瓦片图片URL' key='3'>
        <Map3 />
      </TabPane>
      <TabPane tab='获取文档图片信息' key='4'>
        <Map4 />
      </TabPane>
      <TabPane tab='获取瓦片图片信息' key='5'>
        <Map5 />
      </TabPane>
      <TabPane tab='获取瓦片地图图片URL' key='6'>
        <Map6 />
      </TabPane>
    </Tabs>
  );
}
