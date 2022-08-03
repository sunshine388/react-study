import React from 'react';

export default function Feature15View() {
  // 对象类要素查询
  const objFeatureQuery = () => {
    //初始化查询结构对象，设置查询结构包含几何信息
    // eslint-disable-next-line
    let queryStruct = new Zondy.Service.QueryFeatureStruct();
    //是否包含几何信息
    queryStruct.IncludeGeometry = true;
    //实例化查询参数对象
    // eslint-disable-next-line
    let queryParam = new Zondy.Service.ObjClsQueryParameter({
      //设置查询条件
      objectIds: 3,
      where: "username = 'liu'",
      //设置结果返回类型
      resultFormat: 'json',
      //设置查询结构
      struct: queryStruct
    });
    //实例化地图文档查询服务对象
    // eslint-disable-next-line
    let queryService = new Zondy.Service.ObjClsQuery(
      queryParam,
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/ocls/user,gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/ocls/user2',
      {
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163'
      }
    );
    //执行查询操作，querySuccess为查询回调函数
    queryService.query(querySuccess);
  };

  // 查询成功回调函数
  const querySuccess = (result) => {
    //将JSON对象转换成JSON字符串
    let formatData = JSON.stringify(result.ObjClsArray);
    //将结果显示在指定的div上
    // eslint-disable-next-line
    Process(formatData, 1, 'resultShow15');
  };
  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview15' className='preview' style={{ display: 'none' }}>
          <div className='loading'></div>
          <span>正在查询，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input type='button' value='对象类查询' onClick={objFeatureQuery} />
        </div>
        <div id='resultShow15'></div>
      </div>
    </React.Fragment>
  );
}
