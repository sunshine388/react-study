import React, { useEffect } from 'react';
import './MousePosition.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as control from 'ol/control';
import * as coordinate from 'ol/coordinate';
import 'ol/ol.css';

export default function MousePositionView() {
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
        new control.MousePosition({
          coordinateFormat: coordinate.createStringXY(4),
          projection: 'EPSG:4326',
          target: 'mousePosition'
        })
      ])
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div id='map'></div>
      <p id='mousePosition'></p>
    </React.Fragment>
  );
}
