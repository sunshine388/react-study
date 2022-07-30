import React, { useEffect } from 'react';

export default function Map6View() {
  const initMap = () => {
    //地图容器
    // eslint-disable-next-line
    let map = L.map('map6', {
      //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG4326,
      //显示中心
      center: [30, 114],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 8,
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

    //将线几何添加到地图进行显示（非必需，仅仅为了在地图上高亮显示图形）
    // eslint-disable-next-line
    let line = L.polyline(
      [
        [30.6, 114.4],
        [30.2, 114.45]
      ],
      {
        color: 'red'
      }
    ).addTo(map);
    //将区几何添加到地图进行显示
    let polbounds = [
      [30.533613, 114.301586],
      [30.396517, 114.301586],
      [30.396517, 114.544453],
      [30.533613, 114.444453]
    ];
    // eslint-disable-next-line
    L.polygon(polbounds, {
      color: 'blue',
      weight: 1
    }).addTo(map);
  };
  // 执行拓扑分析
  const TopAnalysis = () => {
    //创建线几何对象
    // eslint-disable-next-line
    let lineObj = new Zondy.Object.GLine(
      // eslint-disable-next-line
      new Zondy.Object.AnyLine([
        // eslint-disable-next-line
        new Zondy.Object.Arc([
          // eslint-disable-next-line
          new Zondy.Object.Point2D(114.4, 30.6),
          // eslint-disable-next-line
          new Zondy.Object.Point2D(114.45, 30.2)
        ])
      ])
    );
    //创建区几何对象
    // eslint-disable-next-line
    let regionObj = new Zondy.Object.GRegion([
      // eslint-disable-next-line
      new Zondy.Object.AnyLine([
        // eslint-disable-next-line
        new Zondy.Object.Arc([
          // eslint-disable-next-line
          new Zondy.Object.Point2D(114.301586, 30.533613),
          // eslint-disable-next-line
          new Zondy.Object.Point2D(114.301586, 30.396517),
          // eslint-disable-next-line
          new Zondy.Object.Point2D(114.544453, 30.396517),
          // eslint-disable-next-line
          new Zondy.Object.Point2D(114.444453, 30.533613),
          // eslint-disable-next-line
          new Zondy.Object.Point2D(114.401586, 30.533613)
        ])
      ])
    ]);
    //初始化TopAnalysis类
    // eslint-disable-next-line
    let topService = new Zondy.Service.TopAnalysis({
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //调用setLine方法，设置线类型
    topService.setLine(lineObj);
    //调用setRelativeObj方法，设置拓扑分析参照物
    topService.setRelativeObj(regionObj);
    //设置拓扑分析半径
    topService.nearDis = '0.05';
    //执行拓扑分析，成功执行后返回执行结果，AnalysisSuccess为回调函数
    topService.execute(AnalysisSuccess);
  };

  // 拓扑分析成功回调函数
  const AnalysisSuccess = (data) => {
    //显示结果
    document.getElementById('topResult').value = data;
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input
            type='button'
            id='topAnalysisBtn'
            value='拓扑分析'
            onClick={TopAnalysis}
          />
          分析结果：
          <input id='topResult' type='text' disabled='disabled' />
        </div>
        <div id='map6' className='map'></div>
      </div>
    </React.Fragment>
  );
}
