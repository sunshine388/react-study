import React, { useEffect } from 'react';

//定义地图文档图层和地图
let mapDocLayer, map;
//专题图操作对象
let ThemeOper;
//专题图信息数组
let themesInfoArr = null;
//地图文档guid
let guid;

export default function Map2View() {
  const initMap = () => {
    //随机生成一个guid
    guid = Math.floor(Math.random() * 10000000).toString();
    // eslint-disable-next-line
    map = L.map('map2', {
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
      //添加guid
      guid: guid
    }).addTo(map);
    //初始化专题图服务类
    // eslint-disable-next-line
    ThemeOper = new Zondy.Service.ThemeOper(guid);
    //访问IGServer的IP
    ThemeOper.ip = 'develop.smaryun.com';
    //访问IGServer的端口号，.net版为6163，Java版为8089
    ThemeOper.port = '6163';
    document.getElementById('preview2').style.display = 'none';
  };
  // 添加专题图
  const addUniqueThemesInfo = () => {
    //专题图信息数组
    themesInfoArr = [];
    //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
    // eslint-disable-next-line
    themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo();
    //设置图层名层
    themesInfoArr[0].LayerName = '世界政区';
    //初始化指定图层的专题图信息对象，之后再给该数组赋值
    themesInfoArr[0].ThemeArr = [];
    //实例化CUniqueTheme类
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CUniqueTheme();
    themesInfoArr[0].ThemeArr[0].Name = '单值专题图';
    //指定为单值的专题图
    themesInfoArr[0].ThemeArr[0].IsBaseTheme = true;
    themesInfoArr[0].ThemeArr[0].Visible = true;
    themesInfoArr[0].ThemeArr[0].GeoInfoType = 'Reg';
    themesInfoArr[0].ThemeArr[0].Expression = 'name';
    //未分段值的图形信息设置
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].DefaultInfo = new Zondy.Object.Theme.CThemeInfo();
    themesInfoArr[0].ThemeArr[0].DefaultInfo.Caption = '未分类';
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo = new Zondy.Object.Theme.CRegInfo();
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Ovprnt = true;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Angle = 0;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.EndClr = 0;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillClr = 2;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillMode = 0;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FullPatFlg = true;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatClr = 45;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatHeight = 5;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatWidth = 5;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatID = 0;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.OutPenW = 1;

    //每段专题绘制信息
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr = [];
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0] = new Zondy.Object.Theme.CUniqueThemeInfo();
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].Value = '中国';
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].Caption = '中国';
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].IsVisible = true;
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].RegInfo = new Zondy.Object.Theme.CRegInfo();
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].RegInfo.FillClr = 110;
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1] = new Zondy.Object.Theme.CUniqueThemeInfo();
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].Value = '俄罗斯';
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].Caption = '俄罗斯';
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].IsVisible = true;
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].RegInfo = new Zondy.Object.Theme.CRegInfo();
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].RegInfo.FillClr = 5;

    //添加专题图（不是在原文档上添加，会重新生成一个专题图缓存文档）
    ThemeOper.addThemesInfo('WorldJWVector', '1', themesInfoArr, onUniqueTheme);
  };

  // 更新专题图
  const updateTheme = () => {
    //显示进度条
    startPressBar();
    //随机输出1~100之间的整数,作为更新专题图的填充色
    let themeColor1 = Math.floor(Math.random() * 100 + 1);
    let themeColor2 = Math.floor(Math.random() * 100 + 1);
    let themesInfoArr = [];
    //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
    // eslint-disable-next-line
    themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo();
    //设置图层名层
    themesInfoArr[0].LayerName = '世界政区';
    //初始化指定图层的专题图信息对象，之后再给该数组赋值
    themesInfoArr[0].ThemeArr = [];
    //实例化CUniqueTheme类
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CUniqueTheme();
    themesInfoArr[0].ThemeArr[0].Name = '单值专题图';
    //指定为单值的专题图
    themesInfoArr[0].ThemeArr[0].IsBaseTheme = true;
    themesInfoArr[0].ThemeArr[0].Visible = true;
    themesInfoArr[0].ThemeArr[0].GeoInfoType = 'Reg';
    themesInfoArr[0].ThemeArr[0].Expression = 'name';
    //未分段值的图形信息设置
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].DefaultInfo = new Zondy.Object.Theme.CThemeInfo();
    themesInfoArr[0].ThemeArr[0].DefaultInfo.Caption = '未分类';
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo = new Zondy.Object.Theme.CRegInfo();
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Ovprnt = true;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.Angle = 0;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.EndClr = 0;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillClr = 12;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FillMode = 0;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.FullPatFlg = true;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatClr = 45;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatHeight = 5;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatWidth = 5;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.PatID = 0;
    themesInfoArr[0].ThemeArr[0].DefaultInfo.RegInfo.OutPenW = 1;

    //每段专题绘制信息
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr = [];
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0] = new Zondy.Object.Theme.CUniqueThemeInfo();
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].Value = '中国';
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].Caption = '中国';
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].IsVisible = true;
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].RegInfo = new Zondy.Object.Theme.CRegInfo();
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[0].RegInfo.FillClr = themeColor1;
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1] = new Zondy.Object.Theme.CUniqueThemeInfo();
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].Value = '俄罗斯';
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].Caption = '俄罗斯';
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].IsVisible = true;
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].RegInfo = new Zondy.Object.Theme.CRegInfo();
    themesInfoArr[0].ThemeArr[0].UniqueThemeInfoArr[1].RegInfo.FillClr = themeColor2;

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
    document.getElementById('preview2').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview2').style.display = '';
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview2' className='preview'>
          <div className='loading'></div>
          <span>正在操作，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input
            type='button'
            id='createThemeBtn'
            value='添加专题图'
            onClick={addUniqueThemesInfo}
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
        <div id='map2' className='map'></div>
      </div>
    </React.Fragment>
  );
}
