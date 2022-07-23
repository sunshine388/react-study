import React, { useEffect } from 'react';
import './DrawGraphics.scss';

export default function DrawGraphicsView() {
  const initMap = () => {
    //地图容器
    // eslint-disable-next-line
    let map = L.map('map', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //显示中心
      center: [0, -90],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 3,
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
    ).addTo(map);
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

    // eslint-disable-next-line
    let drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    //添加绘制控件
    // eslint-disable-next-line
    let drawControl = new L.Control.Draw({
      draw: {
        //绘制线
        polyline: true,
        //绘制多边形
        polygon: true,
        //绘制矩形
        rectangle: true,
        //绘制圆
        circle: true,
        //绘制标注
        marker: true,
        //绘制圆形标注
        circlemarker: true
      },
      edit: {
        //绘制图层
        featureGroup: drawnItems,
        //图形编辑控件
        edit: true,
        //图形删除控件
        remove: true
      }
    });
    //添加绘制控件
    map.addControl(drawControl);
    //绘制事件
    // eslint-disable-next-line
    map.on(L.Draw.Event.CREATED, function(e) {
      //获取绘制图形类型
      let type = e.layerType,
        //获取绘制图层
        drawlayer = e.layer;
      if (type === 'marker') {
        //显示Popup
        drawlayer.bindPopup('A popup!');
      }
      //显示图层
      drawnItems.addLayer(drawlayer);
      //几何信息字符串
      let latlngsStr = '';
      //获取线几何信息
      if (type === 'polyline') {
        if (drawlayer.editing.latlngs[0].length > 0) {
          for (
            let latlngslength = 0;
            latlngslength < drawlayer.editing.latlngs[0].length;
            latlngslength++
          ) {
            //获取几何信息
            latlngsStr +=
              '<font>' +
              drawlayer.editing.latlngs[0][latlngslength].lat +
              ',' +
              drawlayer.editing.latlngs[0][latlngslength].lng +
              '</font><br>';
          }
        }
      }
      //获取多边形几何信息
      else if (type === 'polygon') {
        if (drawlayer._latlngs[0].length > 0) {
          for (
            let latlngslength = 0;
            latlngslength < drawlayer._latlngs[0].length;
            latlngslength++
          ) {
            //获取几何信息
            latlngsStr +=
              '<font>' +
              drawlayer._latlngs[0][latlngslength].lat +
              ',' +
              drawlayer._latlngs[0][latlngslength].lng +
              '</font><br>';
          }
        }
      }
      //获取矩形几何信息
      else if (type === 'rectangle') {
        if (drawlayer._latlngs[0].length) {
          for (
            let latlngslength = 0;
            latlngslength < drawlayer._latlngs[0].length;
            latlngslength++
          ) {
            //获取几何信息
            latlngsStr +=
              '<font>' +
              drawlayer._latlngs[0][latlngslength].lat +
              ',' +
              drawlayer._latlngs[0][latlngslength].lng +
              '</font><br>';
          }
        }
      }
      //获取圆几何信息
      else if (type === 'circle') {
        if (drawlayer._radius > 0) {
          //获取几何信息
          latlngsStr +=
            '<font>圆心坐标：' +
            drawlayer._latlng.lat +
            ',' +
            drawlayer._latlng.lng +
            '</font><br>' +
            '<font>半径：' +
            drawlayer._radius +
            '</font>';
        }
      }
      //获取标记几何信息
      else if (type === 'marker') {
        if (
          drawlayer._latlng !== '' &&
          drawlayer._latlng !== null &&
          drawlayer._latlng !== undefined
        ) {
          //获取几何信息
          latlngsStr +=
            '<font>' +
            drawlayer._latlng.lat +
            ',' +
            drawlayer._latlng.lng +
            '</font><br>';
        }
      }
      //获取圆标记几何信息
      else if (type === 'circlemarker') {
        if (
          drawlayer._latlng !== '' &&
          drawlayer._latlng !== null &&
          drawlayer._latlng !== undefined
        ) {
          //获取几何信息
          latlngsStr +=
            '<font>' +
            drawlayer._latlng.lat +
            ',' +
            drawlayer._latlng.lng +
            '</font><br>';
        }
      }
      //显示信息
      document.getElementById('result').innerHTML = latlngsStr;
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='map'></div>
        <div id='info' className='info_box'>
          <p>图形几何信息如下：</p>
          <div id='result' className='info_result'></div>
        </div>
      </div>
    </React.Fragment>
  );
}
