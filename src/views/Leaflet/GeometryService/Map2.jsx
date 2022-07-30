import React from 'react';

export default function Map2View() {
  const CalPolyLineLength = () => {
    //设置要计算长度的几何对象点集
    let dots = [
      // eslint-disable-next-line
      new Zondy.Object.Point2D(15, 23),
      // eslint-disable-next-line
      new Zondy.Object.Point2D(54, 96),
      // eslint-disable-next-line
      new Zondy.Object.Point2D(65, 42)
    ];
    //初始化长度测量服务
    // eslint-disable-next-line
    let calLength = new Zondy.Service.CalPolyLineLength(dots, {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //建议普通用户采用此类直接获取MapGIS GDB已经提供的空间参考系
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
    //执行长度测量服务，measureCallBack为测量回调函数
    calLength.execute(projBySRSID, measureCallBack);
  };
  // 测量回调函数
  const measureCallBack = (data) => {
    if (data && data.succeed) {
      //显示结果
      let formatData = JSON.stringify(data.value);
      document.getElementById('resultShow2').innerText =
        '长度为：' + formatData + '米';
    }
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <span>说明：该示例是在程序里面给定点坐标进行长度测量</span>
          <input
            type='button'
            id='createThemeBtn'
            value='长度测量'
            onClick={CalPolyLineLength}
          />
        </div>
        <div id='resultShow2' className='map'></div>
      </div>
    </React.Fragment>
  );
}
