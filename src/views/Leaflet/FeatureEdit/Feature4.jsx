import React, { useEffect } from 'react';

//定义地图文档图层和地图
let mapDocLayer, map;
//地图文档guid
let guid;

export default function Feature4View() {
  const initMap = () => {
    //随机生成一个guid
    guid = Math.floor(Math.random() * 10000000).toString();
    // eslint-disable-next-line
    map = L.map('map4', {
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
    mapDocLayer = new Zondy.Map.MapDocLayer('FeatureEditForLine', {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //只显示一个图层,不平铺显示
      noWrap: true,
      //添加guid
      guid: guid
    }).addTo(map);
    document.getElementById('preview4').style.display = 'none';
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
    //经度差
    let w = xmax - xmin;
    //纬度差
    let h = ymax - ymin;
    //在地图范围内创建一个点
    let x = Math.random() * w + xmin;
    let y = Math.random() * h + ymin;
    //返回点几何
    // eslint-disable-next-line
    return new Zondy.Object.Point2D(x, y);
  };

  // 添加线要素
  const addLine = () => {
    //显示进度条
    startPressBar();
    //构成线要素的点
    let pointObj = [];
    pointObj[0] = createPoint();
    pointObj[1] = createPoint();
    //构成折线的弧段
    // eslint-disable-next-line
    let gArc = new Zondy.Object.Arc(pointObj);
    //构成线的折线
    // eslint-disable-next-line
    let gAnyLine = new Zondy.Object.AnyLine([gArc]);
    //设置线要素的几何信息
    // eslint-disable-next-line
    let gline = new Zondy.Object.GLine(gAnyLine);
    //设置要素的几何信息
    // eslint-disable-next-line
    let fGeom = new Zondy.Object.FeatureGeometry({ LinGeom: [gline] });
    //随机输出1~8之间的整数,作为新添加的要素的颜色号
    let lineColor = Math.floor(Math.random() * 8 + 1);
    //设置添加线要素的图形参数信息
    // eslint-disable-next-line
    let clineInfo = new Zondy.Object.CLineInfo({
      Color: lineColor,
      LinStyleID: 0,
      LinStyleID2: 1,
      LinWidth: 5,
      Xscale: 10,
      Yscale: 10
    });
    //设置要素的图形参数信息
    // eslint-disable-next-line
    let graphicInfo = new Zondy.Object.WebGraphicsInfo({
      InfoType: 2,
      LinInfo: clineInfo
    });
    //设置添加线要素的属性信息
    let attValue = ['长江'];
    //创建一个线要素
    // eslint-disable-next-line
    let newFeature = new Zondy.Object.Feature({
      fGeom: fGeom,
      GraphicInfo: graphicInfo,
      AttValue: attValue
    });
    //设置要素为线要素
    newFeature.setFType(2);
    //创建一个要素数据集
    // eslint-disable-next-line
    let featureSet = new Zondy.Object.FeatureSet();
    //字段长度
    let fldNumber = 1;
    //字段类型
    let fldType = ['string'];
    //字段名称
    let fldName = ['CName'];
    //创建属性结构设置对象
    // eslint-disable-next-line
    let cAttStruct = new Zondy.Object.CAttStruct({
      FldName: fldName,
      FldNumber: fldNumber,
      FldType: fldType
    });
    //设置要素数据集的属性结构
    featureSet.AttStruct = cAttStruct;
    //添加要素到要素数据集
    featureSet.addFeature(newFeature);
    //创建一个地图编辑对象
    // eslint-disable-next-line
    let editService = new Zondy.Service.EditDocFeature(
      'FeatureEditForLine',
      0,
      {
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163'
      }
    );
    //执行添加点要素功能,OnSuccess为回调函数
    editService.add(featureSet, OnSuccess);
  };
  //添加点要素回调函数
  const OnSuccess = (rlt) => {
    //停止进度条
    stopPressBar();
    let result = rlt;
    if (result) {
      //刷新图层前要进行此设置。加载之前的缓存文档,保证专题图能正常显示
      mapDocLayer.options.keepCache = false;
      //刷新图层，实时显示专题图
      mapDocLayer.redraw();
      //设置为读取缓存，以加快显示效率
      mapDocLayer.options.keepCache = true;
      alert('添加线要素成功！');
    } else {
      alert('添加线要素失败！');
    }
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview4').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview4').style.display = '';
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview4' className='preview'>
          <div className='loading'></div>
          <span>正在添加，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input type='button' value='添加线要素' onClick={addLine} />
        </div>
        <div id='map4' className='map'></div>
      </div>
    </React.Fragment>
  );
}
