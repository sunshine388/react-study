import React, { useEffect } from 'react';
import './OtherGraphics.scss';
import iconPng from '@/assets/map/icon.png'; // 引入图标图片

export default function OtherGraphicsView() {
  const initMap = () => {
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
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ],
        accessToken:
          'pk.eyJ1Ijoic3Vuc2hpbmUzODgiLCJhIjoiY2w1bTkwYzl2MHJ0cjNncWlvMzA5aGYzeSJ9.uaM3WZCNU2_Cg2yXBi-ilA'
      }
    ).addTo(map);

    //绘制图层
    // eslint-disable-next-line
    let drawnItems = new L.FeatureGroup(); //添加绘制图层
    map.addLayer(drawnItems);

    //绘制线
    // eslint-disable-next-line
    let arrow = L.polyline(
      [
        [15, -65],
        [20, -45]
      ],
      {
        //颜色
        color: 'red'
      }
    ).addTo(drawnItems);

    //添加箭头
    // eslint-disable-next-line
    L.polylineDecorator(arrow, {
      //添加模式
      patterns: [
        {
          //模式符号的偏移位置
          offset: '100%',
          //模式符号的重复间隔
          repeat: 0,
          //符号实例
          // eslint-disable-next-line
          symbol: L.Symbol.arrowHead({
            //符号大小
            pixelSize: 15,
            //符号样式
            pathOptions: {
              //是否显示边线
              stroke: true
            }
          })
        }
      ]
    }).addTo(drawnItems);

    //绘制连线矩形
    // eslint-disable-next-line
    let polygon = L.polygon(
      [
        [0, -90],
        [10, -90],
        [10, -70],
        [0, -70],
        [0, -90],
        [20, -90],
        [30, -90],
        [30, -70],
        [20, -70],
        [20, -90]
      ],
      {
        //线颜色
        color: '#ff7800',
        //线宽
        weight: 1
      }
    ).addTo(map);
    // eslint-disable-next-line
    L.polylineDecorator(polygon, {
      //添加模式
      patterns: [
        {
          //模式符号的偏移位置
          offset: 0,
          //模式符号的重复间隔
          repeat: 10,
          //符号实例
          // eslint-disable-next-line
          symbol: L.Symbol.dash({
            //符号大小
            pixelSize: 0
          })
        }
      ]
    }).addTo(drawnItems);

    //绘制虚线矩形
    // eslint-disable-next-line
    L.polylineDecorator(
      [
        [0, -60],
        [10, -60],
        [10, -40],
        [0, -40],
        [0, -60]
      ],
      {
        //添加模式
        patterns: [
          {
            //模式符号的偏移位置
            offset: 12,
            //模式符号的重复间隔
            repeat: 25,
            //符号实例
            // eslint-disable-next-line
            symbol: L.Symbol.dash({
              //符号大小
              pixelSize: 10,
              //符号样式
              pathOptions: {
                //颜色
                color: '#f00',
                //线宽
                weight: 2
              }
            })
          },
          {
            //模式符号的偏移位置
            offset: 0,
            //模式符号的重复间隔
            repeat: 25,
            //符号实例
            // eslint-disable-next-line
            symbol: L.Symbol.dash({
              //符号大小
              pixelSize: 0
            })
          }
        ]
      }
    ).addTo(drawnItems);

    //添加线
    // eslint-disable-next-line
    let markerLine = L.polyline(
      [
        [-10, -70],
        [0, -55],
        [-20, -45],
        [0, -75]
      ],
      {}
    ).addTo(map);
    //在线上添加标注
    // eslint-disable-next-line
    L.polylineDecorator(markerLine, {
      //添加模式
      patterns: [
        {
          //模式符号的偏移位置
          offset: '5%',
          //模式符号的重复间隔
          repeat: '10%',
          //符号实例
          // eslint-disable-next-line
          symbol: L.Symbol.marker()
        }
      ]
    }).addTo(drawnItems);

    //矩形框上添加图片
    // eslint-disable-next-line
    L.polylineDecorator(
      [
        [-20, -90],
        [-10, -90],
        [0, -80],
        [-10, -70],
        [-20, -70],
        [-20, -90]
      ],
      {
        //添加模式
        patterns: [
          {
            //模式符号的偏移位置
            offset: 0,
            //模式符号的重复间隔
            repeat: 10,
            //符号实例
            // eslint-disable-next-line
            symbol: L.Symbol.dash({
              //符号大小
              pixelSize: 5,
              //符号样式
              pathOptions: {
                //颜色
                color: '#000',
                //线宽
                weight: 1,
                //透明度
                opacity: 0.2
              }
            })
          },
          {
            //模式符号的偏移位置
            offset: '0%',
            //模式符号的重复间隔
            repeat: '20%',
            //符号实例
            // eslint-disable-next-line
            symbol: L.Symbol.marker({
              //是否允许旋转
              rotate: true,
              //标记显示样式
              markerOptions: {
                //图标
                // eslint-disable-next-line
                icon: L.icon({
                  //图标地址
                  iconUrl: iconPng,
                  //图标位置
                  iconAnchor: [16, 16]
                })
              }
            })
          }
        ]
      }
    ).addTo(drawnItems);

    //线要素点集
    let multiCoords1 = [
      [
        [-27.5468, -70.791],
        [-28.8068, -70.1318],
        [-29.1242, -69.6699],
        [-29.4966, -67.2958],
        [-11.4266, -68.8564],
        [-11.7542, -68.1093]
      ],
      [
        [-28.0193, -72.8125],
        [-26.3165, -72.8564],
        [-24.9336, -71.0107],
        [-24.5278, -69.582],
        [-24.8714, -67.7353],
        [-25.8287, -65.1855],
        [-28.1953, -65.1416]
      ],
      [
        [-25.9205, -70.4394],
        [-26.7699, -70.9228],
        [-27.6061, -68.5488],
        [-27.754, -67.3837]
      ]
    ];
    let plArray = [];
    for (let i = 0; i < multiCoords1.length; i++) {
      //添加线
      // eslint-disable-next-line
      plArray.push(L.polyline(multiCoords1[i]).addTo(drawnItems));
    }
    //添加线上显示样式
    // eslint-disable-next-line
    L.polylineDecorator(multiCoords1, {
      //添加模式
      patterns: [
        {
          //模式符号的偏移位置
          offset: 25,
          //模式符号的重复间隔
          repeat: 50,
          //符号实例
          // eslint-disable-next-line
          symbol: L.Symbol.arrowHead({
            //符号大小
            pixelSize: 15,
            //符号样式
            pathOptions: {
              //填充色透明度
              fillOpacity: 1,
              //线宽
              weight: 0
            }
          })
        }
      ]
    }).addTo(drawnItems);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map'></div>;
}
