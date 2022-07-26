import { Tabs } from 'antd';
import './NetworkAnalysis.scss';
import New from './New.jsx';
import Old from './Old.jsx';

const { TabPane } = Tabs;

export default function NetworkAnalysisView() {
  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='网络分析(新)' key='1'>
        <New />
      </TabPane>
      <TabPane tab='网络分析(旧)' key='2'>
        <Old />
      </TabPane>
    </Tabs>
  );
}
