import React, { useEffect } from 'react';
import './DrawIcon.scss';
import logo from '@/assets/images/logo.png';

export default function DrawIconView() {
  const initMap = () => {
    // eslint-disable-next-line
    const map = new BMapGL.Map('container'); // 创建Map实例
    // eslint-disable-next-line
    const point = new BMapGL.Point(113.298378, 23.20661);
    map.centerAndZoom(point, 18); // 设置中心点和基础缩放级别
    map.enableScrollWheelZoom(true); // 允许滚轮缩放

    // Icon 文档：https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_webgl_1_0.html#a3b4
    // eslint-disable-next-line
    const myIcon = new BMapGL.Icon(logo, new BMapGL.Size(60, 60), {
      // anchor: new BMapGL.Size(100, 100), // 设置位移
      // imageOffset: new BMapGL.Size(30, 30) // 位移图片，有点像background-position
    });

    // Marker 文档：https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_webgl_1_0.html#a3b2
    // eslint-disable-next-line
    const marker = new BMapGL.Marker(point, { icon: myIcon });
    map.addOverlay(marker);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='container'></div>;
}
