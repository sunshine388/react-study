import React, { useEffect } from 'react';

export default function ArcgisMapView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map6', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [45, -90],
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

    //瓦片地图，SAMPLETILE3857为IGServer上发布的瓦片服务名称
    // eslint-disable-next-line
    let Layer = L.tileLayer
      .wms(
        'http://sampleserver1.arcgisonline.com/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer?',
        {
          //图层序列号
          layers: '0,1,2',
          //wms版本号
          version: '1.3.0',
          //设置地图不连续显示
          noWrap: true
        }
      )
      .addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map6' className='map'></div>;
}
