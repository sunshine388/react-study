import React, { useEffect } from 'react';

export default function WFSView() {
  const initMap = () => {
    // eslint-disable-next-line
    let map = L.map('map11', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [0, 0],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 2,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });
    //添加鼠标位置控件
    // eslint-disable-next-line
    L.control.mousePosition().addTo(map);
    //瓦片地图，JWWORLDTILE为IGServer上发布的瓦片服务名称
    // eslint-disable-next-line
    let layer = new Zondy.Map.MapTileLayer('JWWORLDTILE', {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //设置地图不连续显示
      noWrap: true
    }).addTo(map);
    //WFS服务地址
    let baseurl =
      'http://develop.smaryun.com:6163/igs/rest/ogc/doc/WorldJWVector/WFSServer?REQUEST=GetFeature&version=1.1.0&service=wfs&typename=WorldJWVector:主要城市&maxfeatures=60';
    //通过一般处理程序解决跨域
    let url = 'ZDproxy.ashx?url=' + baseurl;
    //发送Ajax请求获取数据
    // eslint-disable-next-line
    $.ajax({
      type: 'get',
      url: url,
      dataType: 'xml',
      contentType: 'application/x-www-form-urlencoded',
      success: function(result) {
        //解析数据
        if (result.children[0].children.length > 0) {
          for (
            let datalength = 0;
            datalength < result.children[0].children[0].children.length;
            datalength++
          ) {
            let data = result.children[0].children[0].children[
              datalength
            ].children[0].children[0].children[0].textContent.split(' ');
            //添加标记
            // eslint-disable-next-line
            L.marker([Number(data[1]), Number(data[0])], {
              //添加悬浮名称
              title:
                result.children[0].children[0].children[datalength].children[11]
                  .innerHTML
            }).addTo(map);
          }
        }
      },
      error: function() {
        alert('请求WFS服务失败');
      }
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map11' className='map'></div>;
}
