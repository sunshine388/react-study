import React, { Component } from 'react';
import './BrightMark.scss';
import { Map, View, Feature } from 'ol';
import Point from 'ol/geom/Point';
import * as style from 'ol/style';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import sourceVector from 'ol/source/Vector';
import layerVecor from 'ol/layer/Vector';
import 'ol/ol.css';
import dotPng from '@/assets/map/dot.png';

class BrightMarkView extends Component {
  initMap = () => {
    // 罗马
    let rome = new Feature({
      geometry: new Point([12.5, 31.9])
    });
    // 伦敦
    let london = new Feature({
      geometry: new Point([-0.12755, 41.507222])
    });
    // 马德里
    let madrid = new Feature({
      geometry: new Point([-3.683333, 30.4])
    });

    // 设置罗马标记点样式
    rome.setStyle(
      new style.Style({
        image: new style.Icon({
          color: '#8959A8',
          crossOrigin: 'anonymous',
          src: dotPng
        })
      })
    );
    // 设置伦敦标记点样式
    london.setStyle(
      new style.Style({
        image: new style.Icon({
          color: '#4271AE',
          crossOrigin: 'anonymous',
          src: dotPng
        })
      })
    );
    // 设置马德里标记点样式
    madrid.setStyle(
      new style.Style({
        image: new style.Icon({
          color: [113, 140, 0],
          crossOrigin: 'anonymous',
          src: dotPng
        })
      })
    );

    let vectorLayer = new layerVecor({
      source: new sourceVector({
        features: [rome, london, madrid]
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
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return <div id='map'></div>;
  }
}

export default BrightMarkView;
