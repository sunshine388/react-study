import React, { useEffect, useState } from 'react';
import './SetExtent.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import { OSM, TileJSON } from 'ol/source';
import 'ol/ol.css';

const area = {
  India: [68.17665, 7.96553, 97.40256, 35.49401],
  Argentina: [-73.41544, -55.25, -53.62835, -21.83231],
  Nigeria: [2.6917, 4.24059, 14.57718, 13.86592],
  Sweden: [11.02737, 55.36174, 23.90338, 69.10625]
};
export default function SetExtentView() {
  const [layer, setLayer] = useState();
  const initMap = () => {
    const layer = new Tile({
      extent: area,
      source: new TileJSON({
        url:
          'https://api.tiles.mapbox.com/v4/mapbox.natural-earth-hypso-bathy.json?secure&access_token=sk.eyJ1IjoibWFyc2dpcyIsImEiOiJjbDFhYXQ3a2EwaHF6M2NvdnhmdjR6ajZ2In0.-sahm9R0QuPP3pAihJHC4A',
        crossOrigin: 'anonymous'
      })
    });
    // eslint-disable-next-line
    let map = new Map({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        }),
        layer
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 2
      })
    });
    setLayer(layer);
  };

  const replaceTheRegion = (data) => {
    layer.setExtent(area[data]); // 设置要显示的区域
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div id='map'></div>
      <div className='map-btn'>
        <button onClick={() => replaceTheRegion('India')}>印度</button>
        <button onClick={() => replaceTheRegion('Argentina')}>阿根廷</button>
        <button onClick={() => replaceTheRegion('Nigeria')}>尼日利亚</button>
        <button onClick={() => replaceTheRegion('Sweden')}>瑞典</button>
      </div>
    </React.Fragment>
  );
}
