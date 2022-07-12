import React, { useEffect } from 'react';
import './ChangeTarget.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';

let map = null;

export default function ChangeTargetView() {
  const initMap = () => {
    map = new Map({
      layers: [
        // 图层
        new Tile({
          source: new OSM() // 图层数据源
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [113.1206, 23.034996],
        zoom: 12 // 地图缩放级别（打开页面时默认级别）
      })
    });

    map.setTarget('map1'); // 使用 setTarget 绑定地图容器
  };

  const changeMap = () => {
    // 获取当前地图容器，并进行判断
    let target = map.getTarget() === 'map1' ? 'map2' : 'map1';
    // 重新设置地图容器
    map.setTarget(target);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map-container'>
        <div id='map1' className='map'></div>
        <div id='map2' className='map'></div>
      </div>
      <button onClick={changeMap}> change </button>
    </React.Fragment>
  );
}
