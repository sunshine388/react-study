import React, { useEffect, useState } from 'react';
import './Heatmap.scss';

let map = null;
let heatmapLayer = null;

export default function HeatmapView() {
  const [radius, setRadius] = useState(2);

  const initMap = () => {
    // eslint-disable-next-line
    map = L.map('heatmap', {
      //显示中心
      center: [25, 45],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 4,
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    // eslint-disable-next-line

    //创建天地图矢量图层
    // eslint-disable-next-line
    L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    ).addTo(map);
    //显示天地图（注记）
    // eslint-disable-next-line
    L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    ).addTo(map);

    //设置热力图数据：lat表示纬度、lng表示经度、weight表示权值
    let testData = {
      data: [
        { lat: 24, lng: 46, weight: 6 },
        { lat: 27, lng: 43, weight: 15 },
        { lat: 28, lng: 41, weight: 8 },
        { lat: 29, lng: 45, weight: 3 },
        { lat: 31, lng: 37, weight: 2 },
        { lat: 32, lng: 32, weight: 20 },
        { lat: 35, lng: 30, weight: 25 },
        { lat: 30, lng: 29, weight: 30 }
      ]
    };
    //设置热力图图层参数
    let options = {
      //设置半径
      radius: 2,
      //透明度
      maxOpacity: 8,
      //半径随地图缩放而动态变化
      scaleRadius: true,
      useLocalExtrema: true,
      //代表纬度的字段名称，默认为lat
      latField: 'lat',
      //代表经度的字段名称，默认为lng
      lngField: 'lng',
      //代表权值的字段名称，默认为value
      valueField: 'weight'
    };
    //根据参数创建热力图图层
    // eslint-disable-next-line
    heatmapLayer = new HeatmapOverlay(options).addTo(map);
    //设置热力图数据
    heatmapLayer.setData(testData);
  };

  // 调整热力图显示半径
  const setHeatMap = (e) => {
    setRadius(e.target.value);
    //调整热力图半径
    heatmapLayer.cfg.radius = e.target.value;
    //删除原始图层
    map.removeLayer(heatmapLayer);
    //添加图层，显示更新后的热力图
    map.addLayer(heatmapLayer);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map-btn'>
        <label> 热点半径（radius size）</label>
        <input
          type='range'
          id='radius'
          min='1'
          max='15'
          step='1'
          value={radius}
          onChange={setHeatMap}
        />
      </div>
      <div id='heatmap'></div>
    </React.Fragment>
  );
}
