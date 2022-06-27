import React, { Component } from 'react';
import './RotationMap.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

class RotationMapView extends Component {
  state = {
    map: null
  };
  initMap = () => {
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
        minZoom: 12, // 地图缩放最小级别
        zoom: 12 // 地图缩放最大级别
      })
    });
    this.setState({
      map: map
    });
  };

  // 顺时针
  rotateLeft = () => {
    let currentRotation = this.state.map.getView().getRotation();
    this.state.map.getView().setRotation(currentRotation + 1);
  };

  // 逆时针
  rotateRight = () => {
    let currentRotation = this.state.map.getView().getRotation();
    this.state.map.getView().setRotation(currentRotation - 1);
  };

  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <React.Fragment>
        <div id='map'></div>
        <div className='map-btn'>
          <button onClick={this.rotateLeft}>↻</button>
          <button onClick={this.rotateRight}>↺</button>
        </div>
      </React.Fragment>
    );
  }
}

export default RotationMapView;
