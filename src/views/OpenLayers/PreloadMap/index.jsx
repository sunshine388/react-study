import React, { Component } from 'react';
import './PreloadMap.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import 'ol/ol.css';

class PreloadMapView extends Component {
  initMap = () => {
    const view = new View({
      projection: 'EPSG:4326',
      center: [114.064839, 22.548857],
      zoom: 10
    });

    // eslint-disable-next-line
    let map1 = new Map({
      target: 'map1',
      layers: [
        new Tile({
          preload: Infinity, // 预加载
          source: new BingMaps({
            key:
              'AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-',
            imagerySet: 'Aerial'
          })
        })
      ],
      view: view
    });

    // eslint-disable-next-line
    let map2 = new Map({
      target: 'map2',
      layers: [
        new Tile({
          preload: 0, // 默认值
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
          <div id='map1' className='map'></div>
          <div id='map2' className='map'></div>
        </div>
        <div className='explain'>
          <p>预加载：preload: Infinity</p>
          <p>默认值：preload: 0</p>
        </div>
      </React.Fragment>
    );
  }
}

export default PreloadMapView;
