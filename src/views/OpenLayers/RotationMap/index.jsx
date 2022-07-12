import React, { useEffect } from 'react';
import './RotationMap.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

let map = null;

export default function RotationMapView() {
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
        minZoom: 12, // 地图缩放最小级别
        zoom: 12 // 地图缩放最大级别
      })
    });
  };

  // 顺时针
  const rotateLeft = () => {
    let currentRotation = map.getView().getRotation();
    map.getView().setRotation(currentRotation + 1);
  };

  // 逆时针
  const rotateRight = () => {
    let currentRotation = map.getView().getRotation();
    map.getView().setRotation(currentRotation - 1);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div id='map'></div>
      <div className='map-btn'>
        <button onClick={rotateLeft}>↻</button>
        <button onClick={rotateRight}>↺</button>
      </div>
    </React.Fragment>
  );
}
