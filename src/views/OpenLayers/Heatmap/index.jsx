import React, { Component } from 'react';
import './Heatmap.scss';
import { Map, View } from 'ol';
import { Heatmap, Tile } from 'ol/layer';
import { Vector as SourceVector, Stamen } from 'ol/source'; // Stamen是底图
import GeoJSON from 'ol/format/GeoJSON'; // 解析geojson格式
import HeatData from '@/assets/map/heatData.json';
import 'ol/ol.css';

class HeatmapView extends Component {
  state = {
    map: null,
    vector: null,
    radius: 10, // 半径大小
    blur: 10 // 模糊
  };

  initMap = () => {
    const vector = new Heatmap({
      // 热力图
      name: '热力图',
      source: new SourceVector({
        features: new GeoJSON().readFeatures(HeatData, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:4326'
        })
      }),
      radius: 10, // 半径大小
      blur: 10, // 模糊
      gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'] // 热力图颜色（可以不设置）
    });
    const map = new Map({
      target: 'map',
      layers: [
        // 图层
        new Tile({
          name: '底图',
          source: new Stamen({
            // 底图
            layer: 'toner'
          })
        }),
        vector
      ],
      view: new View({
        // 地图视图
        projection: 'EPSG:3857', // 坐标系，有EPSG:4326和EPSG:3857
        center: [20.042007, 35.349998], // 深圳坐标
        zoom: 19 // 地图缩放级别（打开页面时默认级别）
      })
    });
    this.setState({
      map: map,
      vector: vector
    });
  };

  // 修改半径大小
  changeRadius = (event) => {
    this.setState({ radius: event.target.value });
    this.state.vector.setRadius(parseInt(event.target.value, 10));
  };

  // 修改模糊半径
  changeBlur = (event) => {
    this.setState({ blur: event.target.value });
    this.state.vector.setBlur(parseInt(event.target.value, 10));
  };

  // 在控制台输出图层名
  getHeatName = () => {
    let layers = this.state.map.getLayers();
    for (let i = 0; i < layers.getLength(); i++) {
      console.log('图层名：', layers.item(i).get('name'));
    }
  };

  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <React.Fragment>
        <div id='map'></div>
        <div className='map-btn'>
          <label>半径大小</label>
          <input
            id='radius'
            type='range'
            min='1'
            max='50'
            step='1'
            value={this.state.radius}
            onChange={this.changeRadius}
          />

          <label>模糊半径</label>
          <input
            id='blur'
            type='range'
            min='1'
            max='50'
            step='1'
            value={this.state.blur}
            onChange={this.changeBlur}
          />

          <button onClick={this.getHeatName}>在控制台输出涂层名</button>
        </div>
      </React.Fragment>
    );
  }
}

export default HeatmapView;
