import React from 'react';

//访问IGServer的IP
let ip = 'develop.smaryun.com';
//访问IGServer的端口号，.net版为6163，Java版为8089
let port = '6163';
//示例数据源名称
let servername = 'MapGISLocal';
//示例数据库名称
let gdbName = 'NewAttachGDB';
//新建的数据库名称
let CreatGDBname = 'NewCreateGDB';
//用户名
let user = '';
//用户密码
let password = '';

export default function DirectoryService1View() {
  const getSvrList = () => {
    //实例化GDBInfo类，默认获取本地GIS服务器数据源
    // eslint-disable-next-line
    let catalogSvr = new Zondy.Catalog.GDBInfo({
      //访问IGServer的IP
      ip: ip,
      //设置端口号
      port: port
    });
    //调用获取数据源列表接口，回调函数中处理结果
    catalogSvr.getServerList(getSvrListSuccess);
  };
  //获取成功之后的回调函数
  const getSvrListSuccess = (data) => {
    //判断是否有返回数据，是否成功
    if (data && data.succeed) {
      if (data.value.length === 0) {
        alert('没有获取到数据源列表！');
        //清空结果显示面板
        document.getElementById('resultShow1').innerHTML = '';
        return;
      } else {
        //将一个JSON转换成一个包含JSON文本的字符串
        let formatData = JSON.stringify(data.value);
        //显示json字符串导到指定的div中
        // eslint-disable-next-line
        Process(formatData, 1, 'resultShow1');
      }
    }
  };
  //获取数据源下的数据库列表
  const getGDBList = () => {
    //实例化GDBInfo类，设置数据源信息
    // eslint-disable-next-line
    let catalogSvr = new Zondy.Catalog.GDBInfo({
      //访问IGServer的IP
      ip: ip,
      //访问IGServer的端口号
      port: port,
      //设置数据源名称
      serverName: servername,
      //设置数据源的用户名
      User: user,
      //设置数据源的用户密码
      Password: password
    });
    //调用获取数据源的数据库列表接口，回调函数中处理结果
    catalogSvr.getGDBList(getGDBListSuccess);
  };
  const getGDBListSuccess = (data) => {
    //判断是否有返回数据，是否成功
    if (data && data.succeed) {
      if (data.value.length === 0) {
        alert('没有获取到数据库列表！');
        //清空结果显示面板
        document.getElementById('resultShow1').innerHTML = '';
        return;
      } else {
        //将一个JSON转换成一个包含JSON文本的字符串
        let formatData = JSON.stringify(data.value);
        //显示json字符串导到指定的div中
        // eslint-disable-next-line
        Process(formatData, 1, 'resultShow1');
      }
    }
  };
  //附加地理数据库
  const AtachGDB = () => {
    //创建操作的数据库对象，默认操作本地数据源
    // eslint-disable-next-line
    let catalogSvr = new Zondy.Catalog.GDBInfo({
      //访问IGServer的IP
      ip: ip,
      //访问IGServer的端口号
      port: port,
      //数据库名称（若不设置默认为数据库文件名称）
      gdbName: gdbName,
      //数据源名称
      serverName: servername
    });
    //调用附加GDB接口，回调函数中处理结果
    catalogSvr.AttachGDB(
      'C:/MapGIS 10/Sample/NewAttachGDB.hdf',
      AtachGDBSuccess,
      AtachGDBError
    );
  };
  const AtachGDBSuccess = (data) => {
    //判断是否有返回数据，是否成功
    if (data && data.succeed) {
      if (data.succeed) {
        alert('附加数据库成功！');
        //操作成功后获取GDB列表确认
        getGDBList();
      } else {
        alert('操作失败！');
      }
    }
  };
  const AtachGDBError = () => {
    alert('附加失败，请检查是否已经附加');
    //操作成功后获取GDB列表确认
    getGDBList();
  };
  //注销地理数据库
  const DetachGDB = () => {
    //创建操作的数据库对象
    // eslint-disable-next-line
    let catalogSvr = new Zondy.Catalog.GDBInfo({
      ip: ip,
      port: port,
      //数据库名称
      gdbName: gdbName,
      //数据源名称
      serverName: servername
    });
    //调用注销GDB接口，回调函数中处理结果
    catalogSvr.DetachGDB(DetachGDBSuccess, DetachGDBError);
  };
  const DetachGDBSuccess = (data) => {
    //判断是否有返回数据，是否成功
    if (data && data.succeed) {
      if (data.succeed) {
        alert('注销数据库成功！');
        //操作成功后获取GDB列表确认
        getGDBList();
      } else {
        alert('操作失败！');
      }
    }
  };
  const DetachGDBError = () => {
    alert('注销失败，请检查该数据库是否附加');
    //操作成功后获取GDB列表确认
    getGDBList();
  };
  //创建地理数据库
  const CreateGDB = () => {
    //创建操作的数据库对象
    // eslint-disable-next-line
    let catalogSvr = new Zondy.Catalog.GDBInfo({
      ip: ip,
      port: port,
      //数据库名称
      gdbName: CreatGDBname,
      //数据源名称
      serverName: servername
    });
    //调用创建GDB接口，回调函数中处理结果
    catalogSvr.CreateGDB(
      'C:/MapGIS 10/Sample/NewCreateGDB.hdf',
      CreateGDBSuccsee
    );
  };
  const CreateGDBSuccsee = (data) => {
    if (data && data.succeed) {
      alert('操作成功！');
      getGDBList(); //操作后获取GDB列表确认
    } else {
      alert(
        '操作失败，请确认当前数据库中是否已存在该名称的数据，若存在，请修改此方法中gdbName的值，然后再次运行！'
      );
    }
  };
  //删除地理数据库
  const DeleteGDB = () => {
    //创建操作的数据库对象
    // eslint-disable-next-line
    let catalogSvr = new Zondy.Catalog.GDBInfo({
      ip: ip,
      port: port,
      //数据库名称
      gdbName: CreatGDBname,
      //数据源名称
      serverName: servername
    });
    //调用删除GDB接口，回调函数中处理结果
    catalogSvr.DeleteGDB(DeleteGDBSuccess);
  };
  const DeleteGDBSuccess = (data) => {
    if (data && data.succeed) {
      alert('操作成功！');
      getGDBList(); //操作后获取GDB列表确认
    } else {
      alert(
        '操作失败，请确认当前删除的数据库是否存在，建议删除自己创建的数据库,请不要删除原有的，以免不可恢复！'
      );
    }
  };

  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input type='button' value='获取数据源列表' onClick={getSvrList} />
          <input
            type='button'
            value='获取指定数据源下的数据库列表'
            onClick={getGDBList}
          />
          <input type='button' value='附加地理数据库' onClick={AtachGDB} />
          <input type='button' value='注销地理数据库' onClick={DetachGDB} />
          <input type='button' value='创建地理数据库' onClick={CreateGDB} />
          <input type='button' value='删除地理数据库' onClick={DeleteGDB} />
        </div>
        <div>
          <font>
            说明：附加与注销功能以自定义的数据库test.hdf为例，先确定已附加此数据库后再进行注销操作；
            创建与删除功能则以自定义的NewCreateGDB.hdf为例，先创建后删除。
          </font>
          <br />
          <font color='red'>
            注意：删除是彻底删除数据库文件，若删除有数据的GDB则最好先进行数据库备份，避免误删除。
          </font>
        </div>
        <div id='resultShow1'></div>
      </div>
    </React.Fragment>
  );
}
