import React, { useEffect } from 'react';

export default function KMLView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map6', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [30, 0],
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

    //显示天地图（矢量图层+注记）
    // eslint-disable-next-line
    L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    ).addTo(mymap);
    // eslint-disable-next-line
    L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    ).addTo(mymap);
    //加载KML，需指定KML数据的路径
    // eslint-disable-next-line
    new L.KML('/leaflet/KML/KML_Samples.kml', { async: true }).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map6' className='map'></div>;
}
