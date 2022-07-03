import React, { Component } from 'react';
import './3DArchitecture.scss';

class Architecture3DView extends Component {
  // 初始化百度地图
  initBMap = () => {
    // eslint-disable-next-line
    const cityCenter = mapv.utilCityCenter.getCenterByCityName('北京');
    // eslint-disable-next-line
    const map = initMap({
      tilt: 80, // 倾斜角，默认是60
      heading: -45.3,
      center: [116.392394, 39.910683],
      zoom: 17
    });
    return map;
  };

  initData = () => {
    let data = [
      {
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [116.392394, 39.910683],
              [116.405976, 39.927727],
              [116.420996, 39.910351]
            ]
          ]
        },
        properties: {
          height: 500 // 多边形高度
        }
      }
    ];
    return data;
  };

  setData = (map, data) => {
    // eslint-disable-next-line
    let view = new mapvgl.View({ map });
    // eslint-disable-next-line
    let shapeLayer = new mapvgl.ShapeLayer({
      color: '#fce38a', // 多边形的颜色
      opacity: 0.3, // 透明度
      style: 'normal'
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

export default Architecture3DView;
