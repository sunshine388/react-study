import React from 'react';

export default function Map3View() {
  const GetImage = () => {
    //创建获取瓦片图片信息服务
    // eslint-disable-next-line
    let MapImageService = new Zondy.Service.GetMapImageService({
      //指定类型为瓦片
      // eslint-disable-next-line
      mapType: Zondy.Enum.Map.MapType.Tile,
      //发布的瓦片名称
      mapName: 'WorldJWTile',
      //设置级数
      level: 0,
      //行号
      row: 0,
      //列号
      col: 0,
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //获取瓦片图片url路径
    let tileUrl = MapImageService.GetImage();
    //将JSON对象转换成JSON字符串
    // let formatData = JSON.stringify(tileUrl);
    //显示url结果，并设置链接供用户查看
    document.getElementById('show3').innerHTML = tileUrl;
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input type='button' value='获取瓦片图片URL' onClick={GetImage} />
        </div>
        <div id='resultShow3' className='map'>
          <font>瓦片图片的URL为：</font>
          <div id='show3' target='blank'></div>
        </div>
      </div>
    </React.Fragment>
  );
}
