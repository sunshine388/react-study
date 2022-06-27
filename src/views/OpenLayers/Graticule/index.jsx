import React, { Component } from 'react';
import './Graticule.scss';
import { Map, View } from 'ol';
import Stroke from 'ol/style/Stroke';
import Tile from 'ol/layer/Tile';
import Graticule from 'ol/layer/Graticule';
import BingMaps from 'ol/source/BingMaps';
import 'ol/ol.css';

class GraticuleView extends Component {
  initMap = () => {
    let map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new BingMaps({
            key:
              'AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-',
            imagerySet: 'Road'
          })
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [114.064839, 22.548857],
        zoom: 6
      })
    });

    let graticule = new Graticule({
      strokeStyle: new Stroke({
        color: 'rgba(255, 120, 0, .5)', // 线条颜色
        width: 2, // 线条宽度
        lineDash: [4] // 虚线，每隔4像素
      }),
      showLabels: true
    });

    graticule.setMap(map);
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return <div id='map'></div>;
  }
}

export default GraticuleView;
