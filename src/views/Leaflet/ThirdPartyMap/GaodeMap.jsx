import React, { useEffect } from 'react';

export default function GaodeMapView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map11', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [40, 116.3],
      //最小显示等级
      minZoom: 3,
      //最大显示等级
      maxZoom: 17,
      //当前显示等级
      zoom: 12,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    //添加高德地图矢量图层
    // eslint-disable-next-line
    let vectorMap = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
      //最大级数
      maxZoom: 17,
      //最小级数
      minZoom: 3
    });
    //添加高德地图影像图层
    // eslint-disable-next-line
    let satelliteMap = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
      //最大级数
      maxZoom: 17,
      //最小级数
      minZoom: 3
    });
    //添加高德地图影像注记
    // eslint-disable-next-line
    let satelliteAnnotion = L.tileLayer.chinaProvider(
      'GaoDe.Satellite.Annotion',
      {
        //最大级数
        maxZoom: 17,
        //最小级数
        minZoom: 3
      }
    );
    //设置影像图层组
    // eslint-disable-next-line
    let imageMap = L.layerGroup([satelliteMap, satelliteAnnotion]);
    //设置图层组
    let baseLayers = {
      矢量: vectorMap,
      影像: imageMap
    };
    //初始时加载矢量图层组
    mymap.addLayer(vectorMap);
    //添加图层组控件
    // eslint-disable-next-line
    L.control.layers(baseLayers).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map11' className='map'></div>;
}
