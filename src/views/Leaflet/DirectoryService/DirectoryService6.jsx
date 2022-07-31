import React from 'react';

//以本地数据源中目标数据库的空间参考系信息为例，用户可设置其目标数据库
//访问IGServer的IP
let ip = 'develop.smaryun.com';
//访问IGServer的端口号，.net版为6163，Java版为8089
let port = '6163';
//用户名
let user = '';
//用户密码
let password = '';
//数据源名称
let srvName = 'MapGISLocal';
//数据库名称
let GDBName = 'sample';

//实例化GDBInfo类，设置目标数据源与GDB
// eslint-disable-next-line
let GDBSvr = new Zondy.Catalog.GDBInfo({
  //访问IGServer的IP
  ip: ip,
  //访问IGServer的端口号
  port: port,
  //设置数据源名称
  serverName: srvName,
  //设置数据源的用户名
  User: user,
  //设置数据源的用户密码
  Password: password,
  //设置数据库名称
  gdbName: GDBName
});

export default function DirectoryService6View() {
  //获取参照系列表
  const getProjectList = () => {
    //调用getProjectList接口获取目标数据库的参考系列表，回调中处理结果
    GDBSvr.getProjectList(getSuccess);
  };
  //获取参照系信息
  const getProjectInfo = () => {
    //调用getProjectInfo接口获取目标数据库中某一参考系的信息，回调中处理结果
    GDBSvr.getProjectInfo(440, getSuccess);
  };
  // 成功回调函数
  const getSuccess = (data) => {
    if (data && data.succeed) {
      //将一个JSON转换成一个包含JSON文本的字符串
      let formatData = JSON.stringify(data);
      //显示json字符串导到指定的div中
      // eslint-disable-next-line
      Process(formatData, 1, 'resultShow6');
    } else {
      alert('没有获取到目标信息！');
      //清空结果显示面板
      document.getElementById('resultShow6').innerHTML = '';
    }
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input
            type='button'
            value='获取参照系列表'
            onClick={getProjectList}
          />
          <input
            type='button'
            value='获取参照系信息'
            onClick={getProjectInfo}
          />
        </div>
        <div>
          <font>
            注意：上述为GDB的空间参考系服务接口示例，默认使用平台示例数据库sample.hdf，操作前请先确认此数据库已经附加。
          </font>
        </div>
        <div id='resultShow6'></div>
      </div>
    </React.Fragment>
  );
}
