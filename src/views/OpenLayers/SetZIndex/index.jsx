import React, { Component } from 'react';
import './SetZIndex.scss';
import { Map, View, Feature } from 'ol';
import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import { Style, RegularShape, Fill, Stroke } from 'ol/style';
import 'ol/ol.css';

class SetZIndexView extends Component {
  state = {
    starZIndex: 1,
    squareZIndex: 0,
    triangleZIndex: 0,
    layer0: null,
    layer1: null,
    layer2: null
  };

  styles = {
    square: new Style({
      image: new RegularShape({
        fill: new Fill({ color: 'blue' }),
        stroke: new Stroke({ color: 'black', width: 1 }),
        points: 4,
        radius: 80,
        angle: Math.PI / 4
      })
    }),
    triangle: new Style({
      image: new RegularShape({
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'black', width: 1 }),
        points: 3,
        radius: 80,
        rotation: Math.PI / 4,
        angle: 0
      })
    }),
    star: new Style({
      image: new RegularShape({
        fill: new Fill({ color: 'green' }),
        stroke: new Stroke({ color: 'black', width: 1 }),
        points: 5,
        radius: 80,
        radius2: 4,
        angle: 0
      })
    })
  };
  initMap = () => {
    const layer0 = this.createLayer(
      [40, 40],
      this.styles['star'],
      this.starZIndex
    );
    const layer1 = this.createLayer(
      [0, 0],
      this.styles['square'],
      this.squareZIndex
    );
    const layer2 = this.createLayer(
      [0, 40],
      this.styles['triangle'],
      this.triangleZIndex
    );
    // eslint-disable-next-line
    const map = new Map({
      target: 'map', // 对应页面里 id 为 map 的元素
      layers: [layer2, layer1, layer0],
      view: new View({
        center: [0, 0],
        zoom: 18
      })
    });
    this.setState({
      layer0: layer0,
      layer1: layer1,
      layer2: layer2
    });
  };

  // 绘制图形
  createLayer = (coordinates, style, zIndex) => {
    let feature = new Feature(new Point(coordinates));
    feature.setStyle(style);
    let source = new SourceVector({
      features: [feature]
    });
    let vectorLayer = new LayerVector({
      source: source
    });
    vectorLayer.setZIndex(zIndex);
    return vectorLayer;
  };

  changeIndex(e, layer, layIndex) {
    const index = Number(e.target.value);
    this.state[layer].setZIndex(index);
    this.setState({
      [layIndex]: index
    });
  }
  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <React.Fragment>
        <div id='map'></div>
        <div className='map-btn'>
          <label>星形所在图层的 Z-index</label>
          <input
            type='number'
            value={this.state.starZIndex}
            onChange={(e) => this.changeIndex(e, 'layer0', 'starZIndex')}
          />
          <label>方块所在图层的 Z-index</label>
          <input
            type='number'
            value={this.state.squareZIndex}
            onChange={(e) => this.changeIndex(e, 'layer1', 'squareZIndex')}
          />
          <label>三角形所在图层的 Z-index</label>
          <input
            type='number'
            value={this.state.triangleZIndex}
            onChange={(e) => this.changeIndex(e, 'layer2', 'triangleZIndex')}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default SetZIndexView;
