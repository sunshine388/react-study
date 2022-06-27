import React, { Component } from 'react';
import './OverviewMap.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as control from 'ol/control';
import 'ol/ol.css';

class OverviewMapView extends Component {
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
      }),
      controls: control.defaults().extend([
        // 控件
        new control.OverviewMap({
          className: 'ol-overviewmap ol-custom-overviewmap',
          layers: [
            new Tile({
              source: new OSM({
                // 使用不同样式的底图
                url:
                  'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
                  '?apikey=0e6fc415256d4fbb9b5166a718591d71'
              })
            })
          ],
          collapseLabel: '\u00BB',
          label: '\u00AB',
          collapsed: false
        })
      ])
    });
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return <div id='map'></div>;
  }
}

export default OverviewMapView;
