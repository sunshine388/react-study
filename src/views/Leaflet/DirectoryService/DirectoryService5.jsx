import React from 'react';

//以本地GIS服务器发布的瓦片为例，用户可设置其目标对象
//访问IGServer的IP
let ip = 'develop.smaryun.com';
//访问IGServer的端口号，.net版为6163，Java版为8089
let port = '6163';
//实例化瓦片目录服务对象
// eslint-disable-next-line
let TileCat = new Zondy.Catalog.TileLayer({
  //设置服务器IP
  ip: ip,
  //设置端口号
  port: port,
  //瓦片服务名称
  tileName: 'WorldJWTile'
});

export default function DirectoryService5View() {
  //瓦片目录服务（获取瓦片服务列表）
  const getTileList = () => {
    //调用getMapDocList方法，获取服务器已发布瓦片的瓦片服务列表，回调函数处理结果
    TileCat.getTileList(successCallback);
  };

  //瓦片目录服务（获取瓦片详细信息）
  const getTileInfo = () => {
    //调用getTileInfo方法，获取服务器已发布瓦片中某一个瓦片服务的详细信息，回调函数处理结果
    TileCat.getTileInfo(successCallback);
  };

  //成功回调函数
  const successCallback = (data) => {
    if (data && data.succeed) {
      //将一个JSON转换成一个包含JSON文本的字符串
      let formatData = JSON.stringify(data);
      //显示json字符串导到指定的div中
      // eslint-disable-next-line
      Process(formatData, 1, 'resultShow5');
    } else {
      alert('没有获取到瓦片详细信息！');
      //清空结果显示面板
      document.getElementById('resultShow5').innerHTML = '';
      return;
    }
  };
  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input type='button' value='获取瓦片列表' onClick={getTileList} />
          <input type='button' value='获取瓦片详细信息' onClick={getTileInfo} />
        </div>
        <div>
          <font>
            注意：上述瓦片目录服务接口示例，默认使用示例瓦片数据（WORLDMKT.TDF），操作前请先确认此瓦片已经在IGS上发布为瓦片服务（WorldMKTTile）。
          </font>
        </div>
        <div id='resultShow5'></div>
      </div>
    </React.Fragment>
  );
}
