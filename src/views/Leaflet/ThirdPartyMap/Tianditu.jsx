import React, { useEffect } from 'react';

export default function TiandituView() {
  const initMap = () => {
    // eslint-disable-next-line
    let map = L.map('map3', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [40, 116.3],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 12,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    //添加天地图矢量图层
    // eslint-disable-next-line
    let vectorMap = L.tileLayer(
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
    let vectorAnnotion = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    );
    //添加天地图影像图层
    // eslint-disable-next-line
    let imageMap = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    );
    //添加天地图影像注记
    // eslint-disable-next-line
    let imageAnnotion = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    );

    //设置图层组
    // eslint-disable-next-line
    let vector = L.layerGroup([vectorMap, vectorAnnotion]);
    // eslint-disable-next-line
    let image = L.layerGroup([imageMap, imageAnnotion]);
    let baseLayers = {
      地图: vector,
      影像: image
    };
    //初始时加载矢量图层组
    map.addLayer(vector);
    //添加图层组控件
    // eslint-disable-next-line
    L.control.layers(baseLayers).addTo(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map3' className='map'></div>;
}
