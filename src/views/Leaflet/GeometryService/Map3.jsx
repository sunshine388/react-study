import React from 'react';

export default function Map3View() {
  const ProjectDots = () => {
    //构造需投影转换的点数组
    let dots = new Array(1);
    // eslint-disable-next-line
    dots[0] = new Zondy.Object.Point2D(4819.949688726125, 67647.39383493776);
    //设置源投影参数
    // eslint-disable-next-line
    let srcProjParam = new Zondy.Service.CProjectParam({
      // 度分秒,即±DDDMMSS.SSSS格式
      ProjAngleUnit: 5,
      // 投影平面直角坐标系
      ProjType: 3,
      // 高斯-克吕格(横切椭圆柱等角)投影
      ProjTypeID: 5,
      // 厘米
      ProjUnit: 12,
      // 投影带号
      ProjZoneNO: 20,
      // 投影类型为3度分带
      ProjZoneType: 1,
      // 北京/克拉索夫斯基(1940年)椭球
      SphereID: 2,
      // 水平比例尺
      ProjRate: 5000,
      // 中央子午线经度
      ProjLon: 1170000
    });
    //设置目的投影参数
    // eslint-disable-next-line
    let desProjParam = new Zondy.Service.CProjectParam({
      // 角度单位为度
      ProjAngleUnit: 4,
      // 地理坐标系
      ProjType: 1,
      // 地理坐标系
      ProjTypeID: 0,
      // 毫米
      ProjUnit: 1,
      // 投影带号
      ProjZoneNO: 20,
      // 投影类型为6度分带
      ProjZoneType: 0,
      // 北京/克拉索夫斯基(1940年)椭球
      SphereID: 1,
      // 水平比例尺
      ProjRate: 1,
      // 中央子午线经度
      ProjLon: 1170000
    });
    //初始化投影转换服务
    // eslint-disable-next-line
    let projectDotsService = new Zondy.Service.ProjectDots(
      //设置需要投影转换的点数组
      dots,
      //设置源投影参数
      srcProjParam,
      //设置目的投影参数
      desProjParam,
      //设置Options参数,包括服务器地址、端口号、返回结果格式
      {
        //访问IGServer的IP
        ip: 'develop.smaryun.com',
        //访问IGServer的端口号，.net版为6163，Java版为8089
        port: '6163',
        //结果格式
        resultFormat: 'json'
      }
    );
    //执行点投影转换功能服务，并返回结果信息，projSuccess为回调函数
    projectDotsService.execute(projSuccess);
  };
  // 投影转换成功回调函数
  const projSuccess = (data) => {
    if (data && data.succeed) {
      //显示结果
      let formatData = JSON.stringify(data.DesDots);
      //将结果显示在指定的div上
      // eslint-disable-next-line
      Process(formatData, 1, 'resultShow3');
    }
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <span>
            说明：该点投影示例是给定坐标进行投影。投影前点的坐标为：（4819.949688726125,
            67647.39383493776），投影后的坐标如下
          </span>
          <input
            type='button'
            id='createThemeBtn'
            value='投影点'
            onClick={ProjectDots}
          />
        </div>
        <div id='resultShow3' className='map'></div>
      </div>
    </React.Fragment>
  );
}
