import React from 'react';

export default function Feature13View() {
  // 矢量图层要素查询（几何查询）
  const queryByPolygon = () => {
    //显示进度条
    startPressBar();
    //初始化查询结构对象，设置查询结构包含几何信息
    // eslint-disable-next-line
    let queryStruct = new Zondy.Service.QueryFeatureStruct();
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true;
    //是否包含属性信息
    queryStruct.IncludeAttribute = true;
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false;
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
    let Polygon = new Zondy.Object.Polygon(pointObj);
    // eslint-disable-next-line
    //实例化查询参数对象
    // eslint-disable-next-line
    let queryParam = new Zondy.Service.QueryByLayerParameter(
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区',
      {
        geometry: Polygon,
        resultFormat: 'json',
        struct: queryStruct
      }
    );
    //设置查询分页号
    queryParam.pageIndex = 0;
    //设置查询要素数目
    queryParam.recordNumber = 20;
    //设置属性条件
    queryParam.where = "name='中国'";
    //实例化地图文档查询服务对象
    // eslint-disable-next-line
    let queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //执行查询操作，querySuccess为成功回调，queryError为失败回调
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
    Process(formatData, 1, 'resultShow13');
  };

  // 查询失败回调函数
  const queryError = (data) => {
    //停止进度条
    stopPressBar();
    alert('查询失败！');
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview13').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview13').style.display = '';
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview13' className='preview' style={{ display: 'none' }}>
          <div className='loading'></div>
          <span>正在查询，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input
            type='button'
            value='多边形加属性查询'
            onClick={queryByPolygon}
          />
        </div>
        <div>
          <font>该示例为矢量图层固定多边形查询（返回Json）接口示例；</font>
          <br />
          <font>
            用于查询的固定多边形由(114.6875,39.08125)、(116.4375,
            40.53125)、(118.4375, 41.53125)、(117.1875,
            41.34375)四个点构成，属性查询条件为where=
            "name='中国'"，点击【多边形+属性查询】按钮执行查询，查询结果显示在下列选项卡中；
          </font>
          <br />
          <font color='red'>
            注意：默认查询示例数据库（OpenLayerVecterMap.hdf）下“世界地图经纬度”中的简单要素类“世界政区”，操作前请先确认此数据库已经附加，地图文档（WorldJW）已经发布
          </font>
        </div>
        <div id='resultShow13'></div>
      </div>
    </React.Fragment>
  );
}
