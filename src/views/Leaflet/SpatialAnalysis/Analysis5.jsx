import React, { useEffect } from 'react';

//定义全局变量
let map;
//缓存结果图层的基地址
let resultBaseUrl = 'gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/';
//缓冲区图层
let resultLayer;

export default function Analysis5View() {
  const initMap = () => {
    // eslint-disable-next-line
    map = L.map('map5', {
      //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [-10, 110],
      //最小显示等级
      minZoom: 0,
      //最大显示等级
      maxZoom: 10,
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
    //矢量注记图层
    // eslint-disable-next-line
    new Zondy.Map.TDTLayer({
      //图层类型
      layerType: 'cva',
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
    document.getElementById('preview5').style.display = 'none';
  };
  // 执行圆裁剪分析
  const clipByCircleAnalysis = () => {
    clearA();
    //显示进度条
    startPressBar();
    let resultname =
      resultBaseUrl + 'clipByCircleAnalysisResultLayer' + getCurentTime();
    //实例化Zondy.Service.ClipByCircle类
    // eslint-disable-next-line
    let clipParam = new Zondy.Service.ClipByCircle({
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //设置圆心坐标
      center: '88.62, 47.09',
      //设置圆半径长度
      radius: 50,
      //设置被裁剪图层URL
      srcInfo:
        'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区',
      //设置结果URL
      desInfo: resultname
    });
    //调用基类的execute方法，执行圆裁剪分析。AnalysisSuccess为结果回调函数
    clipParam.execute(AnalysisSuccess, 'post', false, 'json', AnalysisError);
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
          encodeURIComponent(resultBaseUrl + resultLayerUrl),
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
      alert('圆裁剪分析失败，请检查参数！');
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
    document.getElementById('preview5').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview5').style.display = '';
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview5' className='preview'>
          <div className='loading'></div>
          <span>正在缓冲区分析，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input
            type='button'
            value='圆裁剪分析'
            onClick={clipByCircleAnalysis}
          />
          <input type='button' value='清除结果' onClick={clearA} />
        </div>
        <div id='map5' className='map'></div>
      </div>
    </React.Fragment>
  );
}
