import React from 'react';

export default function Map6View() {
  const GetTileImage = () => {
    //瓦片地图图片服务
    // eslint-disable-next-line
    let TileImageService = new Zondy.Service.GetTileImageService({
      //发布的瓦片名
      hdfName: 'WORLDTILE',
      //设置级数
      level: 1,
      //行号
      row: 1,
      //列号
      col: 1,
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //获取瓦片图片url路径
    let tileImageUrl = TileImageService.GetTileImage();
    //将JSON对象转换成JSON字符串
    // let formatData = JSON.stringify(tileImageUrl);
    //显示url结果，并设置链接供用户查看
    document.getElementById('show6').innerHTML = tileImageUrl;
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input
            type='button'
            value='获取瓦片地图图片URL'
            onClick={GetTileImage}
          />
        </div>
        <div id='resultShow6' className='map'>
          <font>瓦片图片的URL为：</font>
          <div id='show6' target='blank'></div>
        </div>
      </div>
    </React.Fragment>
  );
}
