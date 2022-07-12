import React, { useEffect, useState, useCallback } from 'react';
import './DrawGraph.scss';
import { Map, View } from 'ol';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import Draw, { createRegularPolygon, createBox } from 'ol/interaction/Draw';
import Polygon from 'ol/geom/Polygon';
import 'ol/ol.css';

const tools = [
  // 工具集
  {
    value: 'Circle',
    label: '圆'
  },
  {
    value: 'Square',
    label: '方形'
  },
  {
    value: 'Rectangle',
    label: '矩形'
  },
  {
    value: 'Hexagram',
    label: '六芒星'
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

export default function DrawGraphView() {
  const [map, setMap] = useState(null);
  const [tool, setTool] = useState('Circle');

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

  const addInteraction = useCallback(() => {
    if (draw != null) {
      map.removeInteraction(draw);
    }

    if (tool !== 'None') {
      let geometryFunction;
      let type = 'Circle';

      if (tool === 'Square') {
        // 方形
        geometryFunction = createRegularPolygon(4);
      } else if (tool === 'Rectangle') {
        // 矩形
        geometryFunction = createBox();
      } else if (tool === 'Hexagram') {
        geometryFunction = function(coordinates, geometry) {
          //中心点
          let center = coordinates[0];
          //鼠标点击的另一个点
          let last = coordinates[1];
          let dx = center[0] - last[0];
          let dy = center[1] - last[1];
          //半径
          let radius = Math.sqrt(dx * dx + dy * dy);
          //旋转的角度
          let rotation = Math.atan2(dy, dx);
          //用来记录顶点坐标的数组
          let newCoordinates = [];
          //顶点个数
          let numPoints = 12;
          for (let i = 0; i < numPoints; ++i) {
            //顶点相对转过的角度
            let angle = rotation + (i * 2 * Math.PI) / numPoints;
            //确定凸顶点和凹顶点
            let fraction = i % 2 === 0 ? 1 : 0.58;
            //计算顶点的坐标
            let offsetX = radius * fraction * Math.cos(angle);
            let offsetY = radius * fraction * Math.sin(angle);
            newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
          }
          newCoordinates.push(newCoordinates[0].slice());
          if (!geometry) {
            geometry = new Polygon([newCoordinates]);
          } else {
            geometry.setCoordinates([newCoordinates]);
          }
          return geometry;
        };
      }

      draw = new Draw({
        source: source,
        type,
        geometryFunction
      });
      map.addInteraction(draw);
    }
  }, [map, tool]);

  const changeTool = (event) => {
    setTool(event.target.value);
  };

  useEffect(() => {
    if (!map) {
      initMap();
    } else {
      addInteraction();
    }
  }, [addInteraction, map, tool]);

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
