import React from 'react';

export default function Map4View() {
  const projectRectangle = () => {
    //需要投影转换的矩形
    // eslint-disable-next-line
    let rectangle = new Zondy.Object.Rectangle(
      2119075.5815982167,
      -8944857.387927618,
      -1350086.1660772718,
      3477202.6583427647
    );
    //对矩形范围坐标点进行投影转换
    // eslint-disable-next-line
    let ProjectRang = new Zondy.Service.ProjectRang({
      //数据源名称,默认值为"MapGISLocal"
      gdbsvrName: 'MapGISLocal',
      //数据库名称
      gdbName: 'OpenLayerVecterMap',
      //源投影参考系ID
      srefID: 10,
      //目的投影参考系ID
      desfID: 601,
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //执行矩形投影转换功能服务，并返回结果信息，projSuccess为回调函数
    ProjectRang.execute(rectangle, projSuccess);
  };
  // 投影转换成功回调函数
  const projSuccess = (data) => {
    if (data && data.succeed) {
      //将JSON对象转换成JSON字符串
      let formatData = JSON.stringify(data.DesDots);
      //将结果显示在指定的div上
      // eslint-disable-next-line
      Process(formatData, 1, 'resultShow4');
    }
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <span>
            说明：该矩形投影示例是给定坐标进行投影。投影前矩形的坐标为：（2119075.5815982167,
            -8944857.387927618, -1350086.1660772718,
            3477202.6583427647），投影后的坐标如下
          </span>
          <input
            type='button'
            id='createThemeBtn'
            value='投影矩形'
            onClick={projectRectangle}
          />
        </div>
        <div id='resultShow4' className='map'></div>
      </div>
    </React.Fragment>
  );
}
