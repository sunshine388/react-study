import React, { useEffect } from 'react';
import './AirlineAnimation.scss';

export default function AirlineAnimationView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map').setView([0, 0], 2);

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
    //获取JSON数据
    // eslint-disable-next-line
    $.getJSON('/leaflet/SnakeAnim/flights.json', function(data) {
      for (let flightNum = 0; flightNum < data.flights.length; flightNum++) {
        //设置线要素动画
        // eslint-disable-next-line
        let line = L.polyline(data.flights[flightNum], { snakingSpeed: 200 });
        //添加线要素动画显示
        line.addTo(mymap).snakeIn();
      }
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
