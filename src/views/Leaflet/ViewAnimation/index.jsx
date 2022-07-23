import React, { useEffect } from 'react';
import './ViewAnimation.scss';

export default function ViewAnimationView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map').setView([0, -90], 3);

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

    // 要素动画
    // eslint-disable-next-line
    let marker = L.marker([0, -60], {
      // 设置标注样式
      // eslint-disable-next-line
      icon: L.icon.pulse({
        //标记扩散半径
        iconSize: [30, 30],
        //显示颜色
        color: 'red'
      })
    }).addTo(mymap);

    // 要素移动
    // 标注点
    let parisKievLL = [
      [-2.8567, -92.3508],
      [0.45, -60.523333]
    ];
    //标注动画轨迹
    let londonParisRomeBerlinBucarest = [
      [1.507222, -90.1275],
      [-2.8567, -88.3508],
      [-9.9, -78.5],
      [2.516667, -77.383333],
      [-6.4166, -64.1]
    ];
    //标注动画轨迹
    let londonBrusselFrankfurtAmsterdamLondon = [
      [1.507222, -90.1275],
      [0.85, -86.35],
      [0.116667, -82.683333],
      [2.366667, -86.9],
      [1.507222, -90.1275]
    ];
    //标注动画轨迹
    let barcelonePerpignanPauBordeauxMarseilleMonaco = [
      [-9.385064, -88.173403],
      [-8.698611, -88.895556],
      [-7.3017, -90.3686],
      [-6.837912, -90.579541],
      [-7.296346, -85.369889],
      [-7.738418, -83.424616]
    ];
    //添加标注循环移动
    mymap.fitBounds(londonParisRomeBerlinBucarest);
    //添加定时标注移动
    // eslint-disable-next-line
    let marker1 = L.Marker.movingMarker(parisKievLL, [10000]).addTo(mymap);
    //添加标注
    // eslint-disable-next-line
    L.polyline(parisKievLL).addTo(mymap);
    //标注点击移动
    marker1.once('click', function() {
      //开始标注移动
      marker1.start();
      //关闭Popup框
      marker1.closePopup();
      //添加Popup
      marker1.unbindPopup();
      //标注点击事件
      marker1.on('click', function() {
        if (marker1.isRunning()) {
          //标注移动暂停
          marker1.pause();
        } else {
          //标注移动开始
          marker1.start();
        }
      });
      //延时事件
      setTimeout(function() {
        //2秒显示一次Popup
        marker1.bindPopup('<b>Click me to pause !</b>').openPopup();
      }, 2000);
    });
    //标注Popup弹框
    marker1
      .bindPopup('<b>Click me to start !</b>', { closeOnClick: false })
      .openPopup();
    //分段速度标注动画
    // eslint-disable-next-line
    let marker2 = L.Marker.movingMarker(
      londonParisRomeBerlinBucarest,
      [3000, 9000, 9000, 4000],
      { autostart: true }
    ).addTo(mymap);
    //添加标注
    // eslint-disable-next-line
    L.polyline(londonParisRomeBerlinBucarest, { color: 'red' }).addTo(mymap);
    //标注动画结束事件
    marker2.on('end', function() {
      //添加标注
      marker2
        .bindPopup('<b>Welcome to Bucarest !</b>', {
          //是否单击地图时覆盖关闭弹出窗口
          closeOnClick: false
        })
        .openPopup();
    });
    //添加标注
    // eslint-disable-next-line
    let marker3 = L.Marker.movingMarker(
      londonBrusselFrankfurtAmsterdamLondon,
      [2000, 2000, 2000, 2000],
      {
        //是否自动开始标注移动
        autostart: true,
        //在添加折线时自动开始移动
        loop: true
      }
    ).addTo(mymap);
    //标注移动圈数
    marker3.loops = 0;
    //Popup标注
    marker3.bindPopup('', {
      //是否单击地图时覆盖关闭弹出窗口
      closeOnClick: false
    });
    //添加标注
    // eslint-disable-next-line
    let marker4 = L.Marker.movingMarker([[-5.816667, -75.983333]], []).addTo(
      mymap
    );
    //标注运动事件
    marker3.on('loop', function(e) {
      //标注移动圈数计算
      marker3.loops++;
      if (e.elapsedTime < 50) {
        //设置显示内容
        marker3.getPopup().setContent('<b>Loop: ' + marker3.loops + '</b>');
        //显示Popup
        marker3.openPopup();
        //延时事件
        setTimeout(function() {
          //关闭标注
          marker3.closePopup();
          //判断标注是否结束显示
          if (!marker1.isEnded()) {
            //显示Popup
            marker1.openPopup();
          } else {
            //判断标记位置
            if (marker4.getLatLng().equals([-5.816667, -75.983333])) {
              //设置Popup
              marker4.bindPopup('Click on the map to move me !');
              //显示Popup
              marker4.openPopup();
            }
          }
        }, 2000);
      }
    });
    //鼠标点击获取位置，标注向点击位置移动
    mymap.on('click', function(e) {
      //根据鼠标点击位置移动
      marker4.moveTo(e.latlng, 2000);
    });
    //标注动画停顿
    // eslint-disable-next-line
    let marker5 = L.Marker.movingMarker(
      barcelonePerpignanPauBordeauxMarseilleMonaco,
      10000,
      {
        //设置自动开始
        autostart: true
      }
    ).addTo(mymap);
    //停留在多线折点上2秒
    marker5.addStation(1, 2000);
    //停留在多线折点上2秒
    marker5.addStation(2, 2000);
    //停留在多线折点上2秒
    marker5.addStation(3, 2000);
    //停留在多线折点上2秒
    marker5.addStation(4, 2000);
    //添加线
    // eslint-disable-next-line
    L.polyline(barcelonePerpignanPauBordeauxMarseilleMonaco, {
      //颜色
      color: 'green'
    }).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
