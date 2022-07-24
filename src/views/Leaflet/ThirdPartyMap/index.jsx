import { Tabs } from 'antd';
import './ThirdPartyMap.scss';
import BingMap from './BingMap.jsx';
import OSM from './OSM.jsx';
import Tianditu from './Tianditu.jsx';
import GoogleMap from './GoogleMap.jsx';
import BaiduMap from './BaiduMap';
import KML from './KML.jsx';
import GridTiles from './GridTiles.jsx';
import GeoJSON from './GeoJSON.jsx';
import GPX from './GPX.jsx';
import ArcGISTiles from './ArcGISTiles.jsx';
import GaodeMap from './GaodeMap';
import ZhiTu from './ZhiTu.jsx';

const { TabPane } = Tabs;

export default function ThirdPartyMapView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='Bing地图' key='1'>
        <BingMap />
      </TabPane>
      <TabPane tab='OSM地图' key='2'>
        <OSM />
      </TabPane>
      <TabPane tab='天地图' key='3'>
        <Tianditu />
      </TabPane>
      <TabPane tab='谷歌地图' key='4'>
        <GoogleMap />
      </TabPane>
      <TabPane tab='百度地图' key='5'>
        <BaiduMap />
      </TabPane>
      <TabPane tab='KML' key='6'>
        <KML />
      </TabPane>
      <TabPane tab='网格瓦片' key='7'>
        <GridTiles />
      </TabPane>
      <TabPane tab='GeoJSON' key='8'>
        <GeoJSON />
      </TabPane>
      <TabPane tab='GPX' key='9'>
        <GPX />
      </TabPane>
      <TabPane tab='ArcGIS瓦片' key='10'>
        <ArcGISTiles />
      </TabPane>
      <TabPane tab='高德地图' key='11'>
        <GaodeMap />
      </TabPane>
      <TabPane tab='智图' key='12'>
        <ZhiTu />
      </TabPane>
    </Tabs>
  );
}
