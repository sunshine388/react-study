import React, { useEffect } from 'react';

export default function GoogleOfflineView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map8', {
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

    //矢量图层
    // eslint-disable-next-line
    let layer1 = L.tileLayer(
      'http://develop.smaryun.com:6163/igs/rest/cts/google/vector/{x}/{y}/{z}',
      {
        //设置地图不连续显示
        noWrap: true
      }
    ).addTo(mymap);
    //影像图层
    // eslint-disable-next-line
    let layer2 = L.tileLayer(
      'http://develop.smaryun.com:6163/igs/rest/cts/google/raster/{x}/{y}/{z}',
      {
        //设置地图不连续显示
        noWrap: true
      }
    );
    //道路及地名图层
    // eslint-disable-next-line
    let layer3 = L.tileLayer(
      'http://develop.smaryun.com:6163/igs/rest/cts/google/road/{x}/{y}/{z}',
      {
        //设置地图不连续显示
        noWrap: true
      }
    );
    //地形图层
    // eslint-disable-next-line
    let layer4 = L.tileLayer(
      'http://develop.smaryun.com:6163/igs/rest/cts/google/terrain/{x}/{y}/{z}',
      {
        //设置地图不连续显示
        noWrap: true
      }
    );
    //基础图层
    let vec = {
      矢量图层: layer1
    };
    //图层列表
    let img = {
      地形图层: layer4,
      影像图层: layer2,
      道路及地名图层: layer3
    };
    //图层控制显示地图
    // eslint-disable-next-line
    L.control.layers(vec, img).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map8' className='map'></div>;
}
