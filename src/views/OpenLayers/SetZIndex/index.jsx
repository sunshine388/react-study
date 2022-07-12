import React, { useEffect, useState } from 'react';
import './SetZIndex.scss';
import { Map, View, Feature } from 'ol';
import LayerVector from 'ol/layer/Vector';
import SourceVector from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import { Style, RegularShape, Fill, Stroke } from 'ol/style';
import 'ol/ol.css';

const styles = {
  square: new Style({
    image: new RegularShape({
      fill: new Fill({ color: 'blue' }),
      stroke: new Stroke({ color: 'black', width: 1 }),
      points: 4,
      radius: 80,
      angle: Math.PI / 4
    })
  }),
  triangle: new Style({
    image: new RegularShape({
      fill: new Fill({ color: 'red' }),
      stroke: new Stroke({ color: 'black', width: 1 }),
      points: 3,
      radius: 80,
      rotation: Math.PI / 4,
      angle: 0
    })
  }),
  star: new Style({
    image: new RegularShape({
      fill: new Fill({ color: 'green' }),
      stroke: new Stroke({ color: 'black', width: 1 }),
      points: 5,
      radius: 80,
      radius2: 4,
      angle: 0
    })
  })
};

let layer0 = null;
let layer1 = null;
let layer2 = null;

export default function SetZIndexView() {
  const [starZIndex, setStarZIndex] = useState(1);
  const [squareZIndex, setSquareZIndex] = useState(0);
  const [triangleZIndex, setTriangleZIndex] = useState(0);

  // 绘制图形
  const createLayer = (coordinates, style, zIndex) => {
    let feature = new Feature(new Point(coordinates));
    feature.setStyle(style);
    let source = new SourceVector({
      features: [feature]
    });
    let vectorLayer = new LayerVector({
      source: source
    });
    vectorLayer.setZIndex(zIndex);
    return vectorLayer;
  };

  const changeIndex = (e, layer, layIndex) => {
    const index = Number(e.target.value);
    switch (layer) {
      case 'layer0':
        layer0.setZIndex(index);
        setStarZIndex(index);
        break;
      case 'layer1':
        layer1.setZIndex(index);
        setSquareZIndex(index);
        break;
      case 'layer2':
        layer2.setZIndex(index);
        setTriangleZIndex(index);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    layer0 = createLayer([40, 40], styles['star'], 1);
    layer1 = createLayer([0, 0], styles['square'], 0);
    layer2 = createLayer([0, 40], styles['triangle'], 0);
    // eslint-disable-next-line
    const map = new Map({
      target: 'map', // 对应页面里 id 为 map 的元素
      layers: [layer2, layer1, layer0],
      view: new View({
        center: [0, 0],
        zoom: 18
      })
    });
  }, []);

  return (
    <React.Fragment>
      <div id='map'></div>
      <div className='map-btn'>
        <label>星形所在图层的 Z-index</label>
        <input
          type='number'
          value={starZIndex}
          onChange={(e) => changeIndex(e, 'layer0', 'starZIndex')}
        />
        <label>方块所在图层的 Z-index</label>
        <input
          type='number'
          value={squareZIndex}
          onChange={(e) => changeIndex(e, 'layer1', 'squareZIndex')}
        />
        <label>三角形所在图层的 Z-index</label>
        <input
          type='number'
          value={triangleZIndex}
          onChange={(e) => changeIndex(e, 'layer2', 'triangleZIndex')}
        />
      </div>
    </React.Fragment>
  );
}
