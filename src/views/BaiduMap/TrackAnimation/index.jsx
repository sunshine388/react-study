import React, { useEffect } from 'react';
import './TrackAnimation.scss';

export default function TrackAnimationView() {
  const initMap = () => {
    // eslint-disable-next-line
    const map = new BMapGL.Map('container'); // 创建Map实例
    // eslint-disable-next-line
    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 15); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    map.setHeading(0);

    // 路径
    let points = [
      // eslint-disable-next-line
      new BMapGL.Point(116.418038, 39.91979),
      // eslint-disable-next-line
      new BMapGL.Point(116.418267, 40.0592479),
      // eslint-disable-next-line
      new BMapGL.Point(116.307899, 40.057038)
    ];

    const opts = {
      delay: 1000, // 延迟
      duration: 20000, // 动画时长（默认是10秒）
      titl: 30, // 倾角动画
      overallView: true // 动画播放完会自动调整倾斜角
    };

    // eslint-disable-next-line
    const lines = new BMapGL.Polyline(points);
    // eslint-disable-next-line
    const trackAnimation = new BMapGLLib.TrackAnimation(map, lines, opts);
    trackAnimation.start(); // 开始播放
    // trackAnimation.cancel() // 暂停
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='container'></div>;
}
