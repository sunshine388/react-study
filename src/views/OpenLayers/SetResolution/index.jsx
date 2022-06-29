import React, { Component } from 'react';
import './SetResolution.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import { OSM, TileJSON } from 'ol/source';
import 'ol/ol.css';
class SetResolutionView extends Component {
  initMap = () => {
    // eslint-disable-next-line
    let map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        }),
        new Tile({
          source: new TileJSON({
            url:
              'https://api.tiles.mapbox.com/v4/mapbox.natural-earth-hypso-bathy.json?secure&access_token=sk.eyJ1IjoibWFyc2dpcyIsImEiOiJjbDFhYXQ3a2EwaHF6M2NvdnhmdjR6ajZ2In0.-sahm9R0QuPP3pAihJHC4A',
            crossOrigin: 'anonymous'
          }),

          // 当图层在 2000 至 20000 时显示
          minResolution: 2000,
          maxResolution: 20000
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
        <div id='map'></div>
        <p>
          在限制的范围之内时显示图层，在限制的范围之外时不显示图层。只有当指定图层在
          minResolution 和 maxResolution 范围内，才显示。
        </p>
      </React.Fragment>
    );
  }
}

export default SetResolutionView;
