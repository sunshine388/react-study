import React, { useEffect, useState } from 'react';
import './ScaleLine.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import * as control from 'ol/control';
import 'ol/ol.css';

const scaleplateList = [
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

let scaleLineControl = null;

export default function ScaleLineView() {
  const [map, setMap] = useState();
  const [scaleplate, setScaleplate] = useState('度');

  const initMap = () => {
    scaleLineControl = new control.ScaleLine();
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
    setMap(map);
  };

  const changeScaleLine = (event) => {
    setScaleplate(event.target.value);
  };

  useEffect(() => {
    if (!map) {
      initMap();
    } else {
      // 从列表里找到当前单位
      let unit = scaleplateList.find((item) => {
        return item.t === scaleplate;
      });
      // 设置单位，注意unit.v的值，必须使用这些值
      scaleLineControl.setUnits(unit.v);
    }
  }, [map, scaleplate]);

  return (
    <React.Fragment>
      <div id='map'></div>
      <div className='map-btn'>
        <select id='units' value={scaleplate} onChange={changeScaleLine}>
          {scaleplateList.map((item) => (
            <option key={item.v}>{item.t}</option>
          ))}
        </select>
      </div>
    </React.Fragment>
  );
}
