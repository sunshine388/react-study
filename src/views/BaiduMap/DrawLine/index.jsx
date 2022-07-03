import React, { Component } from 'react';
import './DrawLine.scss';

class DrawLineView extends Component {
  initMap = () => {
    // eslint-disable-next-line
    const map = new BMapGL.Map('container'); // 创建Map实例
    // eslint-disable-next-line
    const point = new BMapGL.Point(113.942651, 22.53945);
    map.centerAndZoom(point, 12); // 设置中心点和基础缩放级别
    map.enableScrollWheelZoom(true); // 允许滚轮缩放

    // eslint-disable-next-line
    const polyline = new BMapGL.Polyline(
      [
        // eslint-disable-next-line
        new BMapGL.Point(113.942651, 22.53945),
        // eslint-disable-next-line
        new BMapGL.Point(113.862651, 22.52945),
        // eslint-disable-next-line
        new BMapGL.Point(113.82651, 22.43945),
        // eslint-disable-next-line
        new BMapGL.Point(113.82651, 22.55945)
      ],
      {
        strokeColor: '#e84a5f',
        strokeWeight: 6
      }
    );

    map.addOverlay(polyline);
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return <div id='container'></div>;
  }
}

export default DrawLineView;
