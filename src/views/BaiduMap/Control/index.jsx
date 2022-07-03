import React, { Component } from 'react';
import './Control.scss';

class ControlView extends Component {
  initMap = () => {
    // eslint-disable-next-line
    const map = new BMapGL.Map('container', {
      minZoom: 11,
      maxZoom: 16,
      // eslint-disable-next-line
      mapType: BMAP_NORMAL_MAP
    });
    // eslint-disable-next-line
    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 12); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    // 放大缩小控件
    // eslint-disable-next-line
    const zoomCtrl = new BMapGL.ZoomControl({
      // eslint-disable-next-line
      anchor: BMAP_ANCHOR_BOTTOM_LEFT, // 默认是在地图右下角，现在把控件设置在左下角（需要注意，因为用css把“百度地图logo”隐藏了，所以要把左下角的控件display设置成block）
      // eslint-disable-next-line
      offset: new BMapGL.Size(10, 10) // 位移
    });
    map.addControl(zoomCtrl);

    // 标尺控件
    // eslint-disable-next-line
    const scaleVtrl = new BMapGL.ScaleControl({
      // eslint-disable-next-line
      anchor: BMAP_ANCHOR_TOP_LEFT, // 该控件必填此项，不然不会显示
      // eslint-disable-next-line
      offset: new BMapGL.Size(10, 10) // 此项非必填
    });
    map.addControl(scaleVtrl);

    // 监听缩放
    map.addEventListener('zoomstart', function() {
      console.log('zoom缩放前：', map.getZoom());
    });
    map.addEventListener('zoomend', function() {
      console.log('zoom缩放后：', map.getZoom());
    });
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return <div id='container'></div>;
  }
}

export default ControlView;
