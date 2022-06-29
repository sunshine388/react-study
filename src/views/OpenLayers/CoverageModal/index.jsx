import React, { Component } from 'react';
import './CoverageModal.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

class CoverageModalView extends Component {
  initMap = () => {
    let layer = new Tile({
      preload: Infinity,
      source: new OSM()
    });

    let map = new Map({
      target: 'map',
      layers: [layer],
      view: new View({
        projection: 'EPSG:4326',
        center: [116.404, 39.915],
        zoom: 12
      })
    });

    layer.on('postrender', (event) => {
      let ctx = event.context;
      ctx.save();
      let pixelRatio = event.frameState.pixelRatio;
      let size = map.getSize();
      // 平移
      ctx.translate((size[0] / 2) * pixelRatio, (size[1] / 2) * pixelRatio);
      //缩放
      ctx.scale(3 * pixelRatio, 3 * pixelRatio);
      //平移
      ctx.translate(-75, -80);
      ctx.beginPath();
      ctx.moveTo(75, 40);
      ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
      ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
      ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
      ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
      ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
      ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
      ctx.clip();
      ctx.translate(75, 80);
      ctx.scale(1 / 3 / pixelRatio, 1 / 3 / pixelRatio);
      ctx.translate((-size[0] / 2) * pixelRatio, (-size[1] / 2) * pixelRatio);
    });

    layer.on('rendercomplete', function(event) {
      let ctx = event.context;
      ctx.restore();
    });
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return <div id='map'></div>;
  }
}

export default CoverageModalView;
