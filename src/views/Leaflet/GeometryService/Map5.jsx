import React from 'react';

export default function Map5View() {
  const SmoothLine = () => {
    //设置原始线坐标数组
    let dataObject = [
      {
        x: 64.3026761440958,
        y: -13.3927768273516
      },
      {
        x: 81.3250355929193,
        y: -8.44081771496663
      },
      {
        x: 72.9827194,
        y: 7.0129852
      },
      {
        x: 93.7049333738818,
        y: -2.86986371353349
      },
      {
        x: 90,
        y: 13.6363636363636
      },
      {
        x: 105.213348388672,
        y: 8.70024061203003
      }
    ];
    //创建光滑线分析服务
    // eslint-disable-next-line
    let smooth = new Zondy.Service.Smooth({
      //插值方式,可取值0、1、2、3，0为二次样条、1为三次样条、2为三次Beizer样条、3为三次B样条
      type: 2,
      //插值时的间隔步长
      step: 1,
      //访问IGServer的IP
      ip: 'develop.smaryun.com',
      //访问IGServer的端口号，.net版为6163，Java版为8089
      port: '6163'
    });
    //执行光滑线功能服务，并返回结果信息，onSuccess为回调函数
    smooth.execute(dataObject, onSuccess);
  };
  // 投影转换成功回调函数
  const onSuccess = (data) => {
    if (data && data.succeed) {
      //显示结果
      let formatData = JSON.stringify(data.value);
      //将结果显示在指定的div上
      // eslint-disable-next-line
      Process(formatData, 1, 'resultShow5');
    }
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <span>
            说明：该光滑线示例是给定原始线坐标进行光滑。原始坐标为：(64.3026761440958,-13.3927768273516),(81.3250355929193,-8.44081771496663),(72.9827194,7.0129852),(93.7049333738818,-2.86986371353349),(90,13.6363636363636),(105.213348388672,8.70024061203003)，光滑后坐标如下
          </span>
          <input
            type='button'
            id='createThemeBtn'
            value='光滑线'
            onClick={SmoothLine}
          />
        </div>
        <div id='resultShow5' className='map'></div>
      </div>
    </React.Fragment>
  );
}
