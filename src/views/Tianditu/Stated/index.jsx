import React, { useEffect } from 'react';
import './Stated.scss';

export default function StatedView() {
  const initMap = () => {
    let T = window.T; //全局引入后T被注册到window里，在从这儿拿到T。T包含了天地图提供的各种方法等。
    let map = new T.Map('map', {
      projection: 'EPSG:4326'
    });
    map.centerAndZoom(new T.LngLat(116.40769, 39.89945), 12); //三个参数分别为经度，纬度，缩放等级。
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
