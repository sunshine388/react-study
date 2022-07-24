import React, { useEffect } from 'react';

export default function GeoJSONView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map8', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [40, 116.3],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 12,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    //显示天地图（矢量图层+注记）
    // eslint-disable-next-line
    L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    ).addTo(mymap);
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
    ).addTo(mymap);

    //创建GeoJSON数据
    let data = [
      {
        type: 'Feature',
        properties: { party: 'Republican', name: '三角形' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [116.3, 40],
              [116.37, 40],
              [116.34, 40.05]
            ]
          ]
        }
      },
      {
        type: 'Feature',
        properties: { party: 'Democrat', name: '矩形' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [116.22, 40],
              [116.26, 40],
              [116.26, 40.05],
              [116.22, 40.05]
            ]
          ]
        }
      }
    ];
    //添加GeoJSON数据，在地图中显示
    // eslint-disable-next-line
    L.geoJSON(data, {
      style: function(feature) {
        //设置数据的颜色
        switch (feature.properties.party) {
          case 'Republican':
            return { color: '#ff0000' };
          case 'Democrat':
            return { color: '#0000ff' };
          default:
            break;
        }
      } //设置鼠标悬浮事件
    })
      .on('mouseover', function(e) {
        //解析选中数据的类型名
        let type = e.layer.feature.properties.name;
        //在鼠标悬浮位置添加Popup标注
        // eslint-disable-next-line
        L.popup()
          .setContent(type)
          .setLatLng(e.latlng)
          .openOn(mymap);
      })
      .addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map8' className='map'></div>;
}
