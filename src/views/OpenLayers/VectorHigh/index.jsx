import React, { Component } from 'react';
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

class VectorHighView extends Component {
  state = {
    map: null,
    featureOverlay: null,
    highlight: null,
    info: ''
  };
  initMap = () => {
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
    let map = new Map({
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

    this.setState({ map: map }, () => {
      map.on('pointermove', (evt) => {
        if (evt.dragging) {
          // 拖拽
          return;
        }
        let pixel = map.getEventPixel(evt.originalEvent); // 鼠标在容器的坐标(左上角是[0,0])
        this.displayFeatureInfo(pixel);
      });
    });
  };

  displayFeatureInfo = (pixel) => {
    if (!this.state.featureOverlay) {
      const featureOverlay = new LayerVector({
        source: new SourceVector(),
        map: this.state.map,
        style: (feature) => {
          highlightStyle.getText().setText(feature.get('name'));
          return highlightStyle;
        }
      });
      this.setState({
        featureOverlay: featureOverlay
      });
    }
    let feature = this.state.map.forEachFeatureAtPixel(
      pixel,
      (feature) => feature
    );
    if (feature) {
      this.setState({
        info: feature.get('name')
      });
    } else {
      this.setState({
        info: ''
      });
    }
    if (feature !== this.state.highlight) {
      if (this.state.highlight) {
        this.state.featureOverlay
          .getSource()
          .removeFeature(this.state.highlight);
      }
      if (feature) {
        this.state.featureOverlay.getSource().addFeature(feature);
      }
      this.setState({
        highlight: feature
      });
    }
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return <div id='map'></div>;
  }
}

export default VectorHighView;
