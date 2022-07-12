import React, { useEffect, useState } from 'react';
import './FreeDrawing.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';
import 'ol/ol.css';

const tools = [
  {
    value: 'LineString',
    label: '线条'
  },
  {
    value: 'Polygon',
    label: '多边形'
  },
  {
    value: 'Circle',
    label: '圆'
  },
  {
    value: 'None',
    label: '无'
  }
];

const source = new SourceVector({
  wrapX: false // 禁止横向无限重复（底图渲染的时候会横向无限重复），设置了这个属性，可以让绘制的图形不跟随底图横向无限重复
});

let draw = null;

export default function FreeDrawingView() {
  const [map, setMap] = useState(null);
  const [tool, setTool] = useState('LineString');

  const initMap = () => {
    // 绘图层
    let vector = new LayerVector({
      source: source
    });
    // 底图
    const raster = new Tile({
      source: new OSM()
    });
    let map = new Map({
      target: 'map',
      layers: [raster, vector],
      view: new View({
        projection: 'EPSG:4326',
        center: [116.404, 39.915],
        zoom: 12
      })
    });
    setMap(map);
  };

  const changeTool = (event) => {
    setTool(event.target.value);
  };

  useEffect(() => {
    if (!map) {
      initMap();
    } else {
      if (draw != null) {
        map.removeInteraction(draw);
      }
      if (tool !== 'None') {
        draw = new Draw({
          source: source,
          type: tool,
          freehand: true
        });
        map.addInteraction(draw);
      }
    }
  }, [map, tool]);

  return (
    <React.Fragment>
      <div id='map'></div>
      <div className='map-btn'>
        <select id='type' value={tool} onChange={changeTool}>
          {tools.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </React.Fragment>
  );
}
