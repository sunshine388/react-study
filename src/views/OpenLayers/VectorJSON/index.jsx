import React, { useEffect } from 'react';
import './VectorJSON.scss';
import { Map, View } from 'ol';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import CN from '@/assets/map/MapOfChina.json'; // 矢量图（中国版）
import 'ol/ol.css';

export default function VectorJSONView() {
  const initMap = () => {
    // eslint-disable-next-line
    let map = new Map({
      target: 'map',
      layers: [
        // 图层
        new LayerVector({
          source: new SourceVector({
            features: new GeoJSON().readFeatures(CN, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:4326'
            })
          })
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [114.064839, 32.548857],
        zoom: 4
      })
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
