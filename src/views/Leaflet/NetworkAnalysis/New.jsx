import React, { useEffect } from 'react';

//定义全局变量
let map;
//路径分析服务类
let netAnalyExtend;
//记录网络分析的是网标列表
let netFlag;

export default function NewView() {
  const initMap = () => {
    // eslint-disable-next-line
    map = L.map('map1', {
      //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [38.0359, 114.5],
      //最小显示等级
      minZoom: 10,
      //最大显示等级
      maxZoom: 16,
      //当前显示等级
      zoom: 12
    }); //矢量图层
    // eslint-disable-next-line
    let layer = new Zondy.Map.MapVectorLayer(
      'gdbp://MapGisLocal/sample/ds/网络分析/ncls/道路交通网',
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

  // 执行路径分析
  const NetAnalysis = () => {
    netFlag = [];
    let dotVal = '114.44,38.06,114.56,38.03';
    // eslint-disable-next-line
    netAnalyExtend = new Zondy.Service.NetAnalysisExtent({
      netClsUrl: 'gdbp://MapGisLocal/sample/ds/网络分析/ncls/道路交通网',
      //返回格式
      outFormat: 'JSON',
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //网络类型：1/2:节点网标/线网标
    netAnalyExtend.elementType = 2;
    //设置网标搜索半径
    netAnalyExtend.nearDis = 0.01;
    netAnalyExtend.addNetFlag(dotVal, addFlagSuccess);
  };

  // 回调函数，处理显示结果信息
  const addFlagSuccess = (data) => {
    if (!data || !data.succeed) {
      alert('网络分析失败，请检查参数！');
      return;
    }
    data = data.value;
    for (let i = 0; i < data.length; i++) {
      let netFlagTmp = {
        elemID: data[i].elemID,
        isFlag: true,
        posDot: data[i].posDot,
        posPerc: data[i].posPerc,
        type: data[i].type
      };
      netFlag.push(netFlagTmp);
    }
    if (netFlag.length < 2) {
      return;
    }

    // 执行路径分析
    // eslint-disable-next-line
    let netAnalyse = new Zondy.Object.NetAnalyse({
      //设置网络类URL
      netCls: 'gdbp://MapGisLocal/sample/ds/网络分析/ncls/道路交通网',
      //指定感兴趣路径点坐标序列
      flagPosStr: netFlag,
      //设置障碍点的坐标序列
      barrierPosStr: [],
      //设置网络类某些属性字段为权值字段
      weight: ',,',
      //分析类型：用户自定义
      mode: 'UserMode',
      //生成报告时道路名称字段
      roadName: 'POPNAME',
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    netAnalyExtend.netAnalyse(netAnalyse, AnalysisSuccess);
  };

  // 回调函数，处理显示结果信息 data获取结果对象
  const AnalysisSuccess = (data) => {
    if (data && data.succeed) {
      let points = [];
      for (let t = 0; t < data.dotsss.length; t++) {
        for (let i = 0; i < data.dotsss[t].length; i++) {
          for (let j = 0; j < data.dotsss[t][i].length; j++) {
            points.push([data.dotsss[t][i][j].Y, data.dotsss[t][i][j].X]);
          }
        }
      }
      let resInfo = data.resInfo;
      //绘制路径
      // eslint-disable-next-line
      $('#resultInfo1').append(resInfo);
      // eslint-disable-next-line
      $('#resultInfo1').css('border', '1px solid #1ab394');
      drawPath(points);
    }
  };

  // 绘制路径, points绘制路径的点集
  const drawPath = (points) => {
    // eslint-disable-next-line
    let polyline = L.polyline(points, { color: 'red' }).addTo(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='map1' className='map'></div>
        <div id='toolspanel' className='info_box'>
          <input type='button' value='网络分析' onClick={NetAnalysis} />
          <div id='resultInfo1'>
            分析结果：
            <br />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
