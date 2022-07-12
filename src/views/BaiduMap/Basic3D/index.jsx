import React, { useEffect } from 'react';
import './Basic3D.scss';

export default function Basic3DView() {
  const initMap = () => {
    // eslint-disable-next-line
    const map = new BMapGL.Map('container'); // 创建Map实例
    // eslint-disable-next-line
    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 18); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    map.setHeading(30); // 旋转30度
    map.setTilt(70); // 倾斜45度
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='container'></div>;
}
