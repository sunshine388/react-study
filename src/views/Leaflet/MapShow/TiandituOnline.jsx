import React, { useEffect } from 'react';

export default function TiandituOnlineView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map4', {
      //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [0, 0],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 2,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    //矢量+注记
    // eslint-disable-next-line
    let layer = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=ter_c&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        zoomOffset: 1,
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    );
    //矢量图层
    // eslint-disable-next-line
    let layer1 = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        zoomOffset: 1,
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    );
    //矢量注记图层
    // eslint-disable-next-line
    let layer2 = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        zoomOffset: 1,
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    );
    //影像图层
    // eslint-disable-next-line
    let layer3 = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        zoomOffset: 1,
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    );
    //影像注记
    // eslint-disable-next-line
    let layer4 = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cia_c&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        zoomOffset: 1,
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    );
    //图层组
    // eslint-disable-next-line
    let LayerG = L.layerGroup([layer1, layer2]);
    //添加图层组
    LayerG.addTo(mymap);
    //L.control.scale().addTo(map);
    let vec = {
      矢量图层: layer
    };
    let img = {
      影像图层: layer3,
      影像注记: layer4
    };
    //图层控制显示控件
    // eslint-disable-next-line
    L.control.layers(vec, img).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map4' className='map'></div>;
}
