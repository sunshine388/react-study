import React, { useEffect } from 'react';

export default function WFSView() {
  const initMap = () => {
    // eslint-disable-next-line
    let map = L.map('map3', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [50, -180],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 5,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    //添加天地图矢量图层
    // eslint-disable-next-line
    L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
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
    //添加天地图矢量注记
    // eslint-disable-next-line
    L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    ).addTo(map);

    //添加WFS服务图层,显示边界
    // eslint-disable-next-line
    new L.WFS({
      //WFS服务地址
      url: 'http://geoserver.ics.perm.ru/geoserver/wfs',
      //类别命名空间
      typeNS: 'topp',
      //类别名称
      typeName: 'tasmania_state_boundaries',
      //参照系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //几何
      geometryField: 'the_geom',
      //绘制样式
      style: {
        color: 'blue',
        weight: 2
      }
    }).addTo(map);
    //添加WFS服务图层,显示城市点
    // eslint-disable-next-line
    let cities = new L.WFS({
      //WFS服务地址
      url: 'http://geoserver.ics.perm.ru/geoserver/wfs',
      //类别命名空间
      typeNS: 'topp',
      //类别名称
      typeName: 'tasmania_cities',
      //参照系
    // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //几何
      geometryField: 'the_geom'
    }).addTo(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map3' className='map'></div>;
}
