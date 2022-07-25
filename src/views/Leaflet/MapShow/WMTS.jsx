import React, { useEffect } from 'react';

export default function WMTSView() {
  const initMap = () => {
    // eslint-disable-next-line
    let map = L.map('map9', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [50, -120],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 3
    });

    //wmts服务
    // eslint-disable-next-line
    let layer3 = new Zondy.Map.MapWMTSLayer({
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      tilematrixSet: 'EPSG:4326_WhMapTileOld_dpi96_GB',
      //wmts服务名称
      layer: 'WhMapTileWMTS'
    }).addTo(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map9' className='map'></div>;
}
