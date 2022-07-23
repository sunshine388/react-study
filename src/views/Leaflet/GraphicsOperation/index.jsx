import React, { useEffect } from 'react';
import './GraphicsOperation.scss';

export default function GraphicsOperationView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //显示中心
      center: [0, 0],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 1,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    // eslint-disable-next-line
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3Vuc2hpbmUzODgiLCJhIjoiY2w1bTkwYzl2MHJ0cjNncWlvMzA5aGYzeSJ9.uaM3WZCNU2_Cg2yXBi-ilA',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [[-90, -180], [90, 180]],
        accessToken:
          'pk.eyJ1Ijoic3Vuc2hpbmUzODgiLCJhIjoiY2w1bTkwYzl2MHJ0cjNncWlvMzA5aGYzeSJ9.uaM3WZCNU2_Cg2yXBi-ilA'
      }
    ).addTo(mymap);

    //绘制圆，leaflet无绘制点功能，可用绘制圆或者标记功能代替
    // eslint-disable-next-line
    L.circle([80, -160], {
      radius: 100000,
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 1
    }).addTo(mymap);

    //线坐标数组
    let latlngs = [
      [60, -140],
      [45, -80]
    ];
    //绘制线
    // eslint-disable-next-line
    L.polyline(latlngs, { color: 'red' }).addTo(mymap);

    //设置圆心坐标
    // eslint-disable-next-line
    let latLng = L.latLng(70, -90);
    //添加矢量图层，将圆圈添加进图层
    // eslint-disable-next-line
    L.circle(latLng, {
      //圆半径
      radius: 1000000,
      //颜色
      color: 'red',
      //填充色
      fillColor: '#F9F7F4',
      //填充色透明度
      fillOpacity: 0.8
    }).addTo(mymap);

    //创建矩形的地理边界
    let bounds = [
      [40, -170],
      [20, -140]
    ];
    //将创建的矩形添加进图层
    // eslint-disable-next-line
    L.rectangle(bounds, {
      //颜色
      color: '#ff7800',
      //线宽
      weight: 1,
      //填充色透明度
      fillOpacity: 0.5
    }).addTo(mymap);

    //创建一个多边形
    let latlngs1 = [
      [0, -90],
      [10, -90],
      [10, -70],
      [5, -70],
      [-10, -80],
      [0, -90]
    ];
    //将创建的多边形加载进图层
    // eslint-disable-next-line
    L.polygon(latlngs1, {
      //颜色
      color: 'red'
    }).addTo(mymap);

    // 图形样式编辑
    //绘制图层
    // eslint-disable-next-line
    let drawnItems = new L.FeatureGroup(); //线坐标数组
    //添加线
    // eslint-disable-next-line
    L.polyline(
      [
        [-10, 60],
        [-20, 45]
      ],
      {
        //线颜色
        color: 'red'
      }
    ).addTo(drawnItems);
    //将创建的多边形加载进图层
    // eslint-disable-next-line
    L.polygon(
      [
        [0, 90],
        [-10, 90],
        [-10, 70],
        [0, 70],
        [0, 90]
      ],
      {
        //多边形颜色
        color: 'red'
      }
    ).addTo(drawnItems);
    //添加绘制图层
    mymap.addLayer(drawnItems);
    //样式设计
    let options = {
      //是否显示边界
      stroke: true,
      //颜色
      color: 'green',
      //线宽
      weight: 3,
      //透明度
      opacity: 1,
      //绘制结束时使用的线形状
      lineCap: 'arrow',
      //在绘制图形的各个拐角使用的线形状
      lineJoin: 'arrow'
    };
    //修改样式
    drawnItems.getLayers()[0].setStyle(options);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
