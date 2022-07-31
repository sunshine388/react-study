import React from 'react';

export default function DirectoryService7View() {
  // 获取指定图层图例信息
  const getLegendInfo = () => {
    //地图文档目录服务类
    // eslint-disable-next-line
    let CatalogServer = new Zondy.Catalog.MapDoc({
      //地图文档名称
      docName: 'WorldJW',
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //设置地图的索引号
      mapIndex: 1
    });
    //执行获取指定图层图例信息方法
    CatalogServer.getLegendInfo(1, 'name', getDataSuccess);
  };
  // 获取指定图层图例信息成功回调
  const getDataSuccess = (data) => {
    //判断是否有返回数据，是否成功
    if (data && data.succeed) {
      //将一个JSON转换成一个包含JSON文本的字符串
      let formatData = JSON.stringify(data);
      //显示json字符串导到指定的div中
      // eslint-disable-next-line
      Process(formatData, 1, 'resultShow7');
    } else {
      alert('没有获取到地图文档图例信息！');
      //清空结果显示面板
      document.getElementById('resultShow7').innerHTML = '';
    }
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input
            type='button'
            value='获取指定图层图例信息'
            onClick={getLegendInfo}
          />
        </div>
        <div>
          <font>
            说明：上述为地图文档图例服务接口示例，默认使用china数据库及地图文档【china.mapx】，操作前请确认其数据库已附加且此地图文档已发布
          </font>
        </div>
        <div id='resultShow7'></div>
      </div>
    </React.Fragment>
  );
}
