import React, { Component } from 'react';
import './Zoom.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

class ZoomView extends Component {
  state = {
    map: null,
    currentZoom: 12,
    minZoom: 10,
    maxZoom: 14
  };
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
        zoom: this.state.currentZoom, // 地图缩放级别（打开页面时默认级别）
        minZoom: this.state.minZoom, // 地图缩放最小级别
        maxZoom: this.state.maxZoom // 地图缩放最大级别
      })
    });
    this.setState({
      map: map
    });
  };

  // 放大1级
  zoomIn = () => {
    let view = this.state.map.getView(); // 获取当前视图
    let zoom = view.getZoom(); // 获取当前缩放级别
    view.setZoom(zoom + 1);
    this.setState({
      currentZoom: this.state.map.getView().getZoom()
    });
  };

  // 缩小1级
  zoomOut = () => {
    let view = this.state.map.getView(); // 获取当前视图
    let zoom = view.getZoom(); // 获取当前缩放级别
    view.setZoom(zoom - 1);
    this.setState({
      currentZoom: this.state.map.getView().getZoom()
    });
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <div>
        <div id='map'></div>
        <div className='zoom__info'>
          <p>当前zoom: {this.state.currentZoom}</p>
          <p>minZoom: {this.state.minZoom}</p>
          <p>maxZoom: {this.state.maxZoom}</p>
        </div>
        <div>
          <button onClick={this.zoomIn}>放大</button>
          <button onClick={this.zoomOut}>缩小</button>
        </div>
      </div>
    );
  }
}

export default ZoomView;
