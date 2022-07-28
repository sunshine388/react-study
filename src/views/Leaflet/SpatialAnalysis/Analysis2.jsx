import React, { useEffect } from 'react';

//定义全局变量
let map;
//缓存结果图层的基地址
let resultBaseUrl = 'gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/';
//缓冲区图层
let resultLayer;

export default function Analysis2View() {
  const initMap = () => {
    // eslint-disable-next-line
    map = L.map('map2', {
      //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [25, 110],
      //最小显示等级
      minZoom: 0,
      //最大显示等级
      maxZoom: 10,
      //当前显示等级
      zoom: 3,
      //设置图像范围,
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    }); //矢量图层
    // eslint-disable-next-line
    let layer = new Zondy.Map.MapVectorLayer(
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流_1',
      {
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163',
        //设置图层能否重复显示。true代表显示唯一，false代表显示重复。
        noWrap: true,
        //设置地图的索引号
        mapIndex: 0,
        //缓存名称
        guid: new Date().getTime().toString()
      }
    ).addTo(map);
    document.getElementById('preview2').style.display = 'none';
  };
  // 执行多圈缓冲区分析
  const multiBuffAnalysis = () => {
    //clearA();
    //显示进度条
    startPressBar();
    //实例化ClassBufferByMultiplyRing类
    // eslint-disable-next-line
    let clsBufByMR = new Zondy.Service.ClassBufferByMultiplyRing({
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //多圈缓冲分析各圈的缓冲半径
      radiusStr: '0.1,0.5,1'
    });
    //调用Zondy.Service.ClassBufferBase基类公共属性
    clsBufByMR.srcInfo =
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流_1';
    let resultname = 'multiBuffAnalysisResultLayer' + getCurentTime();
    clsBufByMR.desInfo = resultBaseUrl + resultname;
    //调用基类Zondy.Service.AnalysisBase的execute方法执行类缓冲分析，AnalysisSuccess为回调函数
    clsBufByMR.execute(AnalysisSuccess, 'post', false, 'json', AnalysisError);
  };

  // 分析失败回调
  const AnalysisError = (e) => {
    //停止进度条
    stopPressBar();
  };

  // 分析成功后的回调
  const AnalysisSuccess = (data) => {
    stopPressBar(); //停止进度条
    if (data && data.succeed) {
      if (data.results && data.results.length !== 0) {
        let resultLayerUrl = data.results[0].Value || data.results[0].value;
        //将结果图层添加到地图视图中显示
        // eslint-disable-next-line
        resultLayer = new Zondy.Map.MapVectorLayer(
          [resultBaseUrl + resultLayerUrl],
          {
            //访问IGServer的IP
            ip: 'develop.smaryun.com',
            //访问IGServer的端口号，.net版为6163，Java版为8089
            port: '6163',
            //设置图层能否重复显示。true代表显示唯一，false代表显示重复。
            noWrap: true,
            //设置地图的索引号
            mapIndex: 10,
            //缓存名称
            guid: new Date().getTime().toString()
          }
        ).addTo(map);
      }
    } else {
      alert('类多圈缓冲分析失败，请检查参数！');
    }
  };

  // 清除客户端分析结果信息
  const clearA = () => {
    //停止进度条
    stopPressBar();
    //移除缓冲区图层
    if (resultLayer !== undefined) {
      resultLayer.remove();
    }
  };

  // 获取当前时间（如：2015-09-09-120000）
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
          <span>正在缓冲区分析，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input
            type='button'
            value='多圈缓冲区分析'
            onClick={multiBuffAnalysis}
          />
          <input type='button' value='清除结果' onClick={clearA} />
        </div>
        <div id='map2' className='map'></div>
      </div>
    </React.Fragment>
  );
}
