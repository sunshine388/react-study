import React, { useEffect } from 'react';

//被投影的地图、图层
let map = null;
//投影转换的地图、图层
let projmap = null;
//缓存结果图层的基地址
let resultBaseUrl = 'gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/';

export default function LayerView() {
  const initMap = () => {
    // eslint-disable-next-line
    map = L.map('orgMap1', {
      //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [0, 0],
      //当前显示等级
      zoom: 1
    }); //矢量图层
    // eslint-disable-next-line
    let layer = new Zondy.Map.MapVectorLayer(
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区',
      {
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163',
        //设置图层能否重复显示。true代表显示唯一，false代表显示重复。
        noWrap: true,
        //缓存名称
        guid: new Date().getTime().toString()
      }
    ).addTo(map);
  };

  /** 根据空间参照系信息对图层进行投影转换
   */
  const projectByParam = () => {
    //清除之前的结果图层
    clearRlt();
    //显示进度条
    startPressBar();
    //结果名称，加当前时间为后缀放置数据库中重名
    let resultname =
      resultBaseUrl + 'projectByParamResultLayer' + getCurentTime();
    //初始化图层投影转换服务类Zondy.Service.ProjectByLayer类
    // eslint-disable-next-line
    let projByLayer = new Zondy.Service.ProjectByLayer({
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //投影类型，0地理坐标系，1UTM，2兰伯特等角圆锥投影坐标系
      projTypeID: 23,
      //椭球体类型，2为西安80
      sphereType: 2,
      //弧度单位，1为毫米，2为米，3为秒，4为度，6为英尺，7为分，8为弧度
      projAngleUnit: 5,
      //坐标系类型，0为自定义坐标系、1地理坐标系，3投影平面直角坐标系
      projType: 0,
      //投影分带类型
      projZoneType: 0,
      //投影带号
      projZoneNO: 0,
      //中央子午线经度
      projLon: 0,
      //投影原点纬度
      projLat: 0,
      //第一标准维度
      projLat1: 0,
      //第二标准维度
      projLat2: 0,
      //水平单位，1为毫米，2为米，3为秒，4为度，6为英尺，7为分，8为弧度，详细请参见EnumProjAngleUnit
      projUnit: 2,
      //水平比例尺
      projRate: 1,
      x: 0,
      y: 0,
      resultName: 'rel'
    });
    //需转换的要素类地址，继承于ProjectBase类属性
    projByLayer.clsName =
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区';
    //结果要素类地址，继承ProjectBase类属性
    projByLayer.desClsName = resultname;
    //调用基类的execute方法，执行投影变换， projectLayerSuccess为结果回调函数，服务器请求方式为POST
    projByLayer.execute(
      projectLayerSuccess,
      'post',
      false,
      'json',
      AnalysisError
    );
  };

  // 分析失败回调
  const AnalysisError = (e) => {
    //停止进度条
    stopPressBar();
  };

  // 回调函数，处理显示结果信息
  const projectLayerSuccess = (data) => {
    //停止进度条
    stopPressBar();
    if (data && data.succeed) {
      if (data.results && data.results.length !== 0) {
        // eslint-disable-next-line
        projmap = L.map('prjMap1', {
          //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
          // eslint-disable-next-line
          crs: L.CRS.EPSG3857,
          //显示中心
          center: [0, 0],
          //当前显示等级
          zoom: 1
        });
        //定义图层地址
        let resultLayerUrl = data.results[0].Value;
        //将结果图层添加到地图视图中显示
        let resultURL = resultBaseUrl + resultLayerUrl;
        // eslint-disable-next-line
        let resultLayer = new Zondy.Map.MapVectorLayer(
          encodeURIComponent(resultURL),
          {
            //访问IGServer的IP
            ip: 'develop.smaryun.com',
            //访问IGServer的端口号，.net版为6163，Java版为8089
            port: '6163',
            //设置图层能否重复显示。true代表显示唯一，false代表显示重复。
            noWrap: true,
            //缓存名称
            guid: new Date().getTime().toString()
          }
        ).addTo(projmap);
      }
    } else {
      alert('投影失败，请检查参数！');
    }
  };

  // 清除之前的结果
  const clearRlt = () => {
    if (projmap != null) {
      //清除投影结果
      projmap.remove();
    } else return;
  };

  // 当前日期加时间(如:2009-06-12-120000)
  const getCurentTime = () => {
    let now = new Date();
    //获取当前年份
    let year = now.getFullYear();
    //获取当前月份
    let month = now.getMonth() + 1;
    //获取当前日期
    let day = now.getDate();
    //获取当前时刻
    let hh = now.getHours();
    //获取当前分钟
    let mm = now.getMinutes();
    //获取当前秒钟
    let ss = now.getSeconds();
    //将当前的日期拼串
    let clock = year + '-';
    if (month < 10) clock += '0';
    clock += month + '-';
    if (day < 10) clock += '0';
    clock += day + '-';
    if (hh < 10) clock += '0';
    clock += hh;
    if (mm < 10) clock += '0';
    clock += mm;
    if (ss < 10) clock += '0';
    clock += ss;
    return clock;
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
          <span>正在进行投影转换，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input
            type='button'
            className='ButtonLib'
            value='根据空间参照系信息投影'
            onClick={projectByParam}
          />
        </div>
        <div className='map'>
          <div id='orgMap1' className='map1'></div>
          <div id='prjMap1' className='map2'></div>
        </div>
      </div>
    </React.Fragment>
  );
}
