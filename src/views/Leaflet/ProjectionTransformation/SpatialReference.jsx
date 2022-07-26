import React, { useEffect } from 'react';

//被投影的地图、图层
let map = null;
//投影转换的地图、图层
let projmap = null;
//缓存结果图层的基地址
let resultBaseUrl = 'gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/';

export default function SpatialReferenceView() {
  const initMap = () => {
    // eslint-disable-next-line
    map = L.map('orgMap2', {
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

  /** 根据MapGIS空间参照系ID信息对图层进行投影转换
   */
  const projectBySRID = () => {
    clearRlt();
    //显示进度条
    startPressBar();
    //结果名称
    let resultname =
      resultBaseUrl + 'projectBySRIDResultLayer' + getCurentTime();
    //初始化Zondy.Service. ProjectBySRID类
    // eslint-disable-next-line
    let projBySRID = new Zondy.Service.ProjectBySRID({
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //参照系ID
      srID: 606
    });
    //需转换的要素类地址，继承于ProjectBase类属性
    projBySRID.clsName =
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区';
    //结果要素类地址，继承ProjectBase类属性
    projBySRID.desClsName = resultname;
    //调用基类的execute方法，执行投影变换， projectLayerSuccess为结果回调函数，服务器请求方式为POST
    projBySRID.execute(
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
        projmap = L.map('prjMap2', {
          //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
          // eslint-disable-next-line
          crs: L.CRS.EPSG3857,
          //显示中心
          center: [0, 0],
          //当前显示等级
          zoom: 1
        });
        //定义结果图层的地址
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
    //停止进度条
    document.getElementById('preview2').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview2').style.display = '';
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview2' className='preview'>
          <div className='loading'></div>
          <span>正在进行投影转换，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input
            type='button'
            className='ButtonLib'
            value='根据空间参照系ID信息投影'
            onClick={projectBySRID}
          />
        </div>
        <div className='map'>
          <div id='orgMap2' className='map1'></div>
          <div id='prjMap2' className='map2'></div>
        </div>
      </div>
    </React.Fragment>
  );
}
