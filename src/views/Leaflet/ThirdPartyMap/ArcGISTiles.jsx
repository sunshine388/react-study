import React, { useEffect } from 'react';

export default function ArcGISTilesView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map10', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [40, 116.3],
      //最小显示等级
      minZoom: 0,
      //最大显示等级
      maxZoom: 16,
      //当前显示等级
      zoom: 11,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });
    //加载ArcGIS瓦片
    // eslint-disable-next-line
    let tiles = L.tileLayer(
      'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png'
    ).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map10' className='map'></div>;
}
