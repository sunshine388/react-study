import React, { useEffect } from 'react';

export default function WMTSView() {
  const initMap = () => {
    // eslint-disable-next-line
    let map = L.map('map1', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //显示中心
      center: [50, -120],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 3,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    //添加天地图矢量图层
    // eslint-disable-next-line
    L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    ).addTo(map);
    //添加天地图矢量注记
    // eslint-disable-next-line
    L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    ).addTo(map);

    //WMTS服务地址
    let wmtsUrl =
      'http://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS?service=wmts&request=GetTile&version=1.0.0&LAYER=Demographics_USA_Population_Density&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles';
    //加载WMTS服务图层
    // eslint-disable-next-line
    L.tileLayer(wmtsUrl, { noWrap: true }).addTo(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map1' className='map'></div>;
}
