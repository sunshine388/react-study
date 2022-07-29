import React from 'react';

export default function Map2View() {
  // 获取专题图信息
  const GetLayerImage = () => {
    //创建获取图层图片信息服务
    // eslint-disable-next-line
    let LayerImageService = new Zondy.Service.GetLayerImageService({
      //图层在数据库中的url
      gdbps:
        'gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mypntlayer',
      //图片类型
      picType: 'png',
      //图片宽
      picWidth: 500,
      //图片高
      picHeight: 600,
      //取图范围，依次是xmin、ymin、xmax、ymax
      bbox: '50,0,140,90',
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //获取图层图片url路径
    let layerUrl = LayerImageService.GetLayerImage();
    //将JSON对象转换成JSON字符串
    // let formatData = JSON.stringify(layerUrl);
    //显示url结果，并设置链接供用户查看
    document.getElementById('show2').innerHTML = layerUrl;
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input
            type='button'
            value='获取图层图片URL'
            onClick={GetLayerImage}
          />
        </div>
        <div id='resultShow2' className='map'>
          <font>图层图片的URL为：</font>
          <div id='show2' target='blank'></div>
        </div>
      </div>
    </React.Fragment>
  );
}
