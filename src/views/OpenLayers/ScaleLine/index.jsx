import React, { Component } from 'react';
import './ScaleLine.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import * as control from 'ol/control';
import 'ol/ol.css';

class ScaleLineView extends Component {
  state = {
    scaleplate: '度',
    scaleLineControl: null,
    map: null
  };

  scaleplateList = [
    {
      t: '度',
      v: 'degrees'
    },
    {
      t: '英制英尺',
      v: 'imperial'
    },
    {
      t: '美制英尺',
      v: 'us'
    },
    {
      t: '海里',
      v: 'nautical'
    },
    {
      t: '公制',
      v: 'metric'
    }
  ];
  initMap = () => {
    const scaleLineControl = new control.ScaleLine();
    // eslint-disable-next-line
    let map = new Map({
      target: 'map',
      layers: [
        // 图层
        new Tile({
          source: new BingMaps({
            key:
              'AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-',
            imagerySet: 'Aerial'
          })
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [116.404, 39.915],
        zoom: 12
      }),
      controls: control.defaults().extend([
        scaleLineControl // 比例尺
      ])
    });
    this.setState(
      {
        scaleLineControl: scaleLineControl,
        map: map
      },
      () => {
        this.setScaleLine(); // 设置比例尺单位
      }
    );
  };

  // 设置比例尺单位
  setScaleLine = () => {
    // 从列表里找到当前单位
    let unit = this.scaleplateList.find((item) => {
      return item.t === this.state.scaleplate;
    });
    // 设置单位，注意unit.v的值，必须使用这些值
    this.state.scaleLineControl.setUnits(unit.v);
  };

  changeScaleLine = (event) => {
    this.setState({ scaleplate: event.target.value }, () => {
      this.setScaleLine();
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
          <select
            id='units'
            value={this.state.scaleplate}
            onChange={this.changeScaleLine}>
            {this.scaleplateList.map((item) => (
              <option key={item.v}>{item.t}</option>
            ))}
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default ScaleLineView;
