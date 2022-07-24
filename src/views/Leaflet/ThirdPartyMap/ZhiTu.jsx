import React, { useEffect } from 'react';

export default function ZhiTuView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map12', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [40, 116.3],
      //最小显示等级
      minZoom: 0,
      //最大显示等级
      maxZoom: 16,
      //当前显示等级
      zoom: 12,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    //添加地图
    // eslint-disable-next-line
    let normalMap = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
      //最大级数
      maxZoom: 16,
      //最小级数
      minZoom: 0
    });
    //添加藏蓝图
    // eslint-disable-next-line
    let PurplishBlueMap = L.tileLayer.chinaProvider(
      'Geoq.Normal.PurplishBlue',
      {
        //最大级数
        maxZoom: 16,
        //最小级数
        minZoom: 0
      }
    );
    //添加灰色图
    // eslint-disable-next-line
    let GrayMap = L.tileLayer.chinaProvider('Geoq.Normal.Gray', {
      //最大级数
      maxZoom: 16,
      //最小级数
      minZoom: 0
    });
    //添加暖色图
    // eslint-disable-next-line
    let WarmMap = L.tileLayer.chinaProvider('Geoq.Normal.Warm', {
      maxZoom: 16,
      minZoom: 0
    });
    //设置图层组
    let baseLayers = {
      地图: normalMap,
      藏蓝: PurplishBlueMap,
      灰色: GrayMap,
      暖色: WarmMap
    };
    //初始时加载无色地图
    mymap.addLayer(normalMap);
    //添加图层组控件
    // eslint-disable-next-line
    L.control.layers(baseLayers).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map12' className='map'></div>;
}
