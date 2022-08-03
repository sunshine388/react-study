import React, { useEffect } from 'react';

//定义地图文档图层和地图
let vectorLayer, map;

export default function Feature16View() {
  const initMap = () => {
    // eslint-disable-next-line
    map = L.map('map16', {
      //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [0, 0],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 1,
      //设置图像范围,
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });
    //矢量图层
    // eslint-disable-next-line
    new Zondy.Map.TDTLayer({
      //图层类型
      layerType: 'vec',
      //最小显示等级
      minZoom: 0,
      //最大显示等级
      maxZoom: 17,
      // 天地图key
      token: 'df06b00c610e0690974f4f5e09737bdd',
      //设置地图不连续显示
      noWrap: true,
      // 图层显示范围
      bounds: [
        [-90, -180],
        [90, 180]
      ]
    }).addTo(map);

    //创建地图文档图层
    // eslint-disable-next-line
    vectorLayer = new Zondy.Map.MapVectorLayer(
      [
        'gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/leafreglayer'
      ],
      {
        //投影坐标系
        // eslint-disable-next-line
        crs: L.CRS.EPSG4326,
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163',
        //只显示一个图层,不平铺显示
        noWrap: true,
        //添加guid，确保图层从IGS中加载，不读取缓存文件
        guid: new Date().getTime().toString()
      }
    ).addTo(map);
    document.getElementById('preview16').style.display = 'none';
  };

  // 根据地图范围随机生成坐标点
  const createPoint = () => {
    //获取最大纬度
    let ymax =
      map.getBounds()._northEast.lat > 90 ? 90 : map.getBounds()._northEast.lat;
    //获取最大经度
    let xmax =
      map.getBounds()._northEast.lng > 180
        ? 180
        : map.getBounds()._northEast.lng;
    //获取最小纬度
    let ymin =
      map.getBounds()._southWest.lat < -90
        ? -90
        : map.getBounds()._southWest.lat;
    //获取最小经度
    let xmin =
      map.getBounds()._southWest.lng < -180
        ? -180
        : map.getBounds()._southWest.lng;
    let w = xmax - xmin;
    let h = ymax - ymin;
    //在地图范围内创建一个点
    let x = Math.random() * w + xmin;
    let y = Math.random() * h + ymin;
    //返回点几何
    // eslint-disable-next-line
    return new Zondy.Object.GPoint(x, y);
  };

  // 添加点要素
  const addRegion = () => {
    //显示进度条
    startPressBar();
    let pointObj = [];
    pointObj[0] = createPoint();
    pointObj[1] = createPoint();
    pointObj[2] = createPoint();
    pointObj[3] = createPoint();
    //设置区要素的几何信息
    //构成区要素的弧段
    // eslint-disable-next-line
    let gArc = new Zondy.Object.Arc(pointObj);
    //构成区要素折线
    // eslint-disable-next-line
    let gAnyLine = new Zondy.Object.AnyLine([gArc]);
    //构成区要素
    // eslint-disable-next-line
    let gRegion = new Zondy.Object.GRegion([gAnyLine]);
    //构成区要素的几何信息
    // eslint-disable-next-line
    let fGeom = new Zondy.Object.FeatureGeometry({ RegGeom: [gRegion] });
    //随机输出1~1502之间的整数
    let fillColor = Math.floor(Math.random() * 1502 + 1);
    //设置区要素的图形参数信息
    // eslint-disable-next-line
    let cRegionInfo = new Zondy.Object.CRegionInfo({
      EndColor: 1,
      FillColor: fillColor,
      FillMode: 0,
      OutPenWidth: 1,
      OverMethod: 0,
      PatAngle: 1,
      PatColor: 1,
      PatHeight: 1,
      PatID: 27,
      PatWidth: 1
    });
    //要素图形参数信息
    // eslint-disable-next-line
    let graphicInfo = new Zondy.Object.WebGraphicsInfo({
      InfoType: 3,
      RegInfo: cRegionInfo
    });
    //设置区要素的属性信息
    let attValue = [0, 12345, 12345, 'esstLake', 'esstLake', 'esstLake'];
    //创建一个新的区要素
    // eslint-disable-next-line
    let newFeature = new Zondy.Object.Feature({
      AttValue: attValue,
      fGeom: fGeom,
      GraphicInfo: graphicInfo
    });
    newFeature.setFType(3);
    //创建一个要素数据集
    // eslint-disable-next-line
    let featureSet = new Zondy.Object.FeatureSet();
    let fldNumber = 6;
    let fldType = ['long', 'double', 'double', 'string', 'string', 'string'];
    let fldName = ['ID', '面积', '周长', 'CNTRY_NAME', 'FIRST_FIRS', 'name'];
    // eslint-disable-next-line
    let cAttValue = new Zondy.Object.CAttStruct({
      FldNumber: fldNumber,
      FldType: fldType,
      FldName: fldName
    });
    featureSet.AttStruct = cAttValue;
    featureSet.addFeature(newFeature);
    //创建一个图层编辑对象
    // eslint-disable-next-line
    let editLayerFeature = new Zondy.Service.EditLayerFeature(
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/leafreglayer',
      {
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163'
      }
    );
    editLayerFeature.add(featureSet, onPloySuccess);
  };
  //添加点要素回调函数
  const onPloySuccess = (rlt) => {
    //停止进度条
    stopPressBar();
    let result = rlt;
    if (result) {
      alert('添加区要素成功！');
      //刷新图层
      vectorLayer.redraw();
    } else {
      alert('添加区要素失败！');
    }
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview16').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview16').style.display = '';
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview16' className='preview'>
          <div className='loading'></div>
          <span>正在添加，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input type='button' value='矢量图层区要素添加' onClick={addRegion} />
        </div>
        <div id='map16' className='map'></div>
      </div>
    </React.Fragment>
  );
}
