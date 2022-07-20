import React, { useEffect } from 'react';
import './Control.scss';

export default function ControlView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map', {
      attributionControl: false,
      zoomControl: false, //全屏显示控件
      fullscreenControl: {
        //是否伪全屏显示，只铺满浏览器显示区
        pseudoFullscreen: false
      }
    }).setView([51.505, -0.09], 13);

    // eslint-disable-next-line
    // L.tileLayer(
    //   'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3Vuc2hpbmUzODgiLCJhIjoiY2w1bTkwYzl2MHJ0cjNncWlvMzA5aGYzeSJ9.uaM3WZCNU2_Cg2yXBi-ilA',
    //   {
    //     attribution:
    //       'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox/streets-v11',
    //     tileSize: 512,
    //     zoomOffset: -1,
    //     accessToken:
    //       'pk.eyJ1Ijoic3Vuc2hpbmUzODgiLCJhIjoiY2w1bTkwYzl2MHJ0cjNncWlvMzA5aGYzeSJ9.uaM3WZCNU2_Cg2yXBi-ilA'
    //   }
    // ).addTo(mymap);

    //矢量+注记
    // eslint-disable-next-line
    let layer = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
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
      'http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
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
      'http://t0.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
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
      'http://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
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
      'http://t0.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
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
    let vec = {
      '矢量+注记': LayerG
    };
    let img = {
      矢量图层: layer,
      影像图层: layer3,
      影像注记: layer4
    };
    //图层控制显示控件
    // eslint-disable-next-line
    L.control.layers(vec, img).addTo(mymap);

    // 导航控件添加到地图中
    // eslint-disable-next-line
    L.control.navbar().addTo(mymap);

    // Zoomslider
    // eslint-disable-next-line
    mymap.addControl(new L.Control.Zoomslider());

    // 添加鼠标位置控件
    // eslint-disable-next-line
    L.control.mousePosition().addTo(mymap);

    // 鹰眼
    // OSM地图
    // eslint-disable-next-line
    let TianDiTu2 = new L.TileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        //最小显示等级
        minZoom: 1,
        //最大显示等级
        maxZoom: 15,
        //设置地图不连续显示
        noWrap: true
      }
    );
    // 添加鹰眼地图
    // eslint-disable-next-line
    new L.Control.MiniMap(TianDiTu2, {
      //鹰眼按钮是否显示
      toggleDisplay: true
    }).addTo(mymap);

    // 缩放
    // eslint-disable-next-line
    L.control
      .zoom({
        zoomInText: '+', //设置在 'zoom in' 按钮上的文字。
        zoomInTitle: 'Zoom in', //	设置在 'zoom in' 按钮上的标题。
        zoomOutText: '-', //设置在 'zoom out' 按钮上的文字。
        zoomOutTitle: 'Zoom out'
      })
      .addTo(mymap);

    //版权
    // eslint-disable-next-line
    L.control
      .attribution({
        prefix: 'yxx-2022' // 显示在属性前的HTML文本。传递 false 表示禁用。
      })
      .addTo(mymap);

    // 比例尺控件
    // eslint-disable-next-line
    L.control
      .scale({
        maxWidth: 100, //	控件的最大宽度，单位是像素。宽度是动态设置的，以显示圆形值（如100、200、500）。
        metric: true, //是否显示公制比例线（米/公里）。
        imperial: true, //是否显示英制比例线（英里/英尺）。
        updateWhenIdle: false //如果为 true, 控件在 移动结束时被更新，否则它总是最新的( move 时更新)。
      })
      .addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
