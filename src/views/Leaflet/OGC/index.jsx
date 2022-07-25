import { Tabs } from 'antd';
import './OGC.scss';
import WMTS from './WMTS.jsx';
import WMS from './WMS.jsx';
import WFS from './WFS.jsx';

const { TabPane } = Tabs;

export default function OGCView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='WMTS' key='1'>
        <WMTS />
      </TabPane>
      <TabPane tab='WMS' key='2'>
        <WMS />
      </TabPane>
      <TabPane tab='WFS' key='3'>
        <WFS />
      </TabPane>
    </Tabs>
  );
}
