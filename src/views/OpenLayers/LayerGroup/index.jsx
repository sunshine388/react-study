import React, { useEffect, useState } from 'react';
import './LayerGroup.scss';
import { Map, View } from 'ol';
import { Tile, Group } from 'ol/layer';
import { OSM, TileJSON, XYZ } from 'ol/source';
import 'ol/ol.css';

let map = null;

export default function LayerGroupView() {
  const [visible, setVisible] = useState({
    visible0: true,
    visible0Opacity: 100,
    visible1: true,
    visible1Opacity: 100,
    visible10: true,
    visible10Opacity: 100,
    visible11: true,
    visible11Opacity: 100
  });

  const initMap = () => {
    map = new Map({
      target: 'map',
      layers: [
        // 图层
        new Tile({
          name: 'baseMap',
          source: new OSM()
        }),
        new Group({
          name: 'group',
          layers: [
            new Tile({
              name: 'biaoji',
              source: new XYZ({
                url:
                  'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd'
              })
            }),
            new Tile({
              name: 'land',
              source: new TileJSON({
                url:
                  'https://api.tiles.mapbox.com/v4/mapbox.world-borders-light.json?secure&access_token=sk.eyJ1IjoibWFyc2dpcyIsImEiOiJjbDFhYXQ3a2EwaHF6M2NvdnhmdjR6ajZ2In0.-sahm9R0QuPP3pAihJHC4A',
                crossOrigin: 'anonymous'
              })
            })
          ]
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [116.404, 39.915],
        zoom: 6
      })
    });
  };

  // 显示/隐藏图层
  // setVisible可以设置图层显示或隐藏
  const changeCheckBox = (e, target, name) => {
    if (map) {
      let layers = find(map, name);
      layers.setVisible(e.target.checked);
    }
    setVisible((obj) => ({ ...obj, [target]: e.target.checked }));
  };

  // 修改图层透明度
  // setOpacity可是设置图层的透明度，接收一个数值类型的参数
  const changeOpacity = (e, target, name) => {
    if (map) {
      let layers = find(map, name);
      layers.setOpacity(parseFloat(e.target.value));
    }
    setVisible((obj) => ({ ...obj, [target]: e.target.value }));
  };

  // 查找图层
  const find = (source, name) => {
    let s = source.getLayers();
    for (let i = 0; i < s.getLength(); i++) {
      // 遍历所有图层
      if (s.item(i).get('name') === name) {
        // 根据图层名，查找并返回查找到的图层
        return s.item(i);
      }
      if (s.item(i) instanceof Group) {
        // 递归
        return find(s.item(i), name);
      }
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div id='map'></div>
      <ul>
        <li>
          <span>OSM 层</span>
          <fieldset id='layer0'>
            <label>可见</label>
            <input
              id='visible0'
              type='checkbox'
              checked={visible.visible0}
              onChange={(e) => changeCheckBox(e, 'visible0', 'baseMap')}
            />
            <label>透明度</label>
            <input
              type='range'
              min='0'
              max='1'
              step='0.01'
              value={visible.visible0Opacity}
              onChange={(e) => changeOpacity(e, 'visible0Opacity', 'baseMap')}
            />
          </fieldset>
        </li>
        <li>
          <span>图层组</span>
          <fieldset id='layer1'>
            <label>可见</label>
            <input
              id='visible1'
              type='checkbox'
              checked={visible.visible1}
              onChange={(e) => changeCheckBox(e, 'visible1', 'group')}
            />
            <label>透明度</label>
            <input
              type='range'
              min='0'
              max='1'
              step='0.01'
              value={visible.visible1Opacity}
              onChange={(e) => changeOpacity(e, 'visible1Opacity', 'group')}
            />
          </fieldset>
          <ul>
            <li>
              <span>天地图矢量注记图层</span>
              <fieldset id='layer10'>
                <label>可见</label>
                <input
                  id='visible10'
                  type='checkbox'
                  checked={visible.visible10}
                  onChange={(e) => changeCheckBox(e, 'visible10', 'biaoji')}
                />
                <label>透明度</label>
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='0.01'
                  value={visible.visible10Opacity}
                  onChange={(e) =>
                    changeOpacity(e, 'visible10Opacity', 'biaoji')
                  }
                />
              </fieldset>
            </li>
            <li>
              <span>世界陆地边界图</span>
              <fieldset id='layer11'>
                <label>可见</label>
                <input
                  id='visible11'
                  type='checkbox'
                  checked={visible.visible11}
                  onChange={(e) => changeCheckBox(e, 'visible11', 'land')}
                />
                <label>透明度</label>
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='0.01'
                  value={visible.visible11Opacity}
                  onChange={(e) => changeOpacity(e, 'visible11Opacity', 'land')}
                />
              </fieldset>
            </li>
          </ul>
        </li>
      </ul>
    </React.Fragment>
  );
}
