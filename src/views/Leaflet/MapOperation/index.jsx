import React, { useEffect, useState } from 'react';
import './MapOperation.scss';

const minZoom = 2;
const maxZoom = 16;

let map = null;
let printer1 = null;
let printer2 = null;

let vectorLayer = null;
let imageLayer = null;

export default function MapOperationView() {
  const [xPosition, setXPosition] = useState(114);
  const [yPosition, setYPosition] = useState(30);
  const [currentZoom, setCurrentZoom] = useState(4);
  const [vectorLayerZIndex, setVectorLayerZIndex] = useState(1);
  const [imageLayerZIndex, setImageLayerZIndex] = useState(1);

  const initMap = () => {
    // eslint-disable-next-line
    map = L.map('mymap', {
      minZoom: minZoom,
      //最大显示等级
      maxZoom: maxZoom,
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    }).setView([0, 0], 4);

    // eslint-disable-next-line

    //创建天地图矢量图层
    // eslint-disable-next-line
    vectorLayer = L.tileLayer(
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
    //添加天地图影像图层
    // eslint-disable-next-line
    imageLayer = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
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

    map.on('zoomend', function(e) {
      setCurrentZoom(e.target.getZoom());
    });

    // eslint-disable-next-line
    printer1 = L.easyPrint({
      //设置要打印的图层
      tileLayer: vectorLayer,
      //出图模式，包括：按当前显示出图、按A4横版出图、按A4竖版出图
      sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
      //图片名称
      filename: 'myMap',
      //如果输出为本地图片，需设置为true
      exportOnly: true,
      //出图时是否隐藏控件（比如缩放控件、出图控件等）
      hideControlContainer: true
    }).addTo(map);
    // eslint-disable-next-line
    printer2 = L.easyPrint({
      //设置要打印的图层
      tileLayer: imageLayer,
      //出图模式，包括：按当前显示出图、按A4横版出图、按A4竖版出图
      sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
      //设置为false，会显示打印对话框，选择输出为pdf文件
      exportOnly: false,
      //出图时是否隐藏控件（比如缩放控件、出图控件等）
      hideControlContainer: true
    }).addTo(map);

    // eslint-disable-next-line
    let tiles = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3Vuc2hpbmUzODgiLCJhIjoiY2w1bTkwYzl2MHJ0cjNncWlvMzA5aGYzeSJ9.uaM3WZCNU2_Cg2yXBi-ilA',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        bounds: [
          [-90, -180],
          [90, 180]
        ],
        accessToken:
          'pk.eyJ1Ijoic3Vuc2hpbmUzODgiLCJhIjoiY2w1bTkwYzl2MHJ0cjNncWlvMzA5aGYzeSJ9.uaM3WZCNU2_Cg2yXBi-ilA'
      }
    );
    //添加放大镜
    // eslint-disable-next-line
    L.magnifyingGlass({
      //设置放大镜中显示的图层
      layers: [tiles],
      //探查半径
      radius: 100,
      //设置放大镜中图层级数和主图层的级数差（0表示同级）
      zoomOffset: 0
    }).addTo(map);

    //添加透明度滑动控件
    // eslint-disable-next-line
    let opacitySlider = new L.Control.opacitySlider().addTo(map);
    //设置要修改透明度的图层
    opacitySlider.setOpacityLayer(imageLayer);
    //设置初始透明度,取值0-1
    imageLayer.setOpacity(0.5);
  };

  // 平移地图
  const mapMove = () => {
    //判断坐标值是否输入
    if (xPosition && yPosition) {
      if (!isNaN(xPosition) && !isNaN(yPosition)) {
        //字符串转数字
        let pntX = parseInt(xPosition);
        let pntY = parseInt(yPosition);
        //注意leaflet是用纬经度来表示位置
        let coordinate = [pntY, pntX];
        //平移视图位置，并设置显示级数
        map.setView(coordinate, map.getZoom());
      } else {
        alert('请输入数字！');
        return;
      }
    } else {
      alert('请输入内容！');
      return;
    }
  };

  // 复位地图
  const restore = () => {
    //将地图恢复至初始位置状态
    map.setView([0, 0], 4);
  };

  // 放大1级
  const zoomIn = () => {
    map.setView(map.getCenter(), map.getZoom() + 1);
  };

  // 缩小1级
  const zoomOut = () => {
    map.setView(map.getCenter(), map.getZoom() - 1);
  };

  // 获取当前地图逻辑范围
  const getCurBound = () => {
    //获取地图视图的经纬度边界
    let ex = map.getBounds();
    let ymin = ex._southWest.lat;
    let xmin = ex._southWest.lng;
    let ymax = ex._northEast.lat;
    let xmax = ex._northEast.lng;
    //得到经纬度范围
    let str = '纬度：' + ymin + '至' + ymax + '；经度：' + xmin + '至' + xmax;
    //弹框显示地图范围
    alert('当前地图范围：' + str);
  };

  // 获取当前视窗范围
  const getMapDivInfo = () => {
    //获取当前地图容器div的大小
    let mapSize = map.getSize();
    //弹框显示视窗范围
    alert('当前div高：' + mapSize.y + '，宽：' + mapSize.x);
  };

  const outToPNG = () => {
    //按当前显示，将地图输出为图片
    printer1.printMap('CurrentSize', 'myMap');
  };

  const outToPDF = () => {
    //按当前显示，将地图输出为PDF
    printer2.printMap('A4Portrait', 'myPDF');
  };

  // 改变矢量图层的z-index
  const changeVectorLayerIndex = (e) => {
    setVectorLayerZIndex(Number(e.target.value));
    vectorLayer.setZIndex(Number(e.target.value));
  };

  // 改变影像图层的z-index
  const changeImageLayerIndex = (e) => {
    setImageLayerZIndex(Number(e.target.value));
    imageLayer.setZIndex(Number(e.target.value));
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map-btn'>
        <label>X坐标</label>
        <input
          id='xPosition'
          type='text'
          value={xPosition}
          onChange={(event) => {
            setXPosition(event.target.value);
          }}
        />

        <label>Y坐标</label>
        <input
          id='yPposition'
          type='text'
          value={yPosition}
          onChange={(event) => {
            setYPosition(event.target.value);
          }}
        />

        <button onClick={mapMove}>平移</button>
        <button onClick={restore}>复位</button>
        <button onClick={getCurBound}>当前地图范围</button>
        <button onClick={getMapDivInfo}>当前视口范围</button>
        <button onClick={outToPNG}>下载PNG</button>
        <button onClick={outToPDF}>下载PDF</button>
      </div>
      <div className='map-btn'>
        <label>当前zoom: {currentZoom}&nbsp;</label>
        <label>minZoom: {minZoom}&nbsp;</label>
        <label>maxZoom: {maxZoom}&nbsp;</label>
        <button onClick={zoomIn}>放大</button>
        <button onClick={zoomOut}>缩小</button>
      </div>
      <div className='map-btn'>
        <label>矢量图层 Z-index：</label>
        <input
          type='number'
          id='vecLayer'
          value={vectorLayerZIndex}
          min='1'
          max='100'
          onChange={changeVectorLayerIndex}
        />
        <label>影像图层 Z-index：</label>
        <input
          type='number'
          id='imgLayer'
          value={imageLayerZIndex}
          min='1'
          max='100'
          onChange={changeImageLayerIndex}
        />
      </div>
      <div id='mymap'></div>
    </React.Fragment>
  );
}
