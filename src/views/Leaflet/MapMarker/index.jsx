import React, { useEffect } from 'react';
import './MapMarker.scss';
import iconPng from '@/assets/map/icon.png'; // 引入图标图片

export default function MapMarkerView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map').setView([45, -90], 13);

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
        accessToken:
          'pk.eyJ1Ijoic3Vuc2hpbmUzODgiLCJhIjoiY2w1bTkwYzl2MHJ0cjNncWlvMzA5aGYzeSJ9.uaM3WZCNU2_Cg2yXBi-ilA'
      }
    ).addTo(mymap);

    //标记
    // eslint-disable-next-line
    let Marker = L.marker([45, -90], {
      //添加图标
      // eslint-disable-next-line
      icon: L.icon({
        //图标地址
        iconUrl: iconPng,
        //图标大小
        iconSize: [50, 50]
      }),
      //是否允许鼠标拖动
      draggable: true,
      //添加悬浮名称
      title: '标注'
    }).addTo(mymap);
    //鼠标点击显示Popup
    Marker.on('click', function(e) {
      //添加Popup气泡
      // eslint-disable-next-line
      let popup = L.popup()
        .setLatLng([e.latlng.lat, e.latlng.lng])
        .setContent('<p>Hello world!<br />This is a nice popup.</p>')
        .openOn(mymap);
    });

    //聚合标注图层
    // eslint-disable-next-line
    let markers = L.markerClusterGroup({
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false
    });

    // 添加标注
    function populate() {
      for (let i = 0; i < 100; i++) {
        //生成随机标注
        // eslint-disable-next-line
        let m = L.marker(getRandomLatLng(mymap));
        //添加标注
        markers.addLayer(m);
      }
      return false;
    }

    // // 将聚合的标注连线
    // function populateRandomVector() {
    //   let latlngs = [];
    //   for (let i = 0, len = 20; i < len; i++) {
    //     //创建线要素坐标数组
    //     latlngs.push(getRandomLatLng(mymap));
    //   }
    //   //创建线
    //   // eslint-disable-next-line
    //   let path = new L.Polyline(latlngs);
    //   //添加线
    //   mymap.addLayer(path);
    // }

    // 将聚合的标注连线
    function getRandomLatLng(map) {
      //获取地图范围
      let bounds = map.getBounds(),
        //获取左下角坐标
        southWest = bounds.getSouthWest(),
        //获取右下角坐标
        northEast = bounds.getNorthEast(),
        //获取地图范围的长
        lngSpan = northEast.lng - southWest.lng,
        //获取地图范围的宽
        latSpan = northEast.lat - southWest.lat;

      // eslint-disable-next-line
      return L.latLng(
        //返回任意地图范围内的x坐标
        southWest.lat + latSpan * Math.random(),
        //返回任意地图范围内的y坐标
        southWest.lng + lngSpan * Math.random()
      );
    }

    let polygon;
    //鼠标移动到聚合标注上，将点绘制成多边形
    markers.on('clustermouseover', function(a) {
      if (polygon) {
        //移除绘制的多边形
        mymap.removeLayer(polygon);
      }
      //获取点集
      // eslint-disable-next-line
      polygon = L.polygon(a.layer.getConvexHull());
      //添加多边形
      mymap.addLayer(polygon);
    });

    // 鼠标移出取消绘制多边形
    markers.on('clustermouseout', function(a) {
      if (polygon) {
        //移除多边形
        mymap.removeLayer(polygon);
        polygon = null;
      }
    });

    // Map放大缩小事件
    mymap.on('zoomend', function() {
      if (polygon) {
        //移除多边形
        mymap.removeLayer(polygon);
        polygon = null;
      }
    });

    //添加随机标注
    populate();
    //添加标注
    mymap.addLayer(markers);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
