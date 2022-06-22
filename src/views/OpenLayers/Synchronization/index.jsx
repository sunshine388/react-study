import React, { Component } from 'react';
import './Synchronization.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import BingMaps from 'ol/source/BingMaps';
import 'ol/ol.css';

class SynchronizationView extends Component {
  state = {
    map1: null,
    map2: null
  };
  initMap = () => {
    const view = new View({
      projection: 'EPSG:4326',
      center: [113.1206, 23.034996],
      zoom: 12 // 地图缩放级别（打开页面时默认级别）
    });
    // eslint-disable-next-line
    let map1 = new Map({
      target: 'OSM',
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      view: view
    });
    // eslint-disable-next-line
    let map2 = new Map({
      target: 'BingMaps',
      layers: [
        new Tile({
          source: new BingMaps({
            key:
              'AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-',
            imagerySet: 'Aerial'
          })
        })
      ],
      view: view
    });
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <React.Fragment>
        <div className='map-container'>
          <div id='OSM' className='map'></div>
          <div id='BingMaps' className='map'></div>
        </div>
        <div className='explain'>
          <p>
            两个地图使用同一个view，所以在移动、缩放、旋转等操作都是同步的。
          </p>
          <p>按住shift，鼠标在地图上选区，可以放大选区。</p>
          <p>按住alt+shift，鼠标可以在地图上拖拽，进行旋转。</p>
        </div>
      </React.Fragment>
    );
  }
}

export default SynchronizationView;
