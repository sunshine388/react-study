import React from 'react';

export default function Feature7View() {
  // 多几何要素查询
  const query = () => {
    //显示进度条
    startPressBar();
    //初始化查询结构对象，设置查询结构包含几何信息
    // eslint-disable-next-line
    let queryStruct = new Zondy.Service.QueryFeatureStruct();
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true;
    //创建一个用于查询的多边形
    let pointObj = [];
    // eslint-disable-next-line
    pointObj[0] = new Zondy.Object.Point2D(114.6875, 39.08125);
    // eslint-disable-next-line
    pointObj[1] = new Zondy.Object.Point2D(116.4375, 40.53125);
    // eslint-disable-next-line
    pointObj[2] = new Zondy.Object.Point2D(118.4375, 41.53125);
    // eslint-disable-next-line
    pointObj[3] = new Zondy.Object.Point2D(117.1875, 41.34375);
    // eslint-disable-next-line
    pointObj[4] = new Zondy.Object.Point2D(114.6875, 39.08125);
    // eslint-disable-next-line
    let geomObj = new Zondy.Object.Polygon(pointObj);
    //实例化查询参数对象
    // eslint-disable-next-line
    let queryParam = new Zondy.Service.QueryParameter({
      where: "name='中国'",
      geometry: geomObj,
      geometryType: 'line',
      resultFormat: 'json',
      struct: queryStruct
    });
    //设置查询分页号
    queryParam.pageIndex = 0;
    //设置查询要素数目
    queryParam.recordNumber = 20;
    //实例化地图文档查询服务对象
    // eslint-disable-next-line
    let queryService = new Zondy.Service.QueryDocFeature(
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
    //执行查询操作，querySuccess为查询回调函数
    queryService.query(querySuccess, queryError);
  };

  // 查询成功回调函数
  const querySuccess = (result) => {
    //停止进度条
    stopPressBar();
    //将JSON对象转换成JSON字符串
    let formatData = JSON.stringify(result);
    //将结果显示在指定的div上
    // eslint-disable-next-line
    Process(formatData, 1, 'resultShow7');
  };

  // 查询失败回调函数
  const queryError = (data) => {
    //停止进度条
    stopPressBar();
    alert('查询失败！');
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview7').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview7').style.display = '';
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview7' className='preview' style={{ display: 'none' }}>
          <div className='loading'></div>
          <span>正在查询，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input type='button' value='多边形加属性查询' onClick={query} />
        </div>
        <div>
          该示例为矢量地图文档固定多边形查询(返回查询结果JSON)接口示例，请注意：
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;1、默认查询示例数据库（OpenLayerVecterMap.hdf）下“世界地图经纬度”中的简单要素类“世界政区”，操作前请先确认此数据库已经附加；
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;2、用于查询的固定多边形由(114.6875,39.08125)、(116.4375,
          40.53125)、(118.4375, 41.53125)、(117.1875,
          41.34375)四个点构成，属性查询条件为where=
          "name='中国'"，点击【多边形加属性查询】按钮执行查询。
          <br />
        </div>
        <div id='resultShow7'></div>
      </div>
    </React.Fragment>
  );
}
