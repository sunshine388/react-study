import React from 'react';

export default function Feature8View() {
  // 多几何要素查询
  const query = () => {
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
    let objectIds = '10,104,185,238';
    //实例化查询参数对象
    // eslint-disable-next-line
    let queryParam = new Zondy.Service.QueryParameter({
      objectIds: objectIds,
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
    Process(formatData, 1, 'resultShow8');
  };

  // 查询失败回调函数
  const queryError = (data) => {
    //停止进度条
    stopPressBar();
    alert('查询失败！');
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview8').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview8').style.display = '';
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview8' className='preview' style={{ display: 'none' }}>
          <div className='loading'></div>
          <span>正在查询，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input type='button' value='FID查询' onClick={query} />
        </div>
        <div>
          该示例为矢量地图文档属性查询(返回查询结果JSON)接口示例，请注意：
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;1、默认查询示例数据库（OpenLayerVecterMap.hdf）下“世界地图经纬度”中的简单要素类“主要城市”，操作前请先确认此数据库已经附加，地图文档（WorldJWVector）已经发布；
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;2、默认查询使用FID查询为"10,104,185,238"，点击【FID查询】按钮执行查询。
          <br />
        </div>
        <div id='resultShow8'></div>
      </div>
    </React.Fragment>
  );
}
