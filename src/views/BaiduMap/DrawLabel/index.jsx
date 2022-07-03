import React, { Component } from 'react';
import './DrawLabel.scss';

class DrawLabelView extends Component {
  label = null;
  labelClick = (e) => {
    alert(e.target.content);
  };
  initMap = () => {
    // eslint-disable-next-line
    const map = new BMapGL.Map('container'); // 这里填入的是容器的 ID
    // eslint-disable-next-line
    const point = new BMapGL.Point(113.942651, 22.53945);
    map.centerAndZoom(point, 12); // 设置中心点和基础缩放级别
    map.enableScrollWheelZoom(true); // 允许滚轮缩放

    // eslint-disable-next-line
    this.label = new BMapGL.Label('数据可视化 - 数据可视化', {
      position: point, // 出现的坐标点
      // eslint-disable-next-line
      offset: new BMapGL.Size(-100, 20) // 位移
    });
    this.label.setStyle({
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
    this.label.addEventListener('click', this.labelClick);
    map.addOverlay(this.label);
  };
  componentDidMount() {
    this.initMap();
  }
  componentWillUnmount() {
    this.label.removeEventListener('click', this.labelClick);
  }
  render() {
    return <div id='container'></div>;
  }
}

export default DrawLabelView;
