import React, { Component } from 'react';
import './SimplenessLabel.scss';
import { Map, View, Feature } from 'ol';
import Point from 'ol/geom/Point';
import * as style from 'ol/style';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import sourceVector from 'ol/source/Vector';
import layerVecor from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';
import iconPng from '@/assets/map/icon.png'; // 引入图标图片

class SimplenessLabelView extends Component {
  state = {
    shopPopup: false
  };
  initMap = () => {
    // 创建图标特性
    let iconFeature = new Feature({
      geometry: new Point([0, 0]), // 图标展示的位置
      name: '你点我了',
      population: 4000,
      rainfall: 500
    });

    // 创建图标样式
    let iconStyle = new style.Style({
      image: new style.Icon({
        // 定义图标锚点
        anchor: [0.5, 46], // 根据图标的大小，对应上面 [0, 0] 的坐标
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        // 图标所使用的图片文件
        // src: require('../../assets/images/icon.png')
        // 或者
        src: iconPng
      })
    });

    // 把样式应用到图标上
    iconFeature.setStyle(iconStyle);
    let vectorLayer = new layerVecor({
      source: new sourceVector({
        features: [iconFeature]
      })
    });

    let rasterLayer = new Tile({
      source: new OSM()
    });
    // eslint-disable-next-line
    let map = new Map({
      target: 'map', // 对应页面里 id 为 map 的元素
      layers: [rasterLayer, vectorLayer],
      view: new View({
        // 地图视图
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 3
      })
    });

    map.on('singleclick', (e) => {
      let elPopup = document.getElementById('popup');
      let popup = new Overlay({
        element: elPopup,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50]
      });
      map.addOverlay(popup);
      let feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);

      if (feature) {
        elPopup.innerHTML = feature.values_.name;
        let coordinates = feature.getGeometry().getCoordinates();
        this.setState({
          shopPopup: true
        });
        setTimeout(() => {
          popup.setPosition(coordinates);
        }, 0);
      } else {
        this.setState({
          shopPopup: false
        });
      }
    });
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <React.Fragment>
        <div id='map'></div>
        <div
          id='popup'
          className='popup'
          style={{ visible: this.state.shopPopup }}></div>
      </React.Fragment>
    );
  }
}

export default SimplenessLabelView;
