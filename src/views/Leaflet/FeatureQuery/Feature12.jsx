import React from 'react';

export default function Feature12View() {
  // 矢量图层要素查询（属性查询）
  const queryByAttribute = () => {
    //显示进度条
    startPressBar();
    //初始化查询结构对象，设置查询结构包含几何信息
    // eslint-disable-next-line
    let queryStruct = new Zondy.Service.QueryFeatureStruct();
    queryStruct.IncludeGeometry = true;
    //实例化查询参数对象
    // eslint-disable-next-line
    let queryParam = new Zondy.Service.QueryByLayerParameter(
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区',
      {
        resultFormat: 'json',
        struct: queryStruct
      }
    );
    //设置查询分页号
    queryParam.pageIndex = 0;
    //设置查询要素数目
    queryParam.recordNumber = 20;
    //设置属性条件
    // eslint-disable-next-line
    let name = $('#Conditions12').val();
    queryParam.where = name;
    //queryParam.where = "name='中国'";
    //实例化地图文档查询服务对象
    // eslint-disable-next-line
    let queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
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
    Process(formatData, 1, 'resultShow12');
  };

  // 查询失败回调函数
  const queryError = (data) => {
    //停止进度条
    stopPressBar();
    alert('查询失败！');
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview12').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview12').style.display = '';
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview12' className='preview' style={{ display: 'none' }}>
          <div className='loading'></div>
          <span>正在查询，请稍候</span>
        </div>
        <div className='ToolLib'>
          <strong>查询条件:</strong>
          <input
            type='text'
            id='Conditions12'
            name='type'
            value="name='中国'"
            readOnly={true}
          />
          <input type='button' value='属性查询' onClick={queryByAttribute} />
        </div>
        <div>
          <font>该示例为矢量图层属性查询（返回Json）接口示例，请注意：</font>
          <br />
          <font>
            1.默认查询示例数据库（OpenLayerVecterMap.hdf）下“世界地图经纬度”中的简单要素类“世界政区”，操作前请先确认此数据库已经附加；
          </font>
          <br />
          <font color='red'>
            2.默认查询条件为where=
            "name='中国'"，点击【属性查询】按钮执行查询，查询结果显示在下列选项卡中。
          </font>
        </div>
        <div id='resultShow12'></div>
      </div>
    </React.Fragment>
  );
}
