import React, { useEffect } from 'react';
import './Stated.scss';

export default function StatedView() {
  const initMap = () => {
    // eslint-disable-next-line
    const map = new BMapGL.Map('container'); // 创建Map实例
    // eslint-disable-next-line
    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 12); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='container'></div>;
}
