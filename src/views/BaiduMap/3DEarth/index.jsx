import React, { useEffect } from 'react';
import './3DEarth.scss';

export default function Earth3DView() {
  const initMap = () => {
    // eslint-disable-next-line
    const map = new BMapGL.Map('container'); // 创建Map实例
    // eslint-disable-next-line
    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 1); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    // eslint-disable-next-line
    map.setMapType(BMAP_EARTH_MAP); // 设置成3D球体，其他类型：https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_webgl_1_0.html#a5b0
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='container'></div>;
}
