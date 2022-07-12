import React, { useEffect } from 'react';
import './DrawPolygon.scss';

export default function DrawPolygonView() {
  const initMap = () => {
    // eslint-disable-next-line
    const map = new BMapGL.Map('container'); // 创建Map实例
    // eslint-disable-next-line
    map.centerAndZoom(new BMapGL.Point(113.942651, 22.53945), 12); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    // eslint-disable-next-line
    const polygon = new BMapGL.Polygon(
      [
        // eslint-disable-next-line
        new BMapGL.Point(113.942651, 22.53945),
        // eslint-disable-next-line
        new BMapGL.Point(113.862651, 22.42945),
        // eslint-disable-next-line
        new BMapGL.Point(113.82651, 22.43945),
        // eslint-disable-next-line
        new BMapGL.Point(113.80651, 22.53945)
      ],
      {
        strokeColor: '#e84a5f', // 边框颜色
        strokeWeight: 10, // 边框重量（粗细的值）
        strokeOpacity: 0.5, // 边框透明度
        fillColor: '#10ddc2' // 填充色
      }
    );

    map.addOverlay(polygon);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='container'></div>;
}
