import React, { useEffect } from 'react';

//定义地图文档图层和地图
let mapDocLayer, map;
//子图位置信息和子图号
let pnt, symbolId;
//select标签中选择的要素id
let featureSelect;
//要素位置
let pntArr = [];
//要素符号
let symbolArr = [];
//地图文档guid
let guid;

export default function Feature3View() {
  const initMap = () => {
    //随机生成一个guid
    guid = Math.floor(Math.random() * 10000000).toString();
    // eslint-disable-next-line
    map = L.map('map3', {
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
    mapDocLayer = new Zondy.Map.MapDocLayer('FeatureEditForPoint', {
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
    document.getElementById('preview3').style.display = 'none';
  };

  // 执行点更新功能
  const updatePoint = () => {
    //获取当前选择的要素编号
    // eslint-disable-next-line
    let featureIds = $('#featureID3')
      .find('option:selected')
      .text();
    if (featureIds === '请选择要素') {
      alert('请先选择要素，再进行更新!');
      return;
    }
    //显示进度条
    startPressBar();
    if (pnt !== null) {
      if (pnt[0] !== null && pnt[1] !== null) {
        //创建一个点形状，描述点形状的几何信息
        // eslint-disable-next-line
        let gpoint = new Zondy.Object.GPoint(pnt[0], pnt[1]);
        // eslint-disable-next-line
        let fGeom = new Zondy.Object.FeatureGeometry({ PntGeom: [gpoint] });
        //如果没有获取到子图符号，则直接返回
        if (symbolId === null) {
          alert('没有获取到待修改元素的子图符号！');
          return;
        }
        //设置子图符号
        let symID = symbolId + 1;
        //设置添加点要素的图形参数信息
        // eslint-disable-next-line
        let pointInfo = new Zondy.Object.CPointInfo({
          Angle: 0,
          Color: 1442,
          Space: 0,
          SymHeight: 12,
          SymID: symID,
          SymWidth: 12
        });
        //设置当前点要素的图形参数信息
        // eslint-disable-next-line
        let webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
          InfoType: 1,
          PntInfo: pointInfo
        });
        //设置添加点要素的属性信息
        let attValue = ['东京', '日本', 1.0];
        //创建一个点要素
        // eslint-disable-next-line
        let newFeature = new Zondy.Object.Feature({
          fGeom: fGeom,
          GraphicInfo: webGraphicInfo,
          AttValue: attValue
        });
        //设置要素为点要素
        newFeature.setFType(1);
        //设置更新要素的FID
        newFeature.setFID(featureIds);
        //创建一个点要素数据集
        // eslint-disable-next-line
        let featureSet = new Zondy.Object.FeatureSet();
        featureSet.clear();
        //设置属性结构
        // eslint-disable-next-line
        let cAttStruct = new Zondy.Object.CAttStruct({
          FldName: ['Cname', 'CNTRY_NAME', 'POPULATION'],
          FldNumber: 3,
          FldType: ['string', 'string', 'double']
        });
        featureSet.AttStruct = cAttStruct;
        //添加要素到要素数据集
        featureSet.addFeature(newFeature);
        //创建一个编辑服务类
        // eslint-disable-next-line
        let editService = new Zondy.Service.EditDocFeature(
          'FeatureEditForPoint',
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
    }
  };

  //修改点要素回调函数
  const UpdateDocSuccess = (rlt) => {
    //停止进度条
    stopPressBar();
    let result = rlt;
    if (result) {
      //刷新图层前要进行此设置。加载之前的缓存文档,保证专题图能正常显示
      mapDocLayer.options.keepCache = false;
      //刷新图层，实时显示专题图
      mapDocLayer.redraw();
      //设置为读取缓存，以加快显示效率
      mapDocLayer.options.keepCache = true;
      alert('修改点要素成功！');
    } else {
      alert('修改点要素失败！');
    }
  };
  // 查询地图，获取活动图层中所有要素列表
  const initFeatureIds = () => {
    //获取所选要素
    // eslint-disable-next-line
    featureSelect = $('#featureID3');
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
      'FeatureEditForPoint',
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
          pntArr.push([x, y]);
          //获取子图符号
          let webGraphic = obj.GraphicInfo;
          if (webGraphic !== null) {
            if (
              webGraphic.PntInfo !== null &&
              webGraphic.PntInfo.SymID !== null
            ) {
              symbolArr.push(webGraphic.PntInfo.SymID);
            }
          }
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
    let index = $('#featureID3').val();
    if (index === '请选择要素') {
      return;
    }
    //获取该要素坐标
    pnt = pntArr[index];
    //获取子图符号
    symbolId = symbolArr[index];
    //每修改一次子图符号，更新一下子图符号的缓存数组
    //这里出于执行效率问题，不采用更新一次符号库就重新查询子图符号信息的做法，而是直接变更缓存数组的值
    symbolArr[index] = symbolId + 1;
    //注意leaflet是用纬经度来表示位置
    let coordinate = [pnt[1], pnt[0]];
    //将视图跳转到所选点要素的位置，并设置显示级数
    map.setView(coordinate, 3);
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview3').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview3').style.display = '';
  };

  useEffect(() => {
    initMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview3' className='preview'>
          <div className='loading'></div>
          <span>正在更新，请稍候</span>
        </div>
        <div className='ToolLib'>
          请输入要更新的点要素ID
          <select id='featureID3' onChange={onSelect}></select>
          <input type='button' value='更新点要素' onClick={updatePoint} />
        </div>
        <div id='map3' className='map'></div>
      </div>
    </React.Fragment>
  );
}
