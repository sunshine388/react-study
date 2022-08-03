import React, { useEffect } from 'react';

//定义地图文档图层和地图
let map;
//查询结果点集
let finaldots = [];

export default function Feature11View() {
  const initMap = () => {
    // eslint-disable-next-line
    map = L.map('map11', {
      //地图渲染在canvas上
      preferCanvas: true,
      //不添加属性说明控件
      attributionControl: false,
      //添加缩放控件
      zoomControl: true,
      //投影坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //中心点
      center: [10, 30],
      //最大级数
      maxZoom: 10,
      //最小级数
      minZoom: 0,
      //显示级数
      zoom: 1
    });
    //创建矢量图层
    // eslint-disable-next-line
    let vectorLayer = new Zondy.Map.MapVectorLayer(
      [
        'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区'
      ],
      {
        //投影坐标系
        // eslint-disable-next-line
        crs: L.CRS.EPSG4326,
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163',
        //图层显示设置
        noWrap: true,
        //添加guid，确保图层从IGS中加载，不读取缓存文件
        guid: new Date().getTime().toString()
      }
    ).addTo(map);
    //设置矩形范围
    let bounds = [
      [35, 93],
      [56, 111]
    ];
    //将矩形几何添加到地图进行显示（非必需，仅仅为了在地图上高亮显示图形）
    // eslint-disable-next-line
    L.rectangle(bounds, {
      //颜色
      color: '#ff7800',
      //宽度
      weight: 1
    }).addTo(map);
    document.getElementById('preview11').style.display = 'none';
  };
  // 执行矢量图层要素查询
  const vecFeatureQuery = () => {
    //显示进度条
    startPressBar();
    //创建查询结构对象
    // eslint-disable-next-line
    let queryStruct = new Zondy.Service.QueryFeatureStruct();
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true;
    //创建一个用于查询的矩形
    // eslint-disable-next-line
    let geomObj = new Zondy.Object.Rectangle(93, 35, 111, 56);
    //指定查询规则
    // eslint-disable-next-line
    let rule = new Zondy.Service.QueryFeatureRule({
      //是否将要素的可见性计算在内
      EnableDisplayCondition: false,
      //是否完全包含
      MustInside: false,
      //是否仅比较要素的外包矩形
      CompareRectOnly: false,
      //是否相交
      Intersect: true
    });
    //实例化查询参数对象
    // eslint-disable-next-line
    let queryParam = new Zondy.Service.QueryByLayerParameter(
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区',
      {
        //几何对象
        geometry: geomObj,
        //结果格式
        resultFormat: 'json',
        //查询结构
        struct: queryStruct,
        //查询规则
        rule: rule
      }
    );
    //设置查询分页号
    queryParam.pageIndex = 0;
    //设置查询要素数目
    queryParam.recordNumber = 20;
    //实例化地图文档查询服务对象
    // eslint-disable-next-line
    let queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //执行查询操作，querySuccess为成功回调，queryError为失败回调
    queryService.query(querySuccess, queryError);
  };

  // 查询成功回调函数
  const querySuccess = (result) => {
    //停止进度条
    stopPressBar();
    //获取查询到的结果数组,ploygonArr的个数即为查询到的结果数
    let ploygonArr = result.SFEleArray;
    for (let i = 0; i < ploygonArr.length; i++) {
      //获取要素几何数组
      let Rings = ploygonArr[i].fGeom.RegGeom[0].Rings;
      //针对复合要素，要循环获取每一个几何
      for (let j = 0; j < Rings.length; j++) {
        //取出构成多边形的数组
        let dots = Rings[j].Arcs[0].Dots;
        for (let k = 0; k < dots.length; k++) {
          //注意，leaflet是用纬经度来表示位置
          finaldots.push([dots[k].y, dots[k].x]);
        }
        //绘制多边形
        // eslint-disable-next-line
        let disp = L.polygon(finaldots, { color: 'red', weight: 1 }).addTo(map);
        //清空结果点集，以绘制下一个图形对象
        finaldots = null;
        finaldots = [];
      }
    }
  };

  // 查询失败回调函数
  const queryError = (data) => {
    //停止进度条
    stopPressBar();
    alert('查询失败！');
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview11').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview11').style.display = '';
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview11' className='preview'>
          <div className='loading'></div>
          <span>正在查询，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input
            type='button'
            value='矢量图层要素查询'
            onClick={vecFeatureQuery}
          />
        </div>
        <div id='map11' className='map'></div>
      </div>
    </React.Fragment>
  );
}
