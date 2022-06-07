import React, { Component } from 'react';
import './Stated.scss';

class StatedView extends Component {
  initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map').setView([51.505, -0.09], 13);

    // eslint-disable-next-line
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(mymap);
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return <div id='map'></div>;
  }
}

export default StatedView;
