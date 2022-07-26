import React, { useEffect } from 'react';

//定义全局变量
let map;

export default function OldView() {
  const initMap = () => {
    // eslint-disable-next-line
    map = L.map('map2', {
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
  const NetAnalysisOld = () => {
    // eslint-disable-next-line
    let netAnalyParam = new Zondy.Service.NetAnalysis({
      //设置网络类URL
      netClsUrl: 'gdbp://MapGisLocal/sample/ds/网络分析/ncls/道路交通网',
      //指定感兴趣路径点坐标序列
      flagPosStr: '114.44,38.06,114.56,38.03',
      //分析类型：用户自定义
      analyTp: 'UserMode',
      //设置网络类某些属性字段为权值字段
      weight: ',Weight1,Weight1',
      //网络类型：1/2:节点网标/线网标
      elementType: 2,
      //设置网标搜索半径
      nearDis: 0.01,
      //设置障碍点的坐标序列
      barrierPosStr: '',
      //返回格式
      outFormat: 'JSON',
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    netAnalyParam.execute(netAnalysisSuccess, 'POST');
  };

  // 分析成功后的回调
  const netAnalysisSuccess = (data) => {
    if (!data || !data.succeed) {
      alert('网络分析失败，请检查参数！');
    } else {
      let dot;
      //轨迹坐标数组
      let pathArr = [];
      //结果描述信息
      let resDiv;
      //两点之间的距离
      let dis = 0;
      if (data.results[0].Value === null) {
        return;
      }
      //返回的分析结果数据
      let resultObj = JSON.parse(data.results[0].Value);
      if (resultObj === null || resultObj.Paths === null) {
        return;
      }
      //解析轨迹边坐标序列
      let pathObj = resultObj.Paths[0];
      let edgeNum = pathObj.Edges.length;
      //添加经过纠偏的起点
      if (resultObj.inputDots === null) {
        return;
      }
      if (
        resultObj.inputDots[0].pDot === null ||
        resultObj.inputDots[1] === null ||
        resultObj.inputDots[1].pDot === null
      ) {
        return;
      }
      //路径分析的真实起点，即经过纠偏之后，线上网标或者点上网标点
      dot = [resultObj.inputDots[0].pDot.x, resultObj.inputDots[0].pDot.y];
      //结果描述信息
      if (dot[0] === 114.49 && dot[1] === 38.05) {
        resDiv =
          '从<font color="#FF0000"><b>起点</b></font>(114.49,38.05 )<font color="#FF0000"><b>出发,</b></font>';
        //添加起点到缓存数组
        pathArr.push(dot);
      } else {
        pathArr.push(dot);
        resDiv = '从<font color="#0000FF"><b>当前位置</b></font>出发，';
      }
      //没有路径线信息时，用户直接步行到达指定地点
      if (edgeNum === 0) {
        //纠偏起点与纠偏终点的距离
        if (
          resultObj.inputDots[1].pDot.x !== resultObj.inputDots[0].pDot.x ||
          resultObj.inputDots[1].pDot.y !== resultObj.inputDots[0].pDot.y
        ) {
          dis += getDistance(
            resultObj.inputDots[0].pDot,
            resultObj.inputDots[1].pDot
          );

          dot = [resultObj.inputDots[1].pDot.x, resultObj.inputDots[1].pDot.y];
          pathArr.push(dot);
        }
        //纠偏终点与输入终点的距离
        if (
          resultObj.inputDots[1].pDot.x !== 114.5 ||
          resultObj.inputDots[1].pDot.y !== 38.05
        ) {
          dot = [114.5, 38.05];
          pathArr.push(dot);
        }
        resDiv +=
          '<font color="#0000FF"><b>步行</b></font><font color="#FF0000">' +
          dis +
          '</font>米到达终点';
      } else if (edgeNum === 1) {
        //将路径线信息存储进缓存数组
        if (
          dot[0] !== pathObj.Edges[0].Dots[0].x ||
          dot[1] !== pathObj.Edges[0].Dots[0].y
        ) {
          dot = [pathObj.Edges[0].Dots[0].x, pathObj.Edges[0].Dots[0].y];
          pathArr.push(dot);
        }
        let dotLen = pathObj.Edges[0].Dots.length;
        for (let m = 1; m < dotLen; m++) {
          dot = [pathObj.Edges[0].Dots[m].x, pathObj.Edges[0].Dots[m].y];
          pathArr.push(dot);
        }
        //有路径线信息时，对路线信息进行解析
        if (pathObj.Edges[0].FieldValus[13] !== '') {
          resDiv +=
            '<font color="#0000FF"><b>步行</b></font><font color="#FF0000">' +
            dis +
            '</font>米，';
          resDiv +=
            '到达' +
            pathObj.Edges[0].FieldValus[13] +
            '(' +
            pathObj.Edges[0].Dots[0].x +
            ',' +
            pathObj.Edges[0].Dots[0].y +
            '），<br/>经' +
            pathObj.Edges[0].FieldValus[13];
        } else {
          //纠偏起点与纠偏终点的距离
          if (
            resultObj.inputDots[1].pDot.x !== resultObj.inputDots[0].pDot.x ||
            resultObj.inputDots[1].pDot.y !== resultObj.inputDots[0].pDot.y
          ) {
            dis += getDistance(
              resultObj.inputDots[0].pDot,
              resultObj.inputDots[1].pDot
            );
          }
          //纠偏终点与输入终点的距离
          if (
            resultObj.inputDots[1].pDot.x !== 114.5 ||
            resultObj.inputDots[1].pDot.y !== 38.05
          ) {
          }
          resDiv +=
            '<font color="#0000FF"><b>步行</b></font><font color="#FF0000">' +
            dis +
            '</font>米，';
        }
        resDiv += '到达终点';
      } else {
        //有路径线信息时，对路线信息进行解析
        if (dis !== 0) {
          resDiv +=
            '<font color="#0000FF"><b>步行</b></font><font color="#FF0000">' +
            dis +
            '</font>米，';
        }
        for (let i = 0; i < edgeNum - 1; i++) {
          let edge = pathObj.Edges[i];
          let edge1 = pathObj.Edges[i + 1];

          if (i === 0) {
            let dots = [edge.Dots[0].x, edge.Dots[0].y];
            if (edge.FieldValus[13] !== '')
              resDiv +=
                '到达' +
                edge.FieldValus[13] +
                '(' +
                dots[0] +
                ',' +
                dots[1] +
                '），<br/>经' +
                edge.FieldValus[13];
          }
          if (i !== edgeNum - 2) {
            if (
              edge.FieldValus[13] !== edge1.FieldValus[13] &&
              edge1.FieldValus[13] !== ''
            ) {
              let dots1 = [edge1.Dots[0].x, edge1.Dots[0].y];
              if (edge.FieldValus[13] !== '')
                resDiv +=
                  '到达' +
                  edge1.FieldValus[13] +
                  '(' +
                  dots1[0] +
                  ',' +
                  dots1[1] +
                  ')，<br/>' +
                  '经' +
                  edge1.FieldValus[13];
            }
          } else {
            let edgeLen = edge1.Dots.length;
            let dots4 = [edge1.Dots[edgeLen - 1].x, edge1.Dots[edgeLen - 1].y];
            //终点解析
            if (dots4[0] === 114.5 && dots4[1] === 38.05) {
              resDiv +=
                '<font color="#0000FF"><b>到达终点</b></font>(114.50,38.05)';
            } else {
              let dis1 = 0;
              //计算路径线最后一个点与纠偏终点之间的距离
              if (
                dots4[0] !== resultObj.inputDots[1].pDot.x ||
                dots4[1] !== resultObj.inputDots[1].pDot.y
              ) {
                dis1 = getDistance(dots4, resultObj.inputDots[1].pDot);
              }
              //计算纠偏终点与输入终点之间的距离
              if (
                edge.FieldValus[13] !== edge1.FieldValus[13] &&
                edge1.FieldValus[13] !== '' &&
                dis1 !== 0
              ) {
                resDiv +=
                  '到达' +
                  edge1.FieldValus[13] +
                  '(' +
                  dots4[0] +
                  ',' +
                  dots4[1] +
                  ')，最后步行<font color="#FF0000">' +
                  dis1 +
                  '</font>米到达终点(114.50,38.05)';
              } else {
                resDiv += '到达终点(114.50,38.05)';
              }
            }
          }
          //将路径线信息存储进缓存数组
          let dotCount = pathObj.Edges[i].Dots.length;
          for (let k = 0; k < dotCount; k++) {
            if (k === 0 && i === 0) {
              if (
                dot[0] !== pathObj.Edges[0].Dots[0].x ||
                dot[1] !== pathObj.Edges[0].Dots[0].y
              ) {
                dot = [pathObj.Edges[0].Dots[0].x, pathObj.Edges[0].Dots[0].y];
                pathArr.push(dot);
              }
            }
            dot = [pathObj.Edges[i].Dots[k].x, pathObj.Edges[i].Dots[k].y];
            pathArr.push(dot);
          }
        }
        //添加最后一条路径信息
        let dotCoun = pathObj.Edges[edgeNum - 1].Dots.length;
        for (let n = 0; n < dotCoun; n++) {
          dot = [
            pathObj.Edges[edgeNum - 1].Dots[n].x,
            pathObj.Edges[edgeNum - 1].Dots[n].y
          ];
          pathArr.push(dot);
        }
      }
      //添加经过纠偏的终点
      if (
        resultObj.inputDots[1].pDot.x !== dot.x ||
        resultObj.inputDots[1].pDot.y !== dot.y
      ) {
        dot = [resultObj.inputDots[1].pDot.x, resultObj.inputDots[1].pDot.y];
        pathArr.push(dot);
      }
      //绘制路径
      // eslint-disable-next-line
      $('#resultInfo2').append(resDiv);
      // eslint-disable-next-line
      $('#resultInfo2').css('border', '1px solid #1ab394');
      drawPath(pathArr);
    }
  };

  // 绘制路径, points绘制路径的点集
  const drawPath = (points) => {
    if (points.length > 0) {
      let PointArray = [];
      //循环创建一个存放坐标的数组
      for (let PntLength = 0; PntLength < points.length; PntLength++) {
        let a = points[PntLength][0];
        let b = points[PntLength][1];
        let dot = [b, a];
        PointArray.push(dot);
      }
      // eslint-disable-next-line
      let polyline = L.polyline(PointArray, { color: 'red' }).addTo(map);
    }
  };

  //根据两点坐标求实地距离计算，适用于经纬度
  const getDistance = (dot1, dot2) => {
    let radLat1 = parseFloat((dot1[0] * Math.PI) / 180.0);
    let radLat2 = parseFloat((dot2.x * Math.PI) / 180.0);
    let a = radLat1 - radLat2;
    let b = (dot1[1] * Math.PI) / 180.0 - (dot2.y * Math.PI) / 180.0;
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      );
    s = s * 6371229;
    s = Math.round(s * 10000) / 10000;
    return s;
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='map2' className='map'></div>
        <div id='toolspanel' className='info_box'>
          <input type='button' value='网络分析' onClick={NetAnalysisOld} />
          <div id='resultInfo2'>
            分析结果：
            <br />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
