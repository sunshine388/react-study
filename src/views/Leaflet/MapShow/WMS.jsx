import React, { useEffect } from 'react';

export default function WMSView() {
  const initMap = () => {
    // eslint-disable-next-line
    let map = L.map('map10', {
      //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [0, 0],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 15,
      //当前显示等级
      zoom: 2,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    //wms服务
    // eslint-disable-next-line
    let Layer = L.tileLayer
      .wms(
        'http://develop.smaryun.com:6163/igs/rest/ogc/layer/WorldJWLayer/WMSServer',
        {
          //图层名称
          layers: '世界政区',
          //wms版本号
          version: '1.3.0'
        }
      )
      .addTo(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map10' className='map'></div>;
}
