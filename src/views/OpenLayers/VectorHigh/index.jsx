import React, { useEffect, useState } from 'react';
import './VectorHigh.scss';
import { Map, View } from 'ol';
import { Style, Fill, Stroke, Text } from 'ol/style';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import CN from '@/assets/map/MapOfChina.json'; // 矢量图（中国版）
import 'ol/ol.css';

const highlightStyle = new Style({
  stroke: new Stroke({
    color: '#f00',
    width: 1
  }),
  fill: new Fill({
    color: 'rgba(255, 0, 0, 0.1)'
  }),
  text: new Text({
    font: '12px Calibri, sans-serif',
    fill: new Fill({
      color: '#000'
    }),
    stroke: new Stroke({
      color: '#f00',
      width: 3
    })
  })
});

let map = null;
let featureOverlay = null;
let highlight = null;

export default function VectorHighView() {
  const [info, setInfo] = useState('');

  const initMap = () => {
    let style = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)'
      }),
      stroke: new Stroke({
        color: '#319FD3',
        width: 1
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: '#000'
        }),
        stroke: new Stroke({
          color: '#fff',
          width: 3
        })
      })
    });
    map = new Map({
      target: 'map',
      layers: [
        new LayerVector({
          source: new SourceVector({
            features: new GeoJSON().readFeatures(CN, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:4326'
            })
          }),
          style: (feature) => {
            style.getText().setText(feature.get('name'));
            return style;
          }
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [114.064839, 22.548857],
        zoom: 4
      })
    });

    map.on('pointermove', (evt) => {
      if (evt.dragging) {
        // 拖拽
        return;
      }
      let pixel = map.getEventPixel(evt.originalEvent); // 鼠标在容器的坐标(左上角是[0,0])
      if (!featureOverlay) {
        featureOverlay = new LayerVector({
          source: new SourceVector(),
          map: map,
          style: (feature) => {
            highlightStyle.getText().setText(feature.get('name'));
            return highlightStyle;
          }
        });
      }
      let feature = map.forEachFeatureAtPixel(pixel, (feature) => feature);
      if (feature) {
        setInfo(feature.get('name'));
      } else {
        setInfo('');
      }
      if (feature !== highlight) {
        if (highlight) {
          featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
          featureOverlay.getSource().addFeature(feature);
        }
        highlight = feature;
      }
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div id='map'></div>
      <p>{info}</p>
    </React.Fragment>
  );
}
