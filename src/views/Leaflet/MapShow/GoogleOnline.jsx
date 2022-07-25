import React, { useEffect } from 'react';

export default function GoogleOnlineView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map7', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //显示中心
      center: [45, -90],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 15,
      //当前显示等级
      zoom: 2
    });

    //瓦片地址格式
    // eslint-disable-next-line
    let layer0 = L.tileLayer(
      'http://mt2.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
      {
        //设置地图不连续显示
        noWrap: true
      }
    );
    //地形图
    // eslint-disable-next-line
    let layer1 = L.tileLayer(
      'http://mt0.google.cn/vt/lyrs=t&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
      {
        //设置地图不连续显示
        noWrap: true
      }
    );
    //影像+注记
    // eslint-disable-next-line
    let layer2 = L.tileLayer(
      'http://mt1.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
      {
        //设置地图不连续显示
        noWrap: true
      }
    );
    //矢量+注记
    // eslint-disable-next-line
    let layer3 = L.tileLayer(
      'http://mt2.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
      {
        //设置地图不连续显示
        noWrap: true
      }
    ).addTo(mymap);
    //影像图
    // eslint-disable-next-line
    let layer4 = L.tileLayer(
      'http://mt3.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
      {
        //设置地图不连续显示
        noWrap: true
      }
    );
    //基础图层
    let vec = {
      '矢量+注记': layer3
    };
    //图层列表
    let img = {
      地形图: layer1,
      影像图层: layer4,
      '影像+注记': layer2
    };
    //图层控制显示地图
    // eslint-disable-next-line
    L.control.layers(vec, img).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map7' className='map'></div>;
}
