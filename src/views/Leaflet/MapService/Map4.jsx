import React from 'react';

export default function Map4View() {
  const GetMapInfo = () => {
    //创建获取文档信息服务
    // eslint-disable-next-line
    let mapInfo = new Zondy.Service.GetMapInfoService({
      //发布的地图文档名称
      mapName: 'WorldJWEdit',
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //获取文档图片信息，getDataSuccess为回调函数
    mapInfo.GetMapInfo(getDataSuccess);
  };
  // 文档信息回调函数
  const getDataSuccess = (data) => {
    if (data) {
      //将JSON对象转换成JSON字符串
      let formatData = JSON.stringify(data);
      //将结果显示在指定的div上
      // eslint-disable-next-line
      Process(formatData, 1, 'resultShow4');
    }
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input type='button' value='获取文档图片信息' onClick={GetMapInfo} />
        </div>
        <div id='resultShow4' className='map'></div>
      </div>
    </React.Fragment>
  );
}
