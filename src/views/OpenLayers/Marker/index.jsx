import React, { Component } from 'react';
import './Marker.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay.js';
import 'ol/ol.css';

class MarkerView extends Component {
  initMap = () => {
    let pos = fromLonLat([16.3725, 48.208889]); // 维也纳坐标
    // 文字标签
    let vienna = new Overlay({
      position: pos,
      element: document.getElementById('viennaTxtCom'),
      positioning: 'top-center'
    });

    // 圆圈标签
    let marker = new Overlay({
      position: pos,
      positioning: 'bottom-center', // 如果不配置，则圆的左上角和坐标点对其
      element: document.getElementById('markerCom'),
      stopEvent: false // 不阻止默认事件，比如鼠标放到圆点上时，滚动鼠标滚轮，也可以缩放地图
    });

    let map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      // overlays: [marker.value, vienna.value], // 添加标记方式1
      view: new View({
        center: pos,
        zoom: 12
      })
    });

    // 添加标记方式2
    map.addOverlay(marker);
    map.addOverlay(vienna);
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <React.Fragment>
        <div id='map'></div>
        <a
          className='vienna'
          target='_blank'
          rel='noopener noreferrer'
          id='viennaTxtCom'
          href='https://baike.baidu.com/item/%E7%BB%B4%E4%B9%9F%E7%BA%B3/6412?fr=aladdin'>
          维也纳（点击跳转）
        </a>
        <div className='marker' title='Marker' id='markerCom'></div>
      </React.Fragment>
    );
  }
}

export default MarkerView;
