import { Tabs } from 'antd';
import './MapShow.scss';
import TileMap from './TileMap';
import VectorMapDoc from './VectorMapDoc';
import VectorLayer from './VectorLayer';
import TiandituOnline from './TiandituOnline';
import TiandituOffline from './TiandituOffline';
import ArcgisMap from './ArcgisMap';
import GoogleOnline from './GoogleOnline';
import GoogleOffline from './GoogleOffline';
import WMTS from './WMTS';
import WMS from './WMS';
import WFS from './WFS';

const { TabPane } = Tabs;

export default function MapShowView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='瓦片地图显示' key='1'>
        <TileMap />
      </TabPane>
      <TabPane tab='矢量地图文档显示' key='2'>
        <VectorMapDoc />
      </TabPane>
      <TabPane tab='矢量图层显示' key='3'>
        <VectorLayer />
      </TabPane>
      <TabPane tab='天地图显示(在线)' key='4'>
        <TiandituOnline />
      </TabPane>
      <TabPane tab='天地图显示(离线)' key='5'>
        <TiandituOffline />
      </TabPane>
      <TabPane tab='ArcGIS地图显示' key='6'>
        <ArcgisMap />
      </TabPane>
      <TabPane tab='谷歌地图显示(在线)' key='7'>
        <GoogleOnline />
      </TabPane>
      <TabPane tab='谷歌地图显示(离线)' key='8'>
        <GoogleOffline />
      </TabPane>
      <TabPane tab='WMTS地图显示' key='9'>
        <WMTS />
      </TabPane>
      <TabPane tab='WMS地图显示' key='10'>
        <WMS />
      </TabPane>
      <TabPane tab='WFS地图显示' key='11'>
        <WFS />
      </TabPane>
    </Tabs>
  );
}
