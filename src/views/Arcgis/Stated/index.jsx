import React, { useEffect } from 'react';
import './Stated.scss';
import { loadModules } from 'esri-loader';

export default function StatedView() {
  const initMap = () => {
    loadModules(['esri/Map', 'esri/views/MapView']).then(([Map, MapView]) => {
      this.esriMap = new Map({
        basemap: 'streets-vector'
      });
      new MapView({
        map: this.esriMap,
        container: 'map',
        center: [-118.244, 34.052],
        zoom: 12
      });
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
