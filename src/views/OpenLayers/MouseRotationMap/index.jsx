import React, { useEffect } from 'react';
import './MouseRotationMap.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import DragRotateAndZoom from 'ol/interaction/DragRotateAndZoom';
import * as olInteraction from 'ol/interaction';
import 'ol/ol.css';

export default function MouseRotationMapView() {
  const initMap = () => {
    // eslint-disable-next-line
    let map = new Map({
      target: 'map',
      interactions: olInteraction.defaults().extend([new DragRotateAndZoom()]),
      layers: [
        // 图层
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [116.404, 39.915],
        minZoom: 10,
        zoom: 12
      })
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div id='map'></div>
      <p>按住Shift并使用鼠标拖拽可以旋转、缩放地图</p>
    </React.Fragment>
  );
}
