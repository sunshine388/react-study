import React, { useEffect } from 'react';

//定义地图文档图层和地图
let mapDocLayer, map;
//专题图操作对象
let ThemeOper;
//专题图信息数组
let themesInfoArr = null;
//地图文档guid
let guid;

export default function Map6View() {
  const initMap = () => {
    //随机生成一个guid
    guid = Math.floor(Math.random() * 10000000).toString();
    // eslint-disable-next-line
    map = L.map('map6', {
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
    document.getElementById('preview6').style.display = 'none';
  };
  // 添加专题图
  const addChartThemesInfo = () => {
    //专题图信息数组
    themesInfoArr = [];
    //初始化Zondy.Object.Theme.ThemesInfo，用于设置需添加的专题相关信息
    // eslint-disable-next-line
    themesInfoArr[0] = new Zondy.Object.Theme.ThemesInfo();
    //设置图层名层
    themesInfoArr[0].LayerName = '世界政区';
    //初始化指定图层的专题图信息对象，之后再给该数组赋值
    themesInfoArr[0].ThemeArr = [];
    //实例化CChartTheme类
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CChartTheme();
    //专题图名称
    themesInfoArr[0].ThemeArr[0].Name = '统计专题图';
    themesInfoArr[0].ThemeArr[0].ChartType =
      // eslint-disable-next-line
      Zondy.Object.Theme.CChartType.Bar3D;
    //ChartThemeInfoArr设置
    //设置指定专题图的专题信息，专题图可以有多个专题信息
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr = [];
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0] = new Zondy.Object.Theme.CChartThemeInfo();
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].Expression = '面积';
    //必须要填写,否则会出错dcserver会挂掉
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].Caption = '面积';
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].IsVisible = true;
    //实例化CRegInfo类
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo = new Zondy.Object.Theme.CRegInfo();
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.Angle = 0;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.EndClr = 0;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.FillClr = 81;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.FillMode = 0;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.FullPatFlg = true;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.PatClr = 3;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.PatHeight = 5;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.PatWidth = 5;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.OutPenW = 1;
    //RepresentInfo设置
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].RepresentInfo = new Zondy.Object.Theme.CChartThemeRepresentInfo();
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].RepresentInfo.AnnInfoLabel = new Zondy.Object.Theme.CAnnInfo();
    //标注(参数值)覆盖方式：覆盖
    themesInfoArr[0].ThemeArr[0].RepresentInfo.AnnInfoLabel.Ovprnt = true;
    //小数位数
    themesInfoArr[0].ThemeArr[0].RepresentInfo.DigitLabel = 7;
    //是否显示参数值
    themesInfoArr[0].ThemeArr[0].RepresentInfo.IsDrawLabel = true;
    //参数值类型：真实值
    themesInfoArr[0].ThemeArr[0].RepresentInfo.FormatLabel =
      // eslint-disable-next-line
      Zondy.Object.Theme.CChartLabelFormat.Value;
    //直方图,折线图，点图属性设置
    //最大高度
    themesInfoArr[0].ThemeArr[0].RepresentInfo.MaxLength = 120;
    //厚度
    themesInfoArr[0].ThemeArr[0].RepresentInfo.ThickPersent = 10;
    //直方图中的宽度或折线图中的横向间隔
    themesInfoArr[0].ThemeArr[0].RepresentInfo.Width = 2;
    //点图半径或折线图中的点半径
    themesInfoArr[0].ThemeArr[0].RepresentInfo.PlotRadius = 1;
    //饼图属性设置
    //最小半径
    themesInfoArr[0].ThemeArr[0].RepresentInfo.MinRadius = 2;
    //角度
    themesInfoArr[0].ThemeArr[0].RepresentInfo.PieTiltedAngle = 30;
    //固定大小
    themesInfoArr[0].ThemeArr[0].RepresentInfo.PieSizeFixFlag = 1;

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
    //实例化CChartTheme类
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0] = new Zondy.Object.Theme.CChartTheme();
    //专题图名称
    themesInfoArr[0].ThemeArr[0].Name = '统计专题图';
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].ChartType = Zondy.Object.Theme.CChartType.Pie;
    //ChartThemeInfoArr设置
    //设置指定专题图的专题信息，专题图可以有多个专题信息
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr = [];
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0] = new Zondy.Object.Theme.CChartThemeInfo();
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].Expression = '面积';
    //必须要填写,否则会出错dcserver会挂掉
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].Caption = '面积';
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].IsVisible = true;
    //实例化CRegInfo类
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo = new Zondy.Object.Theme.CRegInfo();
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.Angle = 0;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.EndClr = 0;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.FillClr = 81;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.FillMode = 0;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.FullPatFlg = true;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.PatClr = 3;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.PatHeight = 5;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.PatWidth = 5;
    themesInfoArr[0].ThemeArr[0].ChartThemeInfoArr[0].RegInfo.OutPenW = 1;
    //RepresentInfo设置
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].RepresentInfo = new Zondy.Object.Theme.CChartThemeRepresentInfo();
    // eslint-disable-next-line
    themesInfoArr[0].ThemeArr[0].RepresentInfo.AnnInfoLabel = new Zondy.Object.Theme.CAnnInfo();
    //标注(参数值)覆盖方式：覆盖
    themesInfoArr[0].ThemeArr[0].RepresentInfo.AnnInfoLabel.Ovprnt = true;
    //小数位数
    themesInfoArr[0].ThemeArr[0].RepresentInfo.DigitLabel = 7;
    //是否显示参数值
    themesInfoArr[0].ThemeArr[0].RepresentInfo.IsDrawLabel = true;
    //参数值类型：真实值
    themesInfoArr[0].ThemeArr[0].RepresentInfo.FormatLabel =
      // eslint-disable-next-line
      Zondy.Object.Theme.CChartLabelFormat.Value;
    //直方图,折线图，点图属性设置
    //最大高度
    themesInfoArr[0].ThemeArr[0].RepresentInfo.MaxLength = 120;
    //厚度
    themesInfoArr[0].ThemeArr[0].RepresentInfo.ThickPersent = 10;
    //直方图中的宽度或折线图中的横向间隔
    themesInfoArr[0].ThemeArr[0].RepresentInfo.Width = 2;
    //点图半径或折线图中的点半径
    themesInfoArr[0].ThemeArr[0].RepresentInfo.PlotRadius = 1;
    //饼图属性设置
    //最小半径
    themesInfoArr[0].ThemeArr[0].RepresentInfo.MinRadius = 2;
    //角度
    themesInfoArr[0].ThemeArr[0].RepresentInfo.PieTiltedAngle = 30;
    //固定大小
    themesInfoArr[0].ThemeArr[0].RepresentInfo.PieSizeFixFlag = 1;

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
    document.getElementById('preview6').style.display = 'none';
  };

  // 开始进度条动画
  const startPressBar = () => {
    document.getElementById('preview6').style.display = '';
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div className='map_container'>
        <div id='preview6' className='preview'>
          <div className='loading'></div>
          <span>正在操作，请稍候</span>
        </div>
        <div className='ToolLib'>
          <input
            type='button'
            id='createThemeBtn'
            value='添加专题图'
            onClick={addChartThemesInfo}
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
        <div id='map6' className='map'></div>
      </div>
    </React.Fragment>
  );
}
