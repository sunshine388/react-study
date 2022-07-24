import React, { useEffect } from 'react';

export default function BaiduMapView() {
  const initMap = () => {
    //设置投影参照系
    // eslint-disable-next-line
    let crs = new L.Proj.CRS(
      'EPSG:900913',
      '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
      {
        //设置分辨率
        resolutions: (function() {
          //定义分辨率数组
          let res = [];
          res[0] = Math.pow(2, 18);
          for (let i = 1; i < 19; i++) {
            res[i] = Math.pow(2, 18 - i);
          }
          //返回分辨率结果
          return res;
        })(),
        //设置原点
        origin: [0, 0],
        //设置范围
        // eslint-disable-next-line
        bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
      }
    );
    // eslint-disable-next-line
    let mymap = L.map('map5', {
      //设置参照系
      crs: crs,
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [39.915, 116.404],
      //最小显示等级
      minZoom: 3,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 15
    });
    //加载百度地图
    // eslint-disable-next-line
    new L.TileLayer(
      'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20150518',
      {
        //最大显示等级
        maxZoom: 18,
        //最小显示等级
        minZoom: 3,
        //子域
        subdomains: [0, 1, 2],
        //设置为tms
        tms: true
      }
    ).addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map5' className='map'></div>;
}
