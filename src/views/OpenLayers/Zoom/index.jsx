import React, { useEffect, useState } from 'react';
import './Zoom.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

const minZoom = 10;
const maxZoom = 14;

let map = null;

export default function ZoomView() {
  const [currentZoom, setCurrentZoom] = useState(12);

  const initMap = () => {
    map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [116.404, 39.915],
        zoom: 12, // 地图缩放级别（打开页面时默认级别）
        minZoom: minZoom, // 地图缩放最小级别
        maxZoom: maxZoom // 地图缩放最大级别
      })
    });
    map.getView().on('change:resolution', function(e) {
      let zoom = map.getView().getZoom();
      setCurrentZoom(zoom);
    });
  };

  // 放大1级
  const zoomIn = () => {
    let view = map.getView(); // 获取当前视图
    let zoom = view.getZoom(); // 获取当前缩放级别
    view.setZoom(zoom + 1);
  };

  // 缩小1级
  const zoomOut = () => {
    let view = map.getView(); // 获取当前视图
    let zoom = view.getZoom(); // 获取当前缩放级别
    view.setZoom(zoom - 1);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div id='map'></div>
      <div className='zoom-info'>
        <p>当前zoom: {currentZoom}</p>
        <p>minZoom: {minZoom}</p>
        <p>maxZoom: {maxZoom}</p>
      </div>
      <div className='zoom-btn'>
        <button onClick={zoomIn}>放大</button>
        <button onClick={zoomOut}>缩小</button>
      </div>
    </React.Fragment>
  );
}
