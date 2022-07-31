import React, { useEffect } from 'react';

//以本地GIS服务器发布的地图文档为例，用户可设置其目标对象
//访问IGServer的IP
let ip = 'develop.smaryun.com';
//访问IGServer的端口号，.net版为6163，Java版为8089
let port = '6163';
//地图文档名称
let mapDocName = 'SAMPLEDOC3857';
let map, layer;

export default function DirectoryService3View() {
  //矢量地图文档目录服务（获取矢量地图文档列表）
  //获取地图文档列表
  const getVectorMapdocList = () => {
    //显示结果窗口
    showResultDiv();
    //实例化Zondy.Service.Catalog.MapDoc类
    // eslint-disable-next-line
    let docCatalog = new Zondy.Catalog.MapDoc({
      ip: ip,
      port: port
    });
    //调用getMapDocList方法，获取服务器地图文档列表，在回调函数中处理结果
    docCatalog.getMapDocList(getListSuccess);
  };

  //矢量地图文档目录服务（获取指定矢量地图文档信息）
  //获取地图文档信息
  const getVectorMapdocInfo = () => {
    showResultDiv();
    //实例化Zondy.Service.Catalog.MapDoc类，设置操作的地图文档为“WorldJWVector”
    // eslint-disable-next-line
    let docCatalog = new Zondy.Catalog.MapDoc({
      ip: ip,
      port: port,
      //或获取的地图文档的名称
      docName: mapDocName,
      //是否返回由DWS所返回的原始格式信息
      returnFullStyle: true
    });
    //调用getMapDocInfo函数，获取地图文档相关信息，在回调函数中处理结果
    docCatalog.getMapDocInfo(getListSuccess);
  };

  //矢量地图文档目录服务（获取指定地图信息）

  //获取指定地图信息
  const getMapInfo = () => {
    showResultDiv();
    //实例化Zondy.Service.Catalog.MapDoc类，设置操作的地图文档为用户指定的地图文档,地图为索引值为0的地图
    // eslint-disable-next-line
    let docCatalog = new Zondy.Catalog.MapDoc({
      ip: ip,
      port: port,
      //设置地图文档的名称
      docName: mapDocName,
      //设置地图的索引号
      mapIndex: 0,
      //是否返回由DWS所返回的原始格式信息
      returnFullStyle: true
    });
    //调用getMapInfo函数，获取地图相关信息，在回调函数中处理结果
    docCatalog.getMapInfo(getListSuccess, true, true);
  };

  //矢量地图文档目录服务（获取地图中所有图层信息）

  //获取地图中所有图层信息
  const getLayersInfo = () => {
    showResultDiv();
    //实例化Zondy.Service.Catalog.MapDoc类，设置操作的地图文档为用户指定的地图文档,地图为索引值为0的地图
    // eslint-disable-next-line
    let docCatalog = new Zondy.Catalog.MapDoc({
      ip: ip,
      port: port,
      //设置地图文档的名称
      docName: mapDocName,
      //设置地图的索引号
      mapIndex: 0
    });
    //调用getLayersInfo函数，获取地图文档中所有图层相关信息，在回调函数中处理结果
    docCatalog.getLayersInfo(getListSuccess);
  };

  //矢量地图文档目录管理（获取指定地图图层信息）

  //获取指定地图图层信息
  const getLayerInfo = () => {
    showResultDiv();
    //实例化Zondy.Service.Catalog.MapDoc类，设置操作的地图文档为用户指定的地图文档,地图为索引值为0的地图，图层为索引值为1的图层
    // eslint-disable-next-line
    let docCatalog = new Zondy.Catalog.MapDoc({
      ip: ip,
      port: port,
      //设置地图文档名称
      docName: mapDocName,
      //设置地图的索引号
      mapIndex: 0,
      //设置图层的索引号
      layerID: 1
    });
    //调用getLayerInfo函数，获取地图图层相关信息，在回调函数中处理结果
    docCatalog.getLayerInfo(getListSuccess);
  };

  //获取服务器地图文档列表成功后的回调函数
  const getListSuccess = (data) => {
    if (data && data.succeed) {
      //将一个JSON转换成一个包含JSON文本的字符串
      let formatData = JSON.stringify(data);
      //显示json字符串导到指定的div中
      // eslint-disable-next-line
      Process(formatData, 1, 'resultShow3');
    } else {
      alert('没有获取到目标信息！');
      //清空结果显示面板
      document.getElementById('resultShow3').innerHTML = '';
      return;
    }
  };

  //矢量地图文档目录服务（添加图层）
  //向矢量地图文档中添加图层(操作的是地图文档缓存文件)
  const addLayer = () => {
    showMapDiv();
    //地图文档目录服务类
    // eslint-disable-next-line
    let CatalogServer = new Zondy.Catalog.MapDoc({
      //地图文档名称
      docName: mapDocName,
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //设置地图的索引号
      mapIndex: 0
    });

    /* 添加图层使用的缓存名称
     * IGServer对地图的操作都是基于缓存在操作，而唯一标识缓冲文件的id就是guid，
     *  CatalogServer.guid = layer.options.guid这个代码的意思就是将当前显示的地图
     * 缓冲文件的guid赋给地图文档目录服务对象，指定该对象操作的地图文档是哪一个。
     * 提示：地图文档的缓存文件存放在MapGIS 10安装目录下的：Program\MapGIS.Server.DCServer\DocCache文件夹下。
     */
    CatalogServer.guid = layer.options.guid;
    let layerinfo = {
      //图层的索引号，默认为-1表示从文档末尾附加
      Index: -1,
      //图层名称
      LayerName: 'NewAddLayer',
      //图层的GDBP值
      GDBP: 'gdbp://MapGisLocal/sample/ds/地图综合/sfcls/居民地_1_3857'
    };
    //执行图层添加方法
    CatalogServer.addLayer([layerinfo], addLayerSuccess);
  };
  //添加图层成功后的回调
  const addLayerSuccess = (data) => {
    document.getElementById('resultShow3').innerHTML = ''; //清空结果显示面板
    //判断是否有返回数据，是否成功
    if (data && data.succeed) {
      if (data.succeed) {
        alert('添加完成！');
        //刷新图层
        layer.redraw();
      } else {
        alert('操作失败！');
      }
    }
  };

  //矢量地图文档目录服务（删除图层）
  //从矢量地图文档中删除指定图层(操作的是地图文档缓存文件)
  const deleteLayer = () => {
    showMapDiv();

    //地图文档目录服务类
    // eslint-disable-next-line
    let CatalogServer = new Zondy.Catalog.MapDoc({
      //地图文档名称
      docName: mapDocName,
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //是否返回由DWS所返回的原始格式信息
      returnFullStyle: true,
      //设置地图的索引号
      mapIndex: 0,
      //设置图层的索引号
      layerID: 0
    });
    //删除图层使用的缓存名称
    CatalogServer.guid = layer.options.guid;
    //执行删除图层方法
    CatalogServer.deleteLayer(deleteLayerSuccess);
  };
  //删除图层成功后的回调
  const deleteLayerSuccess = (data) => {
    //判断是否有返回数据，是否成功
    if (data && data.succeed) {
      if (data.succeed) {
        alert('删除成功！');
        //刷新图层
        layer.redraw();
      } else {
        alert('操作失败！');
      }
    }
  };

  // 矢量地图文档目录服务（更改图层顺序）

  //更改图层顺序
  const changeLayerIndex = () => {
    showMapDiv();
    //地图文档目录服务类
    // eslint-disable-next-line
    let CatalogServer = new Zondy.Catalog.MapDoc({
      //地图文档名称
      docName: mapDocName,
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //设置地图的索引号
      mapIndex: 0
    });
    //改变图层顺序使用的缓存名称
    CatalogServer.guid = layer.options.guid;
    //执行更改图层顺序方法
    CatalogServer.changeIndex([3, 2, 1, 0], changeIndexSuccess);
  };
  //更改图层顺序成功后的回调
  const changeIndexSuccess = (data) => {
    document.getElementById('resultShow3').innerHTML = ''; //清空结果显示面板
    //判断是否有返回数据，是否成功
    if (data && data.succeed) {
      if (data.succeed) {
        alert('更改完成！');
        //刷新图层
        layer.redraw();
      } else {
        alert('操作失败！');
      }
    }
  };
  //显示地图视图
  const showMapDiv = () => {
    document.getElementById('mapCon').style.display = '';
    document.getElementById('resultShow3').style.display = 'none';
  };
  //显示信息视图
  const showResultDiv = () => {
    document.getElementById('mapCon').style.display = 'none';
    document.getElementById('resultShow3').style.display = '';
  };

  useEffect(() => {
    //地图容器
    // eslint-disable-next-line
    map = L.map('mapCon', {
      //参考坐标系，默认是墨卡托坐标系（EPSG3857），EPSG4326为经纬度坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //显示中心
      center: [30.960151212033073, 103.45117566818879],
      //最小显示等级
      minZoom: 12,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 13
    });
    //矢量地图文档
    // eslint-disable-next-line
    layer = new Zondy.Map.MapDocLayer(mapDocName, {
      //访问IGServer的IP
      ip: ip,
      //访问IGServer的端口号
      port: port,
      //设置地图不连续显示
      noWrap: true,
      //设置缓存名称
      guid: new Date().getTime().toString()
    }).addTo(map);
    showMapDiv();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input
            type='button'
            value='获取地图文档列表'
            onClick={getVectorMapdocList}
          />
          <input
            type='button'
            value='获取指定地图文档的相关信息'
            onClick={getVectorMapdocInfo}
          />
          <input
            type='button'
            value='获取地图文档中指定地图的相关信息'
            onClick={getMapInfo}
          />
          <input
            type='button'
            value='获取指定地图下所有图层的图层信息'
            onClick={getLayersInfo}
          />
          <input
            type='button'
            value='获取指定地图下指定图层的相关信息'
            onClick={getLayerInfo}
          />
          <input type='button' value='添加图层' onClick={addLayer} />
          <input type='button' value='删除图层' onClick={deleteLayer} />
          <input
            type='button'
            value='更改图层顺序'
            onClick={changeLayerIndex}
          />
        </div>
        <div>
          <font>
            说明：上述为地图文档目录服务接口示例，默认操作示例数据库（sample.hdf）的地图文档，操作前请先确认此数据库已经附加，地图文档（WorldJWVector）已经发布。图层的增、删与更改顺序操作，均操作地图文档的缓存文件，每次操作前可先刷新页面。其中【获取地图文档列表】、【获取指定地图文档的相关信息】、【获取地图文档中指定地图的相关信息】、【获取指定地图下的所有图层的图层信息】、【获取指定地图下指定图层的相关信息】功能的结果显示在“结果显示”选项卡中，【添加图层】、【删除图层】、【更改图层顺序】结果可以在“地图显示”选项卡中看到。
          </font>
        </div>
        <div
          id='resultShow3'
          style={{ width: '100%', height: '90%', position: 'absolute' }}></div>
        <div
          id='mapCon'
          style={{ width: '100%', height: '90%', position: 'absolute' }}></div>
      </div>
    </React.Fragment>
  );
}
