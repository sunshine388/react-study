import React, { Component } from 'react';
import './TabIndex.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

class TabIndexView extends Component {
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
    return (
      <React.Fragment>
        <div tabIndex='2' id='map'></div>
        <div className='explain'>
          <p>通过给地图容器设置 tabindex="2" 来控制默认不会选中地图。</p>
          <p>只有当鼠标点击地图时，才能进行缩放等操作。</p>
          <p>如果没选中地图，即使在地图上滑动滚轮，也不会操作到地图。</p>
        </div>
      </React.Fragment>
    );
  }
}

export default TabIndexView;
