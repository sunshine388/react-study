import React, { useEffect } from 'react';
import './DrawLabel.scss';

let label = null;

export default function DrawLabelView() {
  const labelClick = (e) => {
    alert(e.target.content);
  };

  useEffect(() => {
    // eslint-disable-next-line
    const map = new BMapGL.Map('container'); // 这里填入的是容器的 ID
    // eslint-disable-next-line
    const point = new BMapGL.Point(113.942651, 22.53945);
    map.centerAndZoom(point, 12); // 设置中心点和基础缩放级别
    map.enableScrollWheelZoom(true); // 允许滚轮缩放

    // eslint-disable-next-line
    label = new BMapGL.Label('数据可视化 - 数据可视化', {
      position: point, // 出现的坐标点
      // eslint-disable-next-line
      offset: new BMapGL.Size(-100, 20) // 位移
    });
    label.setStyle({
      // 修改样式
      width: '300px',
      height: '100px',
      padding: '20px',
      color: '#07689f',
      fontSize: '20px',
      background: '#b9d7ea',
      border: '10px solid #8c82fc'
    });

    // label 添加点击事件
    label.addEventListener('click', labelClick);
    map.addOverlay(label);

    return () => {
      label.removeEventListener('click', labelClick);
    };
  }, []);

  return <div id='container'></div>;
}
