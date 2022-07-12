import React, { useEffect } from 'react';
import './SetSource.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import { OSM, BingMaps } from 'ol/source';
import 'ol/ol.css';

const source = {
  osm: new OSM(),
  bing: new BingMaps({
    key: 'AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-',
    imagerySet: 'Aerial'
  })
};

const layer = new Tile();

export default function SetSourceView() {
  const initMap = () => {
    // eslint-disable-next-line
    let map = new Map({
      target: 'map',
      layers: [layer],
      view: new View({
        projection: 'EPSG:4326',
        center: [116.404, 39.915],
        zoom: 12
      })
    });
    layer.setSource(source.osm);
  };
  const setSource = (data) => {
    layer.setSource(source[data]);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div id='map'></div>
      <div className='map-btn'>
        <button onClick={() => setSource('osm')}>设置为OSM</button>
        <button onClick={() => setSource('bing')}>设置为BingMaps</button>
      </div>
    </React.Fragment>
  );
}
