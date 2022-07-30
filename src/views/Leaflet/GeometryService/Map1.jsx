import React, { useEffect } from 'react';

export default function Map1View() {
  const measureArea = () => {
    //显示进度条
    startPressBar();
    //设置要计算面积的几何对象点集
    let dots = [
      // eslint-disable-next-line
      new Zondy.Object.Point2D(15, 23),
      // eslint-disable-next-line
      new Zondy.Object.Point2D(54, 96),
      // eslint-disable-next-line
      new Zondy.Object.Point2D(65, 42),
      // eslint-disable-next-line
      new Zondy.Object.Point2D(15, 23)
    ];
    //初始化面积测量服务
    // eslint-disable-next-line
    let calArea = new Zondy.Service.CalArea(dots, {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //建议普通用户采用此类直接获取MapGIS GDB 已经提供的空间参考系
    // eslint-disable-next-line
    let gdbInfo = new Zondy.Object.CGDBInfo({
      //数据库名称
      GDBName: 'OpenLayerVecterMap',
      //数据源名称
      ServerName: 'MapGISLocal',
      //除MapGISLocal数据源，其它的都设置
      Password: '',
      //除MapGISLocal数据源，其它的都设置
      User: ''
    });
    //用于进行SRSID投影的参数类
    // eslint-disable-next-line
    let projBySRSID = new Zondy.Service.CProjectBySRSID(601, gdbInfo);
    //执行面积测量服务，measureCallBack为测量回调函数
    calArea.execute(projBySRSID, measureCallBack);
  };
  // 测量回调函数
  const measureCallBack = (data) => {
    //停止进度条
    stopPressBar();
    if (data && data.succeed) {
      //显示结果
      let formatData = JSON.stringify(data.value);
      document.getElementById('resultShow1').innerText =
        '面积为：' + formatData + '平方米';
    }
  };
  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview1').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview1').style.display = '';
  };

  useEffect(() => {
    document.getElementById('preview1').style.display = 'none';
  });

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview1' className='preview'>
          <div className='loading'></div>
          <span>正在测量，请稍候</span>
        </div>
        <div className='ToolLib'>
          <span>说明：该示例是在程序里面给定点坐标进行面积测量</span>
          <input
            type='button'
            id='createThemeBtn'
            value='面积测量'
            onClick={measureArea}
          />
        </div>
        <div id='resultShow1' className='map'></div>
      </div>
    </React.Fragment>
  );
}
