import React, { Component } from 'react';
import './FreeDrawing.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import 'ol/ol.css';

class FreeDrawingView extends Component {
  state = {
    map: null,
    draw: null,
    tool: 'LineString'
  };
  tools = [
    {
      value: 'LineString',
      label: '线条'
    },
    {
      value: 'Polygon',
      label: '多边形'
    },
    {
      value: 'Circle',
      label: '圆'
    },
    {
      value: 'None',
      label: '无'
    }
  ];
  source = new SourceVector({
    wrapX: false // 禁止横向无限重复（底图渲染的时候会横向无限重复），设置了这个属性，可以让绘制的图形不跟随底图横向无限重复
  });

  initMap = () => {
    // 绘图层
    let vector = new LayerVector({
      source: this.source
    });
    // 底图
    const raster = new Tile({
      source: new OSM()
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
    this.setState(
      {
        map: map
      },
      () => {
        this.addInteraction();
      }
    );
  };

  addInteraction = () => {
    if (this.state.draw != null) {
      this.state.map.removeInteraction(this.state.draw);
    }
    if (this.state.tool !== 'None') {
      const draw = new Draw({
        source: this.source,
        type: this.state.tool,
        freehand: true
      });
      this.state.map.addInteraction(draw);
      this.setState({
        draw: draw
      });
    }
  };
  changeTool = (event) => {
    this.setState({ tool: event.target.value }, () => {
      this.addInteraction();
    });
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <React.Fragment>
        <div id='map'></div>
        <div className='map-btn'>
          <select id='type' value={this.state.tool} onChange={this.changeTool}>
            {this.tools.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default FreeDrawingView;
