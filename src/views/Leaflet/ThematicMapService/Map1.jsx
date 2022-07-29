import React from 'react';

//获取该guid文档的专题图信息
let guid = 'DB0C04B3-CA76-950B-9D7A-F4EA22A85418';

export default function Map1View() {
  // 获取专题图信息
  const getThemesInfo = () => {
    //创建专题图操作对象
    // eslint-disable-next-line
    let ThemeOper = new Zondy.Service.ThemeOper(guid);
    //访问IGServer的IP
    ThemeOper.ip = 'develop.smaryun.com';
    //访问IGServer的端口号，.net版为6163，Java版为8089
    ThemeOper.port = '6163';
    //获取专题图信息,getThemesInfoSuccess为回调函数
    ThemeOper.getThemesInfo('WorldTheme', '1', getThemesInfoSuccess);
  };

  //获取专题图信息回调函数
  const getThemesInfoSuccess = (data) => {
    if (data != null) {
      //将JSON对象转换成JSON字符串
      let formatData = JSON.stringify(data[0].ThemeArr[0]);
      //将结果显示在指定的div上
      // eslint-disable-next-line
      Process(formatData, 1, 'resultShow1');
    }
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <span>该示例为获取指定guid文档的专题图信息</span>
          <input type='button' value='获取专题图信息' onClick={getThemesInfo} />
        </div>
        <div id='resultShow1' className='map'></div>
      </div>
    </React.Fragment>
  );
}
