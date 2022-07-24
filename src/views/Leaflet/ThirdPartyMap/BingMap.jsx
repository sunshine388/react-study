import React, { useEffect } from 'react';

export default function BingMapView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map1', {
      //参考坐标系
      // eslint-disable-next-line no-undef
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

    //设置bing地图的key
    let BING_KEY =
      'Q57tupj2UBsQNQdju4xL~xBceblfTd6icjljunbuaCw~AhwA-whmGMsfIpVhslZyknWhFYq-GvWJZqBnqV8Zq1uRlI5YM_qr7_hxvdgnU7nH';
    //加载Bing地图
    // eslint-disable-next-line
    let bingLayer = L.tileLayer.bing(BING_KEY).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map1' className='map'></div>;
}
