import React, { useEffect } from 'react';

//定义地图文档图层和地图
let mapDocLayer, map;
//专题图操作对象
let ThemeOper;
//专题图信息数组
let themesInfoArr = null;
//地图文档guid
let guid;

export default function Map7View() {
  const initMap = () => {
    //随机生成一个guid
    guid = Math.floor(Math.random() * 10000000).toString();
    // eslint-disable-next-line
    map = L.map('map7', {
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
    //创建地图文档图层
    // eslint-disable-next-line
    mapDocLayer = new Zondy.Map.MapDocLayer('WorldJWVector', {
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163',
      //只显示一个图层,不平铺显示
      noWrap: true,
      //文档guid
      guid: guid
    }).addTo(map);
    document.getElementById('preview7').style.display = 'none';
  };
  // 添加专题图
  const addDotDensityThemesInfo = () => {
    //专题图信息数组
    themesInfoArr = [];
    //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
    // eslint-disable-next-line
    themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo();
    //设置图层名层
    themesInfoArr[0].LayerName = '世界政区';
    //初始化指定图层的专题图信息对象，之后再给该数组赋值
    themesInfoArr[0].ThemeArr = [];
    //实例化CDotDensityTheme类
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CDotDensityTheme();
    //专题图名称
    themesInfoArr[0].ThemeArr[0].Name = '点密度专题图';
    //单值专题图
    themesInfoArr[0].ThemeArr[0].IsBaseTheme = false;
    //可见
    themesInfoArr[0].ThemeArr[0].Visible = true;
    themesInfoArr[0].ThemeArr[0].Expression = '面积';
    //密度单元值
    themesInfoArr[0].ThemeArr[0].Value = '20';
    //实例化专题图图形信息对象
    //点图形信息
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].Info = new Zondy.Object.Theme.CPntInfo();
    themesInfoArr[0].ThemeArr[0].Info.SymID = 197;
    //覆盖方式，覆盖
    themesInfoArr[0].ThemeArr[0].Info.Ovprnt = true;
    themesInfoArr[0].ThemeArr[0].Info.Height = 5;
    themesInfoArr[0].ThemeArr[0].Info.Width = 5;
    //[子图颜色,可变颜色1,可变颜色2]
    themesInfoArr[0].ThemeArr[0].Info.OutClr = [6, 6, 6];
    //[笔宽，可变笔宽1，可变笔宽2]
    themesInfoArr[0].ThemeArr[0].Info.OutPenW = [0.05, 0.05, 0.05];

    //给指定地图文档指定图层添加专题图
    // eslint-disable-next-line
    ThemeOper = new Zondy.Service.ThemeOper(guid);
    //访问IGServer的IP
    ThemeOper.ip = 'develop.smaryun.com';
    //访问IGServer的端口号，.net版为6163，Java版为8089
    ThemeOper.port = '6163';
    //添加专题图（不是在原文档上添加，会重新生成一个专题图缓存文档）
    ThemeOper.addThemesInfo('WorldJWVector', '1', themesInfoArr, onUniqueTheme);
  };

  // 更新专题图
  const updateTheme = () => {
    //显示进度条
    startPressBar();
    themesInfoArr = [];
    //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
    // eslint-disable-next-line
    themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo();
    //设置图层名层
    themesInfoArr[0].LayerName = '世界政区';
    //初始化指定图层的专题图信息对象，之后再给该数组赋值
    themesInfoArr[0].ThemeArr = [];
    //实例化CDotDensityTheme类
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CDotDensityTheme();
    //专题图名称
    themesInfoArr[0].ThemeArr[0].Name = '点密度专题图';
    //单值专题图
    themesInfoArr[0].ThemeArr[0].IsBaseTheme = false;
    //可见
    themesInfoArr[0].ThemeArr[0].Visible = true;
    themesInfoArr[0].ThemeArr[0].Expression = '面积';
    //密度单元值
    themesInfoArr[0].ThemeArr[0].Value = '400';
    //实例化专题图图形信息对象
    //点图形信息
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].Info = new Zondy.Object.Theme.CPntInfo();
    themesInfoArr[0].ThemeArr[0].Info.SymID = 197;
    //覆盖方式，覆盖
    themesInfoArr[0].ThemeArr[0].Info.Ovprnt = true;
    themesInfoArr[0].ThemeArr[0].Info.Height = 5;
    themesInfoArr[0].ThemeArr[0].Info.Width = 5;
    //[子图颜色,可变颜色1,可变颜色2]
    themesInfoArr[0].ThemeArr[0].Info.OutClr = [6, 6, 6];
    //[笔宽，可变笔宽1，可变笔宽2]
    themesInfoArr[0].ThemeArr[0].Info.OutPenW = [0.05, 0.05, 0.05];

    //更新专题图,onUniqueTheme为回调函数
    ThemeOper.updateThemesInfo(
      'WorldJWVector',
      '1/0',
      themesInfoArr,
      onUniqueTheme
    );
  };

  // 删除专题图
  const deleteTheme = () => {
    if (themesInfoArr) {
      //显示进度条
      startPressBar();
      //删除专题图,onUniqueTheme为回调函数
      ThemeOper.removeThemesInfo('WorldJWVector', '1/0', onUniqueTheme);
      themesInfoArr = null;
    } else {
      alert('已清除或者没有该专题图信息！');
    }
  };

  // 调用专题图服务成功回调
  const onUniqueTheme = (flg) => {
    //停止进度条
    stopPressBar();
    if (flg) {
      //刷新图层前要进行此设置。加载之前的缓存文档,保证专题图能正常显示
      mapDocLayer.options.keepCache = false;
      //刷新图层，实时显示专题图
      mapDocLayer.redraw();
      //设置为读取缓存，以加快显示效率
      mapDocLayer.options.keepCache = true;
    } else {
      return false;
    }
  };

  // 停止进度条
  const stopPressBar = () => {
    document.getElementById('preview7').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview7').style.display = '';
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview7' className='preview'>
          <div className='loading'></div>
          <span>正在操作，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input
            type='button'
            id='createThemeBtn'
            value='添加专题图'
            onClick={addDotDensityThemesInfo}
          />
          <input
            type='button'
            id='updateThemeBtn'
            value='更新专题图'
            onClick={updateTheme}
          />
          <input
            type='button'
            id='deleteThemeBtn'
            value='删除专题图'
            onClick={deleteTheme}
          />
        </div>
        <div id='map7' className='map'></div>
      </div>
    </React.Fragment>
  );
}
