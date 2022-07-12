import React, { useEffect } from 'react';
import './ZoomToExtent.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as control from 'ol/control';
import 'ol/ol.css';

export default function ZoomToExtentView() {
  const initMap = () => {
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
      controls: control.defaults().extend([
        // 控件
        new control.ZoomToExtent({
          extent: [
            // 坐标值
            813079.7791264898,
            5929220.284081122,
            848966.9639063801,
            5936863.986909639
          ]
        })
      ])
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
