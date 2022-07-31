import { Tabs } from 'antd';
import './DirectoryService.scss';
import DirectoryService1 from './DirectoryService1.jsx';
import DirectoryService2 from './DirectoryService2.jsx';
import DirectoryService3 from './DirectoryService3.jsx';
import DirectoryService4 from './DirectoryService4.jsx';
import DirectoryService5 from './DirectoryService5.jsx';
import DirectoryService6 from './DirectoryService6.jsx';
import DirectoryService7 from './DirectoryService7.jsx';
import DirectoryService8 from './DirectoryService8.jsx';

const { TabPane } = Tabs;

export default function DirectoryServiceView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='数据源目录服务' key='1'>
        <DirectoryService1 />
      </TabPane>
      <TabPane tab='数据库目录服务' key='2'>
        <DirectoryService2 />
      </TabPane>
      <TabPane tab='地图文档目录服务' key='3'>
        <DirectoryService3 />
      </TabPane>
      <TabPane tab='矢量图层目录服务' key='4'>
        <DirectoryService4 />
      </TabPane>
      <TabPane tab='瓦片目录服务' key='5'>
        <DirectoryService5 />
      </TabPane>
      <TabPane tab='空间参考系目录服务' key='6'>
        <DirectoryService6 />
      </TabPane>
      <TabPane tab='图例服务' key='7'>
        <DirectoryService7 />
      </TabPane>
      <TabPane tab='RGB和颜色转换服务' key='8'>
        <DirectoryService8 />
      </TabPane>
    </Tabs>
  );
}
