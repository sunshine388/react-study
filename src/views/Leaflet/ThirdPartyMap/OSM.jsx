import React, { useEffect } from 'react';

export default function BingMapView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map2', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //显示中心
      center: [40, 116.3],
      //最小显示等级
      minZoom: 0,
      //最大显示等级
      maxZoom: 16,
      //当前显示等级
      zoom: 12,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    //加载OSM地图
    // eslint-disable-next-line
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      //只显示一个图层,不平铺显示
      noWrap: true,
      //图层数据介绍
      attribution:
        'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map2' className='map'></div>;
}
