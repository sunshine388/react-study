import React, { useEffect } from 'react';
import './MapEvent.scss';

export default function MapEventView() {
  const initMap = () => {
    // eslint-disable-next-line
    let map = L.map('map').setView([40.003, 100.32], 5);

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

    //注册基图层改变事件，通过layers控件来触发
    map.on('baselayerchange', function(e) {
      //弹框提示
      alert('基图层改变了！');
    });

    // 地图移动结束事件
    map.on('moveend', function(e) {
      //弹框提示
      alert('地图移动结束！');
    });

    // 地图级数改变事件.该事件触发时也会触发地图移动结束事件
    map.on('zoom', function(e) {
      //弹框提示
      alert('地图级数改变！');
    });

    //添加标注，设置弹框提示
    // eslint-disable-next-line
    L.marker([40.003, 116.32])
      .addTo(map)
      .bindPopup('<b>这里是清华大学</b>');

    // Popup弹出事件
    map.on('popupopen', function(e) {
      //弹框提示
      alert('Popup弹出！');
    });

    // Popup关闭事件
    map.on('popupclose', function(e) {
      //弹框提示
      alert('Popup关闭！');
    });

    //添加标注，设置弹框提示
    // eslint-disable-next-line
    L.marker([40.003, 100.32])
      .addTo(map)
      .bindTooltip('I am a tooltip.')
      .openTooltip();

    // tooltip关闭事件
    map.on('tooltipclose', function(e) {
      //弹框提示
      alert('tooltip关闭！');
    });

    // 地图单击事件
    map.on('click', function(e) {
      //获取点击位置的坐标
      let coordinate = [e.latlng.lat, e.latlng.lng];
      //弹框提示点击位置的坐标
      alert('地图被单击了！点击位置为：' + coordinate);
    });

    // 键盘按下事件
    map.on('keypress', function(e) {
      //弹框提示输入的值
      alert('按下了键盘：' + e.originalEvent.code);
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
