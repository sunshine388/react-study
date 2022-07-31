import React from 'react';

//以本地GIS数据服务器的颜色库信息为例
//IGServer数据服务器地址
let ip = 'develop.smaryun.com';
//访问IGServer的端口号，.net版为6163，Java版为8089
let port = '6163';

export default function DirectoryService8View() {
  // 颜色转换服务：根据RGB获取颜色号
  const getClrNO = () => {
    // eslint-disable-next-line
    let clrInfo = new Zondy.Catalog.ColorInfo({
      //设置服务器ip
      ip: ip,
      //设置端口号
      port: port
    });
    //调用getColorNO接口，根据RGB值获取颜色库中的颜色号，回调中处理结果
    clrInfo.getColorNO(
      {
        Blue: 102,
        Green: 204,
        Red: 255,
        SystemLibID: 1,
        addNew: true
      },
      getClrNOSuccess,
      function() {},
      {}
    );
  };
  const getClrNOSuccess = (data) => {
    if (data && data.succeed) {
      //将一个JSON转换成一个包含JSON文本的字符串
      let formatData = JSON.stringify(data);
      //显示json字符串导到指定的div中
      // eslint-disable-next-line
      Process(formatData, 1, 'resultShow8');
    } else {
      alert('没有获取到目标信息！');
      //清空结果显示面板
      document.getElementById('resultShow8').innerHTML = '';
    }
  };
  // 颜色转换服务：根据颜色号获取RGB
  const getClrRGB = () => {
    //显示结果tab页
    // eslint-disable-next-line
    let clrInfo = new Zondy.Catalog.ColorInfo({
      ip: ip,
      port: port
    });
    //调用getColorRGB接口，根据颜色库中的颜色号获取RGB值，回调中处理结果
    clrInfo.getColorRGB(
      {
        SystemLibID: 1,
        ColorNO: 1283
      },
      getClrRGBSuccess
    );
  };
  const getClrRGBSuccess = (data) => {
    if (data && data.succeed) {
      //将一个JSON转换成一个包含JSON文本的字符串
      let formatData = JSON.stringify(data);
      //显示json字符串导到指定的div中
      // eslint-disable-next-line
      Process(formatData, 1, 'resultShow8');
    } else {
      alert('没有获取到目标信息！');
      //清空结果显示面板
      document.getElementById('resultShow8').innerHTML = '';
    }
  };
  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input
            type='button'
            value='根据RGB值获取该颜色在颜色库中的颜色号'
            onClick={getClrNO}
          />
          <input
            type='button'
            value='根据颜色号获取颜色RGB值'
            onClick={getClrRGB}
          />
        </div>
        <div>
          <font>
            注意：上述为颜色转换服务接口示例，默认使用本地GIS数据服务器的颜色库。
          </font>
        </div>
        <div id='resultShow8'></div>
      </div>
    </React.Fragment>
  );
}
