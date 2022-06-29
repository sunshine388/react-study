import React, { Component } from 'react';
import './SetSource.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import { OSM, BingMaps } from 'ol/source';
import 'ol/ol.css';

class SetSourceView extends Component {
  source = {
    osm: new OSM(),
    bing: new BingMaps({
      key: 'AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-',
      imagerySet: 'Aerial'
    })
  };

  layer = new Tile();

  initMap = () => {
    // eslint-disable-next-line
    let map = new Map({
      target: 'map',
      layers: [this.layer],
      view: new View({
        projection: 'EPSG:4326',
        center: [116.404, 39.915],
        zoom: 12
      })
    });
    this.layer.setSource(this.source.osm);
  };
  setSource = (data) => {
    this.layer.setSource(this.source[data]);
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <React.Fragment>
        <div id='map'></div>
        <div className='map-btn'>
          <button onClick={() => this.setSource('osm')}>设置为OSM</button>
          <button onClick={() => this.setSource('bing')}>设置为BingMaps</button>
        </div>
      </React.Fragment>
    );
  }
}

export default SetSourceView;
