import React, { useEffect } from 'react';

export default function VectorLayerView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map3', {
      //显示中心
      center: [30.960151212033073, 103.45117566818879],
      //最小显示等级
      minZoom: 12,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 13,
      // 设置地图最大显示范围
      maxBounds: [
        [30.89, 103.3],
        [31.05, 103.6]
      ]
    });

    // 要显示的图层的gdbps地址
    let gdbps =
      'gdbp://MapGisLocal/sample/ds/地图综合/sfcls/等高线_1_3857,gdbp://MapGisLocal/sample/ds/地图综合/sfcls/公路_1_3857,gdbp://MapGisLocal/sample/ds/地图综合/sfcls/居民地_1_3857,gdbp://MapGisLocal/sample/ds/地图综合/sfcls/水系_1_3857';
    //矢量图层
    // eslint-disable-next-line
    let layer = new Zondy.Map.MapVectorLayer(gdbps, {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //设置地图不连续显示
      noWrap: true,
      //缓存名称
      guid: new Date().getTime().toString()
    }).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map3' className='map'></div>;
}
