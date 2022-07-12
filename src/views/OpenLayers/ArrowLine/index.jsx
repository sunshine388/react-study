import React, { useEffect } from 'react';
import './ArrowLine.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import { Style, Stroke, Icon } from 'ol/style';
import Point from 'ol/geom/Point';
import 'ol/ol.css';
// 箭头图片
import arrowPng from '@/assets/map/arrow.png';

export default function ArrowLineView() {
  const styleFunction = (feature) => {
    let geometry = feature.getGeometry();
    let styles = [
      new Style({
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        })
      })
    ];
    geometry.forEachSegment((start, end) => {
      let dx = end[0] - start[0];
      let dy = end[1] - start[1];
      let rotation = Math.atan2(dy, dx);
      styles.push(
        new Style({
          geometry: new Point(end),
          image: new Icon({
            src: arrowPng,
            anchor: [0.75, 0.5],
            rotateWithView: true,
            rotation: -rotation
          })
        })
      );
    });
    return styles;
  };

  useEffect(() => {
    // 底图
    const raster = new Tile({
      source: new OSM()
    });
    const source = new SourceVector({
      wrapX: false // 禁止横向无限重复（底图渲染的时候会横向无限重复），设置了这个属性，可以让绘制的图形不跟随底图横向无限重复
    });
    const vector = new LayerVector({
      source: source,
      style: styleFunction
    });
    let map = new Map({
      target: 'map',
      layers: [raster, vector],
      view: new View({
        projection: 'EPSG:4326',
        center: [116.404, 39.915],
        zoom: 12
      })
    });
    map.addInteraction(
      new Draw({
        source: source,
        type: 'LineString'
        // freehand: true // 如果加上自由绘制哈哈哈哈哈哈
      })
    );
  }, []);

  return <div id='map'></div>;
}
