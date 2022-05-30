import React, { Component } from 'react';
import './Stated.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

class StatedView extends Component {
  initMap = () => {
    // eslint-disable-next-line
    let map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [116.404, 39.915],
        zoom: 12
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

export default StatedView;
