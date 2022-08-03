import React from 'react';

export default function Feature16View() {
  // 多几何要素查询
  const mulGeoFeatureQuery = () => {
    //显示进度条
    startPressBar();
    //初始化查询结构对象，设置查询结构包含几何信息
    // eslint-disable-next-line
    let queryStruct = new Zondy.Service.QueryFeatureStruct();
    //是否包含几何信息
    queryStruct.IncludeGeometry = true;
    //创建两个用于查询的矩形数组
    let pointObj = [];
    // eslint-disable-next-line
    pointObj[0] = new Zondy.Object.Point2D(116.4375, 41.53125);
    // eslint-disable-next-line
    pointObj[1] = new Zondy.Object.Point2D(114.6875, 39.08125);
    // eslint-disable-next-line
    pointObj[2] = new Zondy.Object.Point2D(118.1875, 39.34375);
    // eslint-disable-next-line
    pointObj[3] = new Zondy.Object.Point2D(116.4375, 41.53125);
    // eslint-disable-next-line
    let geomObj1 = new Zondy.Object.Polygon(pointObj);
    let pointObj2 = [];
    // eslint-disable-next-line
    pointObj2[0] = new Zondy.Object.Point2D(105.5875, 48.70625);
    // eslint-disable-next-line
    pointObj2[1] = new Zondy.Object.Point2D(106.1125, 46.86875);
    // eslint-disable-next-line
    pointObj2[2] = new Zondy.Object.Point2D(108.3875, 48.44375);
    // eslint-disable-next-line
    pointObj2[3] = new Zondy.Object.Point2D(105.5875, 48.70625);
    // eslint-disable-next-line
    let geomObj2 = new Zondy.Object.Polygon(pointObj2);
    //实例化查询参数对象
    // eslint-disable-next-line
    let queryParam = new Zondy.Service.MultiGeoQueryParameter({
      //设置查询几何对象
      geometry: [geomObj1, geomObj2],
      //设置查询几何类型
      geometryType: 'polygon',
      //设置结果返回类型
      resultFormat: 'json',
      //设置查询结构对象
      struct: queryStruct
    });
    //实例化地图文档查询服务对象
    // eslint-disable-next-line
    let queryService = new Zondy.Service.MultiGeoQuery(
      queryParam,
      'WorldJWVector',
      1,
      {
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163'
      }
    );
    //执行查询操作，querySuccess为成功回调，queryError为失败回调
    queryService.query(querySuccess, queryError);
  };

  // 查询成功回调函数
  const querySuccess = (result) => {
    //停止进度条
    stopPressBar();
    //将JSON对象转换成JSON字符串
    let formatData = JSON.stringify(result.ItemArray);
    //将结果显示在指定的div上
    // eslint-disable-next-line
    Process(formatData, 1, 'resultShow16');
  };

  // 查询失败回调函数
  const queryError = (data) => {
    //停止进度条
    stopPressBar();
    alert('查询失败！');
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview16').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview16').style.display = '';
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview16' className='preview' style={{ display: 'none' }}>
          <div className='loading'></div>
          <span>正在查询，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input
            type='button'
            value='多几何要素查询'
            onClick={mulGeoFeatureQuery}
          />
        </div>
        <div id='resultShow16'></div>
      </div>
    </React.Fragment>
  );
}
