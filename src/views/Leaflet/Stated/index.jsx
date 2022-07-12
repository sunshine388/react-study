import React, { useEffect } from 'react';
import './Stated.scss';

export default function StatedView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map').setView([51.505, -0.09], 13);

    // eslint-disable-next-line
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
