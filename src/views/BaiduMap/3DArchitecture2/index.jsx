import React, { Component } from 'react';
import './3DArchitecture2.scss';
import cqArchitecture from '@/assets/map/cqArchitecture.json';

class Architecture3D2View extends Component {
  // 初始化百度地图
  initBMap = () => {
    // eslint-disable-next-line
    const cityCenter = mapv.utilCityCenter.getCenterByCityName('北京');
    // eslint-disable-next-line
    const map = initMap({
      tilt: 80, // 倾斜角，默认是60
      heading: -45.3,
      center: [106.540547, 29.564858],
      zoom: 17
    });
    return map;
  };

  initData = () => {
    let polygons = []; // 面

    let len = cqArchitecture.length;
    for (let i = 0; i < len; i++) {
      let line = cqArchitecture[i];
      let polygon = [];
      let pt = [line[1] * 512, line[2] * 512];
      for (let j = 3; j < line.length; j += 2) {
        pt[0] += line[j] / 100 / 2;
        pt[1] += line[j + 1] / 100 / 2;
        polygon.push([pt[0], pt[1]]);
      }
      polygons.push({
        geometry: {
          type: 'Polygon',
          coordinates: [polygon]
        },
        properties: {
          height: line[0] / 2
        }
      });
    }

    return polygons;
  };

  setData = (map, data) => {
    // eslint-disable-next-line
    let view = new mapvgl.View({ map });
    // eslint-disable-next-line
    let shapeLayer = new mapvgl.ShapeLayer({
      color: '#fce38a', // 多边形的颜色
      opacity: 0.3, // 透明度
      style: 'windowAnimation', // normal，默认，正常；window，窗户效果；windowAnimation，窗户动画效果；gradual，渐变效果
      // blend: 'lighter',
      riseTime: 2000, // 建筑升起动画时长（毫秒）
      enablePicked: true, // 可以被选中
      selectedIndex: -1, // 默认时选中项为 -1
      selectedColor: '#95e1d3', // 选中时候的颜色
      autoSelect: true, // 根据鼠标位置来选中
      onClick: (e) => {
        // 选中的事件
        console.log(e);
      }
    });
    view.addLayer(shapeLayer);
    shapeLayer.setData(data);
  };

  componentDidMount() {
    const map = this.initBMap();
    const data = this.initData();
    this.setData(map, data);
  }
  render() {
    return <div id='map_container'></div>;
  }
}

export default Architecture3D2View;
