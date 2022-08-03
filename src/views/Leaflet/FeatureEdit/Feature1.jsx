import React, { useEffect } from 'react';

//定义地图文档图层和地图
let mapDocLayer, map;
//地图文档guid
let guid;

export default function Feature1View() {
  const initMap = () => {
    //随机生成一个guid
    guid = Math.floor(Math.random() * 10000000).toString();
    // eslint-disable-next-line
    map = L.map('map1', {
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
    mapDocLayer = new Zondy.Map.MapDocLayer('FeatureEditForPoint', {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //只显示一个图层,不平铺显示
      noWrap: true,
      //添加guid
      guid: guid
    }).addTo(map);
    document.getElementById('preview1').style.display = 'none';
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
  const addPoint = () => {
    //显示进度条
    startPressBar();
    //创建一个点形状，描述点形状的几何信息
    let gpoint = createPoint();
    //设置当前点要素的几何信息
    // eslint-disable-next-line
    let fGeom = new Zondy.Object.FeatureGeometry({ PntGeom: [gpoint] });
    //随机输出1~8之间的整数,作为新添加的要素的颜色号
    let pntColor = Math.floor(Math.random() * 8 + 1);
    //描述点要素的符号参数信息
    // eslint-disable-next-line
    let pointInfo = new Zondy.Object.CPointInfo({
      Angle: 0,
      Color: pntColor,
      Space: 0,
      SymHeight: 12,
      SymID: 98,
      SymWidth: 12
    });
    //设置当前点要素的图形参数信息
    // eslint-disable-next-line
    let webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
      InfoType: 1,
      PntInfo: pointInfo
    });
    //设置添加点要素的属性信息
    let attValue = ['中国', '中国', 1.0];
    //创建一个要素
    // eslint-disable-next-line
    let feature = new Zondy.Object.Feature({
      fGeom: fGeom,
      GraphicInfo: webGraphicInfo,
      AttValue: attValue
    });
    //设置要素为点要素
    feature.setFType(1);
    //创建一个要素数据集
    // eslint-disable-next-line
    let featureSet = new Zondy.Object.FeatureSet();
    featureSet.clear();
    //设置属性结构
    // eslint-disable-next-line
    let cAttStruct = new Zondy.Object.CAttStruct({
      FldName: ['Cname', 'CNTRY_NAME', 'POPULATION'],
      FldNumber: 3,
      FldType: ['string', 'string', 'double']
    });
    featureSet.AttStruct = cAttStruct;
    //添加要素到要素数据集
    featureSet.addFeature(feature);
    //创建一个编辑服务类
    // eslint-disable-next-line
    let editService = new Zondy.Service.EditDocFeature(
      'FeatureEditForPoint',
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
      alert('添加点要素成功！');
    } else {
      alert('添加点要素失败！');
    }
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview1').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview1').style.display = '';
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview1' className='preview'>
          <div className='loading'></div>
          <span>正在添加，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input type='button' value='地图文档点要素添加' onClick={addPoint} />
        </div>
        <div id='map1' className='map'></div>
      </div>
    </React.Fragment>
  );
}
