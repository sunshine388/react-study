import React, { useEffect, useState } from 'react';
import './SnapGraph.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import 'ol/ol.css';

const tools = [
  {
    value: 'Point',
    label: '点'
  },
  {
    value: 'LineString',
    label: '线'
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
let snap = null;

export default function SnapGraphView() {
  const [map, setMap] = useState(null);
  const [tool, setTool] = useState('Point');

  const initMap = () => {
    // 绘图层
    const vector = new LayerVector({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
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
    const modify = new Modify({
      source: source,
      insertVertexCondition: () => false // 如果返回true，可以增加节点
    });
    map.addInteraction(modify);
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
      if (snap !== null) {
        map.removeInteraction(snap);
      }
      if (tool !== 'None') {
        draw = new Draw({
          source: source,
          type: tool
        });
        map.addInteraction(draw);

        snap = new Snap({ source: source });
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
