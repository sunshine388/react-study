import React from 'react';

export default function Map1View() {
  // 获取专题图信息
  const GetDocImage = () => {
    //创建获取地图文档图片信息服务
    // eslint-disable-next-line
    let DocImageService = new Zondy.Service.GetDocImageService({
      //发布的地图文档名称
      docName: 'WorldJWEdit',
      //图片宽
      picWidth: 500,
      //图片高
      picHeight: 600,
      //图片类型
      picType: 'png',
      //取图范围，依次是xmin、ymin、xmax、ymax
      bbox: '50,0,140,90',
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //获取地图文档图片url路径
    let docUrl = DocImageService.GetMapImage();
    //将JSON对象转换成JSON字符串
    // let formatData = JSON.stringify(docUrl);
    //显示url结果，并设置链接供用户查看
    document.getElementById('show1').innerHTML = docUrl;
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input
            type='button'
            value='获取地图文档图片URL'
            onClick={GetDocImage}
          />
        </div>
        <div id='resultShow1' className='map'>
          <font>地图文档图片的URL为：</font>
          <div id='show1' target='blank'></div>
        </div>
      </div>
    </React.Fragment>
  );
}
