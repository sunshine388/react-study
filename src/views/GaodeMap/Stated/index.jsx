import React, { useEffect } from 'react';
import './Stated.scss';

export default function StatedView() {
  const initMap = () => {
    // eslint-disable-next-line
    const map = new AMap.Map('container', {
      viewMode: '2D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D',
      zoom: 11, //初始化地图层级
      center: [116.397428, 39.90923] //初始化地图中心点
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='container'></div>;
}
