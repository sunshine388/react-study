import React, { useEffect } from 'react';
import './Control.scss';

export default function ControlView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map', {
      attributionControl: false,
      zoomControl: false
    }).setView([51.505, -0.09], 13);

    // eslint-disable-next-line
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3Vuc2hpbmUzODgiLCJhIjoiY2w1bTkwYzl2MHJ0cjNncWlvMzA5aGYzeSJ9.uaM3WZCNU2_Cg2yXBi-ilA',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1Ijoic3Vuc2hpbmUzODgiLCJhIjoiY2w1bTkwYzl2MHJ0cjNncWlvMzA5aGYzeSJ9.uaM3WZCNU2_Cg2yXBi-ilA'
      }
    ).addTo(mymap);

    // 缩放
    // eslint-disable-next-line
    L.control
      .zoom({
        zoomInText: '+', //设置在 'zoom in' 按钮上的文字。
        zoomInTitle: 'Zoom in', //	设置在 'zoom in' 按钮上的标题。
        zoomOutText: '-', //设置在 'zoom out' 按钮上的文字。
        zoomOutTitle: 'Zoom out'
      })
      .addTo(mymap);

    //版权
    // eslint-disable-next-line
    L.control
      .attribution({
        prefix: 'yxx-2022' // 显示在属性前的HTML文本。传递 false 表示禁用。
      })
      .addTo(mymap);

    // 比例尺控件
    // eslint-disable-next-line
    L.control
      .scale({
        maxWidth: 100, //	控件的最大宽度，单位是像素。宽度是动态设置的，以显示圆形值（如100、200、500）。
        metric: true, //是否显示公制比例线（米/公里）。
        imperial: true, //是否显示英制比例线（英里/英尺）。
        updateWhenIdle: false //如果为 true, 控件在 移动结束时被更新，否则它总是最新的( move 时更新)。
      })
      .addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
