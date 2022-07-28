import { Tabs } from 'antd';
import './SpatialAnalysis.scss';
import Analysis1 from './Analysis1.jsx';
import Analysis2 from './Analysis2.jsx';
import Analysis3 from './Analysis3.jsx';
import Analysis4 from './Analysis4.jsx';
import Analysis5 from './Analysis5.jsx';
import Analysis6 from './Analysis6.jsx';
import Analysis7 from './Analysis7.jsx';
import Analysis8 from './Analysis8.jsx';
import Analysis9 from './Analysis9.jsx';

const { TabPane } = Tabs;

export default function SpatialAnalysisView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='类单圈缓存分析' key='1'>
        <Analysis1 />
      </TabPane>
      <TabPane tab='类多圈缓存分析' key='2'>
        <Analysis2 />
      </TabPane>
      <TabPane tab='要素单圈缓存分析' key='3'>
        <Analysis3 />
      </TabPane>
      <TabPane tab='要素多圈缓存分析' key='4'>
        <Analysis4 />
      </TabPane>
      <TabPane tab='圆裁剪分析' key='5'>
        <Analysis5 />
      </TabPane>
      <TabPane tab='多边形裁剪分析' key='6'>
        <Analysis6 />
      </TabPane>
      <TabPane tab='图层裁剪分析' key='7'>
        <Analysis7 />
      </TabPane>
      <TabPane tab='图层叠加分析' key='8'>
        <Analysis8 />
      </TabPane>
      <TabPane tab='多边形叠加分析' key='9'>
        <Analysis9 />
      </TabPane>
    </Tabs>
  );
}
