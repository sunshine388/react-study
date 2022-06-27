import React, { Component } from 'react';
import './ZoomSlider.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as control from 'ol/control';
import 'ol/ol.css';

class ZoomSliderView extends Component {
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
      }),
      controls: control.defaults().extend([new control.ZoomSlider()])
    });
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return <div id='map'></div>;
  }
}

export default ZoomSliderView;
