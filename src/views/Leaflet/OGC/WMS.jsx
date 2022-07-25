import React, { useEffect } from 'react';

export default function WMSView() {
  const initMap = () => {
    // eslint-disable-next-line
    let map = L.map('map2', {
      //显示中心
      center: [50, -80],
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

    //添加wms服务图层
    // eslint-disable-next-line
    L.tileLayer
      .wms('https://ahocevar.com/geoserver/wms', {
        //加载的图层名称 030100
        layers: 'topp:states',
        //加载的图片带有透明度
        transparent: true,
        //格式
        format: 'image/png',
        //归属介绍
        attribution: 'Weather data © 2012 IEM Nexrad'
      })
      .addTo(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map2' className='map'></div>;
}
