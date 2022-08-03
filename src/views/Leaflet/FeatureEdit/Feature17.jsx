import React, { useEffect } from 'react';

//定义地图和矢量图层
let map, vectorLayer;
//select标签中选择的要素id
let featureSelect;
//要素位置
let pntArr = [];

export default function Feature17View() {
  const initMap = () => {
    // eslint-disable-next-line
    map = L.map('map17', {
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
    vectorLayer = new Zondy.Map.MapVectorLayer(
      [
        'gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/leafreglayer'
      ],
      {
        //投影坐标系
        // eslint-disable-next-line
        crs: L.CRS.EPSG4326,
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163',
        //只显示一个图层,不平铺显示
        noWrap: true,
        //添加guid，确保图层从IGS中加载，不读取缓存文件
        guid: new Date().getTime().toString()
      }
    ).addTo(map);
    //获取所有要素的id列表
    initFeatureIds();
    document.getElementById('preview17').style.display = 'none';
  };

  // 执行点删除功能
  const deleteRegion = () => {
    //获取当前选择的要素编号
    // eslint-disable-next-line
    let featureIds = $('#featureID17')
      .find('option:selected')
      .text();
    if (featureIds === '请选择要素') {
      alert('请先选择要素，再进行删除!');
      return;
    }
    //显示进度条
    startPressBar();
    //执行删除要素操作
    // eslint-disable-next-line
    let deleteService = new Zondy.Service.EditLayerFeature(
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/leafreglayer',
      {
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163'
      }
    );
    //删除所选要素，featureIds为要素id，DeleteSuccess为回调函数
    deleteService.deletes(featureIds, DeleteSuccess);
  };

  //删除点要素回调函数
  const DeleteSuccess = (rlt) => {
    //停止进度条
    stopPressBar();
    let result = rlt;
    if (result) {
      alert('删除区要素成功！');
      //刷新图层
      vectorLayer.redraw();
      //查询地图，更新要素列表
      initFeatureIds();
    } else {
      alert('删除区要素失败！');
    }
  };
  // 查询地图，获取活动图层中所有要素列表
  const initFeatureIds = () => {
    //删除select标签中的内容
    // eslint-disable-next-line
    $('#featureID17').empty();
    // 重置要素位置数组
    pntArr.length > 0 && (pntArr = []);
    //获取所选要素
    // eslint-disable-next-line
    featureSelect = $('#featureID17');
    // eslint-disable-next-line
    $("<option value='请选择要素'>请选择要素</option>").appendTo(featureSelect);
    //初始化查询结构对象，设置查询结构包含几何信息
    // eslint-disable-next-line
    let queryStruct = new Zondy.Service.QueryFeatureStruct();
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true;
    //是否包含属性信息
    queryStruct.IncludeAttribute = true;
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false;
    //实例化查询参数对象
    // eslint-disable-next-line
    let queryParam = new Zondy.Service.QueryByLayerParameter(
      'gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/leafreglayer',
      {
        resultFormat: 'json',
        struct: queryStruct
      }
    );
    //设置查询要素数目
    queryParam.recordNumber = 1000;
    //设置属性条件
    //queryParam.where = "name='中国'";
    //实例化地图文档查询服务对象
    // eslint-disable-next-line
    let queryService = new Zondy.Service.QueryLayerFeature(queryParam, {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //执行查询操作，querySuccess为查询回调函数
    queryService.query(querySuccess);
  };
  //查询成功回调函数
  const querySuccess = (a) => {
    // 重置要素的外包矩形中心缓存数组
    pntArr = [];
    if (a.SFEleArray != null) {
      if (a.SFEleArray.length === 0) {
        alert('查询结果为空');
      } else {
        for (let i = 0; i < a.SFEleArray.length; i++) {
          let obj = a.SFEleArray[i];
          // eslint-disable-next-line
          $("<option value='" + i + "'>" + obj.FID + '</option>').appendTo(
            featureSelect
          );
          //获取不同编号对应元素的外包络矩形及中心，用于跳转
          let featureBound = obj.bound;
          let x = 0,
            y = 0;
          //计算外包矩形的中心点
          x =
            featureBound.xmax !== featureBound.xmin
              ? (featureBound.xmax - featureBound.xmin) / 2 + featureBound.xmin
              : featureBound.xmax;
          y =
            featureBound.ymax !== featureBound.ymin
              ? (featureBound.ymax - featureBound.ymin) / 2 + featureBound.ymin
              : featureBound.ymax;
          pntArr.push([x, y]);
        }
      }
    } else {
      alert('当前地图未查到要素，请先运行对应的要素添加示例！');
    }
  };

  // 选中某一个要素编号后触发的事件，用于进行要素定位，地图跳转
  const onSelect = () => {
    //获取所选要素id
    // eslint-disable-next-line
    let index = $('#featureID17').val();
    if (index === '请选择要素') {
      return;
    }
    //获取该要素坐标
    let pnt = pntArr[index];
    //注意leaflet是用纬经度来表示位置
    let coordinate = [pnt[1], pnt[0]];
    //将视图跳转到所选点要素的位置，并设置显示级数
    map.setView(coordinate, 3);
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview17').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview17').style.display = '';
  };

  useEffect(() => {
    initMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview17' className='preview'>
          <div className='loading'></div>
          <span>正在删除，请稍候</span>
        </div>
        <div className='ToolLib'>
          请输入要删除的区要素ID：
          <select id='featureID17' onChange={onSelect}></select>
          <input
            type='button'
            value='矢量图层删除区要素'
            onClick={deleteRegion}
          />
        </div>
        <div id='map17' className='map'></div>
      </div>
    </React.Fragment>
  );
}
