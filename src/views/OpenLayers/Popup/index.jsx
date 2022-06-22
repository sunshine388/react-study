import React, { Component } from 'react';
import './Popup.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ'; // 引入XYZ地图格式
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

class PopupView extends Component {
  constructor() {
    super();
    this.popupRef = React.createRef();
  }
  state = {
    map: null,
    overlay: null,
    currentCoordinate: ''
  };
  initMap = () => {
    let overlay = new Overlay({
      element: this.popupRef.current, // 弹窗标签，在html里
      autoPan: true, // 如果弹窗在底图边缘时，底图会移动
      autoPanAnimation: {
        // 底图移动动画
        duration: 250
      }
    });

    let map = new Map({
      target: 'map',
      layers: [
        new Tile({
          name: 'defaultLayer',
          source: new XYZ({
            url:
              'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
          })
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [113.1206, 23.034996],
        zoom: 12 // 地图缩放级别（打开页面时默认级别）
      }),
      overlays: [overlay]
    });
    this.setState(
      {
        map: map,
        overlay: overlay
      },
      () => {
        this.mapClick();
      }
    );
  };

  mapClick = () => {
    this.state.map.on('singleclick', (evt) => {
      const coordinate = evt.coordinate; // 获取坐标
      this.setState({
        currentCoordinate: coordinate
      });
      this.state.overlay.setPosition(coordinate);
    });
  };

  closePopup = () => {
    this.state.overlay.setPosition(undefined); // setPosition 传入undefined会隐藏弹窗元素
    this.setState({
      currentCoordinate: ''
    });
  };

  componentDidMount() {
    this.initMap();
  }
  render() {
    return (
      <div className='container'>
        <div id='map'></div>
        <div ref={this.popupRef} className='popup'>
          <span className='icon-close' onClick={this.closePopup}>
            ✖
          </span>
          <div className='popup-content'>
            {this.state.currentCoordinate[0]}
            <br />
            {this.state.currentCoordinate[1]}
          </div>
        </div>
      </div>
    );
  }
}

export default PopupView;
