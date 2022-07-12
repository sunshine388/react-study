import React, { useEffect } from 'react';
import './InfoWindow.scss';
import logo from '@/assets/images/logo.png';

let map = null;
let point = null;
let marker = null;

export default function InfoWindowView() {
  // marker 点击事件
  const markerHandleClick = () => {
    // eslint-disable-next-line
    const infoWindow = new BMapGL.InfoWindow(
      '内容：数据可视化', // 可以传入纯文本，也可以传入富文本（字符串型）
      {
        width: 250,
        height: 100,
        title: '标题标题',
        // eslint-disable-next-line
        offset: new BMapGL.Size(0, -20)
      }
    );
    map.openInfoWindow(infoWindow, point);
  };

  useEffect(() => {
    // eslint-disable-next-line
    map = new BMapGL.Map('container'); // 这里填入的是容器的 ID
    // eslint-disable-next-line
    point = new BMapGL.Point(113.298378, 23.20661);
    map.centerAndZoom(point, 18); // 设置中心点和基础缩放级别
    map.enableScrollWheelZoom(true); // 允许滚轮缩放

    // Icon 文档：https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_webgl_1_0.html#a3b4
    // eslint-disable-next-line
    const myIcon = new BMapGL.Icon(logo, new BMapGL.Size(60, 60));

    // Marker 文档：https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_webgl_1_0.html#a3b2
    // eslint-disable-next-line
    marker = new BMapGL.Marker(point, { icon: myIcon });
    marker.addEventListener('click', markerHandleClick); // 绑定点击事件
    map.addOverlay(marker);

    return () => {
      marker.removeEventListener('click', markerHandleClick);
    };
  }, []);

  return <div id='container'></div>;
}
