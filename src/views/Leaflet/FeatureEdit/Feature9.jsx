import React, { useEffect } from 'react';

//定义地图文档图层和地图
let mapDocLayer, map;
//select标签中选择的要素id
let featureSelect;
//要素的外包矩形中心缓存数组
let pntArr = [];
//要素的子图符号缓存数组
let symbolArr = [];
//要素缓存数组
let objArr = [];
//子图位置信息
let pnt;
//子图颜色、要素的几何信息
let symbolColor, featureObj;
//地图文档guid
let guid;

export default function Feature9View() {
  const initMap = () => {
    //随机生成一个guid
    guid = Math.floor(Math.random() * 10000000).toString();
    // eslint-disable-next-line
    map = L.map('map9', {
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
    mapDocLayer = new Zondy.Map.MapDocLayer('FeatureEditForPolygon', {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //只显示一个图层,不平铺显示
      noWrap: true,
      //添加guid
      guid: guid
    }).addTo(map);
    //获取所有要素的id列表
    initFeatureIds();
    document.getElementById('preview9').style.display = 'none';
  };

  // 执行点更新功能
  const updatePoint = () => {
    //获取当前选择的要素编号
    // eslint-disable-next-line
    let featureIds = $('#featureID9')
      .find('option:selected')
      .text();
    if (featureIds === '请选择要素') {
      alert('请先选择要素，再进行更新!');
      return;
    }
    //显示进度条
    startPressBar();
    if (featureObj !== null) {
      //如果没有获取到子图符号，则直接返回
      if (symbolColor === null) {
        alert('没有获取到待修改元素的子图颜色！');
        return;
      }
      //如果颜色号+7后过大，超出色表最大值，则置0，否则返回“颜色号+7”
      let symColor = symbolColor + 7 < 1502 ? symbolColor + 7 : 0;
      //设置区要素的图形参数信息
      // eslint-disable-next-line
      let cRegionInfo = new Zondy.Object.CRegionInfo({
        EndColor: 1,
        FillColor: symColor,
        FillMode: 0,
        OutPenWidth: 1,
        OverMethod: 0,
        PatAngle: 1,
        PatColor: 1,
        PatHeight: 1,
        PatID: 27,
        PatWidth: 1
      });
      //要素图形参数信息
      // eslint-disable-next-line
      let graphicInfo = new Zondy.Object.WebGraphicsInfo({
        InfoType: 3,
        RegInfo: cRegionInfo
      });
      //设置区要素的属性信息
      let attValue = [0, 12345, 12345, 'esstLake', 'esstLake', 'esstLake'];
      //创建一个新的区要素
      // eslint-disable-next-line
      let newFeature = new Zondy.Object.Feature({
        AttValue: attValue,
        fGeom: featureObj,
        GraphicInfo: graphicInfo
      });
      newFeature.setFType(3);
      newFeature.setFID(featureIds);
      //创建一个要素数据集
      // eslint-disable-next-line
      let featureSet = new Zondy.Object.FeatureSet();
      let fldNumber = 6;
      let fldType = ['long', 'double', 'double', 'string', 'string', 'string'];
      let fldName = ['ID', '面积', '周长', 'CNTRY_NAME', 'FIRST_FIRS', 'name'];
      // eslint-disable-next-line
      let cAttValue = new Zondy.Object.CAttStruct({
        FldNumber: fldNumber,
        FldType: fldType,
        FldName: fldName
      });
      featureSet.AttStruct = cAttValue;
      featureSet.addFeature(newFeature);
      //创建一个要素编辑服务对象
      // eslint-disable-next-line
      let editService = new Zondy.Service.EditDocFeature(
        'FeatureEditForPolygon',
        0,
        {
          //访问IGServer的IP
          ip: 'develop.smaryun.com',
          //访问IGServer的端口号，.net版为6163，Java版为8089
          port: '6163'
        }
      );
      //更新所选要素，UpdateDocSuccess为回调函数
      editService.update(featureSet, UpdateDocSuccess);
    }
  };

  //修改点要素回调函数
  const UpdateDocSuccess = (rlt) => {
    //停止进度条
    stopPressBar();
    let result = rlt;
    if (result) {
      //刷新图层前要进行此设置,加载之前的缓存文档
      mapDocLayer.options.keepCache = false;
      //刷新图层
      mapDocLayer.redraw();
      //设置为读取缓存，以加快显示效率
      mapDocLayer.options.keepCache = true;
      alert('修改区要素成功！');
      // eslint-disable-next-line
      $('#featureID9').val('请选择要素');
    } else {
      alert('修改区要素失败！');
    }
  };
  // 查询地图，获取活动图层中所有要素列表
  const initFeatureIds = () => {
    //获取所选要素
    // eslint-disable-next-line
    featureSelect = $('#featureID9');
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
    queryStruct.IncludeWebGraphic = true;
    //实例化查询参数对象
    // eslint-disable-next-line
    let queryParam = new Zondy.Service.QueryParameter({
      resultFormat: 'json',
      struct: queryStruct
    });
    //设置查询要素数目
    queryParam.recordNumber = 1000;
    //实例化地图文档查询服务对象
    // eslint-disable-next-line
    let queryService = new Zondy.Service.QueryDocFeature(
      queryParam,
      'FeatureEditForPolygon',
      0,
      {
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163'
      }
    );
    //执行查询操作，querySuccess为查询回调函数
    queryService.query(querySuccess);
  };
  //查询成功回调函数
  const querySuccess = (a) => {
    if (a.SFEleArray !== null) {
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
          //记录要素坐标位置
          pntArr.push([x, y]);
          //获取子图颜色
          let webGraphic = obj.GraphicInfo;
          if (webGraphic !== null) {
            if (
              webGraphic.RegInfo !== null &&
              webGraphic.RegInfo.FillColor !== null
            ) {
              symbolArr.push(webGraphic.RegInfo.FillColor);
            }
          }
          //获取要素的几何信息
          objArr.push(obj.fGeom);
        }
      }
    } else {
      alert('当前地图未查到要素,请先运行对应的要素添加示例！');
    }
  };

  // 选中某一个要素编号后触发的事件，用于进行要素定位，地图跳转
  const onSelect = () => {
    // eslint-disable-next-line
    let index = $('#featureID9').val();
    if (index === '请选择要素') {
      return;
    }
    //获取坐标
    pnt = pntArr[index];
    //获取所选编号要素对应的要素几何信息
    featureObj = objArr[index];
    //获取所选编号要素对应的子图颜色
    symbolColor = symbolArr[index];
    //每修改一次子图颜色，更新一下子图颜色的缓存数组
    //这里出于执行效率问题，不采用更新一次要素就重新查询子图符号信息的做法，而是直接变更缓存数组的值
    symbolArr[index] = symbolColor + 7 < 1502 ? symbolColor + 7 : 0;
    //注意leaflet是用纬经度来表示位置
    let coordinate = [pnt[1], pnt[0]];
    //将视图跳转到所选点要素的位置，并设置显示级数
    map.setView(coordinate, 1);
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview9').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview9').style.display = '';
  };

  useEffect(() => {
    initMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview9' className='preview'>
          <div className='loading'></div>
          <span>正在更新，请稍候</span>
        </div>
        <div className='ToolLib'>
          请输入要更新的要素ID
          <select id='featureID9' onChange={onSelect}></select>
          <input type='button' value='更新区要素' onClick={updatePoint} />
        </div>
        <div id='map9' className='map'></div>
      </div>
    </React.Fragment>
  );
}
