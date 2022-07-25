import React, { useEffect } from 'react';

export default function TileMapView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map1', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [30.960151212033073, 103.45117566818879],
      //最小显示等级
      minZoom: 12,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 13,
      //限制显示地理范围
      // eslint-disable-next-line
      maxBounds: L.latLngBounds([30.89, 103.3], [31.05, 103.6])
    });

    //瓦片地图，SAMPLETILE3857为IGServer上发布的瓦片服务名称
    // eslint-disable-next-line
    new Zondy.Map.MapTileLayer('SAMPLETILE3857', {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //设置地图不连续显示
      noWrap: true
    }).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map1' className='map'></div>;
}
