import React from 'react';

//访问IGServer的IP
let ip = 'develop.smaryun.com';
//访问IGServer的端口号，.net版为6163，Java版为8089
let port = '6163';
//示例数据源名称
let srvName = 'MapGISLocal';
//示例数据库名称
let GDBName = 'sample';
//用户名
let user = '';
//用户密码
let password = '';

//实例化GDBInfo类，设置目标数据源与GDB
// eslint-disable-next-line
let catalogSvr = new Zondy.Catalog.GDBInfo({
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

export default function DirectoryService2View() {
  //获取指定数据库下要素数据集列表
  const getDSList = () => {
    //通过实例化的GDBInfo类对象调用getDsList接口，回调中处理结果
    catalogSvr.getDsList(getListSuccess);
  };
  //获取指定数据库下所有栅格目录列表
  const getRcsList = () => {
    //通过实例化的GDBInfo类对象调用getRcsList接口，回调中处理结果
    catalogSvr.getRcsList(getListSuccess);
  };
  const getListSuccess = (data) => {
    if (data && data.succeed) {
      if (data.value && data.value.length === 0) {
        alert('没有获取到信息！');
        //清空结果显示面板
        document.getElementById('resultShow2').innerHTML = '';
        return;
      } else {
        //将一个JSON转换成一个包含JSON文本的字符串
        let formatData = JSON.stringify(data.value);
        //显示json字符串导到指定的div中
        // eslint-disable-next-line
        Process(formatData, 1, 'resultShow2');
      }
    }
  };
  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input
            type='button'
            value='获取指定GDB下要素数据集列表'
            onClick={getDSList}
          />
          <input
            type='button'
            value='获取指定GDB下栅格目录列表'
            onClick={getRcsList}
          />
        </div>
        <div>
          <font>
            注意：上述为GDB的目录服务接口示例，默认使用平台示例数据库sample.hdf，操作前请先确认此数据库已经附加。
          </font>
        </div>
        <div id='resultShow2'></div>
      </div>
    </React.Fragment>
  );
}
