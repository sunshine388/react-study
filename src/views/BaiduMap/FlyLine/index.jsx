import React, { useEffect } from 'react';
import './FlyLine.scss';

export default function FlyLineView() {
  // 初始化百度地图
  const initBMap = () => {
    // eslint-disable-next-line
    const cityCenter = mapv.utilCityCenter.getCenterByCityName('上海');
    // eslint-disable-next-line
    const map = initMap({
      tilt: 60, // 倾斜角，默认是60
      center: [cityCenter.lng, cityCenter.lat],
      zoom: 6,
      // eslint-disable-next-line
      style: purpleStyle // 底图皮肤。purpleStyle 是common.js提供的
    });
    return map;
  };

  const initData = () => {
    // 数据源需要提供起点坐标和终点坐标
    let data = [];

    // 生成贝塞尔曲线坐标集
    // 1. 实例化贝塞尔曲线对象
    // eslint-disable-next-line
    const curve = new mapvgl.BezierCurve();

    // 2. 设置起点和终点的坐标
    // eslint-disable-next-line
    let start = mapv.utilCityCenter.getCenterByCityName('上海');
    // eslint-disable-next-line
    let end = mapv.utilCityCenter.getCenterByCityName('北京');
    curve.setOptions({
      start: [start.lng, start.lat],
      end: [end.lng, end.lat]
    });

    // 3. 生成贝塞尔曲线坐标集
    let curveData = curve.getPoints();
    data.push({
      geometry: {
        type: 'LineString', // 飞线
        coordinates: curveData // 坐标系
      }
    });

    return data;
  };

  const setData = (map, data) => {
    // 1. 初始化图层
    // eslint-disable-next-line
    const view = new mapvgl.View({ map });

    // 2. 初始化飞线对象
    // eslint-disable-next-line
    const flyLine = new mapvgl.FlyLineLayer({
      style: 'chaos', // 样式，chaos是随机移动的意思
      color: 'rgba(33, 242, 214, 0.3)', // 底色
      step: 0.3, // 步长，也就是动画速度，值越大越快，默认0.1
      textureColor: 'blue', // 线的颜色（运动的线）
      textureWidth: 20, // 飞线的宽度
      textureLength: 10 // 飞线的长度
    });

    // 3. 将飞线对象添加到图层中
    view.addLayer(flyLine);

    // 4. 将飞线对象与数据源进行绑定
    flyLine.setData(data);
  };

  useEffect(() => {
    const map = initBMap();
    const data = initData();
    setData(map, data);
  }, []);

  return <div id='map_container'></div>;
}
