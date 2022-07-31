import React from 'react';

//以本地数据源下的平台示例数据库sample.hdf为例，用户可设置其目标数据库
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

//实例化VectorLayer类，设置目标数据源与GDB
// eslint-disable-next-line
let vectorLayerInfo = new Zondy.Catalog.VectorLayer({
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

export default function DirectoryService4View() {
  // 获取指定数据库/要素数据集下简单要素类信息
  const getSfclsList = (type) => {
    //获取指定GDB下所有简单要素类列表
    if (type === 'db') {
      //通过实例化的VectorLayer类对象调用getSfclsList接口， 回调中处理结果信息
      vectorLayerInfo.getSfclsList(getListSuccess);
    }
    //获取指定要素数据集下简单要素类列表
    else if (type === 'ds') {
      //设置目标要素数据集名称
      vectorLayerInfo.dsName = '地图综合';
      //通过实例化的VectorLayer类对象调用getDsSfclsList接口， 回调中处理结果信息
      vectorLayerInfo.getDsSfclsList(getListSuccess);
    }
  };

  //获取指定数据库/要素数据集下注记类信息/
  const getAclsList = (type) => {
    //获取指定GDB下的所有注记类列表
    if (type === 'db') {
      //通过实例化的VectorLayer类对象调用getAclsList接口， 回调中处理结果信息
      vectorLayerInfo.getAclsList(getListSuccess);
    }
    //获取GDB指定要素数据集下的注记类列表
    else if (type === 'ds') {
      //设置目标要素数据集名称
      vectorLayerInfo.dsName = '矢量校正';
      //通过实例化的VectorLayer类对象调用getDsAclsList接口， 回调中处理结果信息
      vectorLayerInfo.getDsAclsList(getListSuccess);
    }
  };

  //获取指定数据库/要素数据集下对象类信息/
  const getOclsList = (type) => {
    //获取指定GDB下的所有对象类列表
    if (type === 'db') {
      // 通过实例化的VectorLayer类对象调用getOclsList接口， 回调中处理结果信息
      vectorLayerInfo.getOclsList(getListSuccess);
    }
    //获取GDB指定要素数据集下的对象类列表
    else if (type === 'ds') {
      //设置目标要素数据集名称
      vectorLayerInfo.dsName = '矢量校正';
      //通过实例化的VectorLayer类对象调用getDsOclsList接口， 回调中处理结果信息
      vectorLayerInfo.getDsOclsList(getListSuccess);
    }
  };

  //获取指定数据库/要素数据集下网络类信息/
  const getNclsList = (type) => {
    //获取指定GDB下的所有网络类列表
    if (type === 'db') {
      //通过实例化的VectorLayer类对象调用getOclsList接口， 回调中处理结果信息
      vectorLayerInfo.getNclsList(getListSuccess);
    }
    //获取GDB指定要素数据集下的网络类列表
    else if (type === 'ds') {
      //设置目标要素数据集名称
      vectorLayerInfo.dsName = '网络分析';
      //通过实例化的VectorLayer类对象调用getDsNclsList接口， 回调中处理结果信息
      vectorLayerInfo.getDsNclsList(getListSuccess);
    }
  };

  //栅格目录管理（获取指定数据库/栅格目录下栅格数据集列表）/
  const getRdsList = (type) => {
    //获取指定GDB下的所有栅格数据集列表
    if (type === 'db') {
      //通过实例化的VectorLayer类对象调用getRdsList接口， 回调中处理结果信息
      vectorLayerInfo.getRdsList(getListSuccess);
    }
    //获取GDB指定栅格目录下的栅格数据集列表
    else if (type === 'rcs') {
      //设置目标栅格目录的名称
      vectorLayerInfo.rcsName = '栅格目录';
      //通过实例化的VectorLayer类对象调用getRdsList接口， 回调中处理结果信息
      vectorLayerInfo.getRdsListInRcs(getListSuccess);
    }
  };

  //矢量图层服务（获取指定数据库/要素数据集下指定图层类型的图层列表信息
  const getLayerList = (type) => {
    //获取GDB下指定类型(如注记类“acls”)的图层列表
    if (type === 'db') {
      //实例化的VectorLayer类对象调用getLayerList接口， 回调中处理结果信息
      vectorLayerInfo.getLayerList('acls', getListSuccess);
    }
    //获取GDB下指定要素数据集内的指定类型（如简单要素类“sfcls”）的图层列表信息
    else if (type === 'ds') {
      //设置目标要素数据集名称
      vectorLayerInfo.dsName = '网络分析';
      //实例化的VectorLayer类对象调用getLayerListInDS接口， 回调中处理结果信息
      vectorLayerInfo.getLayerListInDS('sfcls', getListSuccess);
    }
  };
  //回调函数，处理显示结果信息
  const getListSuccess = (data) => {
    if (data && data.succeed) {
      if (data.value && data.value.length === 0) {
        alert('没有获取到目标信息！');
        //清空结果显示面板
        document.getElementById('resultShow4').innerHTML = '';
        return;
      } else {
        //将一个JSON转换成一个包含JSON文本的字符串
        let formatData = JSON.stringify(data.value);
        //显示json字符串导到指定的div中
        // eslint-disable-next-line
        Process(formatData, 1, 'resultShow4');
      }
    }
  };

  //在指定GDB中创建一个图层
  const CreateVectCls = () => {
    //实例化图层对象
    // eslint-disable-next-line
    let VectCls = new Zondy.Object.VectCls({
      clsType: 'SfeatureCls',
      clsName: '新图层',
      attStruct: {
        FldName: [
          'ID',
          'name',
          'addrass',
          'picture',
          'city',
          'LayerID',
          'mpLayer'
        ],
        FldNumber: '7',
        FldType: [
          'long',
          'string',
          'string',
          'string',
          'string',
          'long',
          'long'
        ]
      }
    });
    //通过实例化的VectorLayer类对象调用CreateVectCls接口， 回调中处理结果信息
    vectorLayerInfo.CreateVectCls(
      VectCls,
      CreateVectClsSuccess,
      CreateVectClsError
    );
  };
  const CreateVectClsSuccess = (data) => {
    if (data.succeed) {
      alert('创建图层操作成功！');
      //结果面板显示目标GDB的所有简单要素类
      getSfclsList('db');
    } else {
      alert('创建图层操作失败！');
      //清空结果显示面板
      document.getElementById('resultShow4').innerHTML = '';
    }
  };
  const CreateVectClsError = () => {
    alert('创建图层操作失败！请检查是否存在重名图层');
    //清空结果显示面板
    document.getElementById('resultShow4').innerHTML = '';
  };
  //在指定GDB中删除某一个图层数据
  const deleteXCls = () => {
    //通过实例化的VectorLayer类对象调用deleteXCls接口， 回调中处理结果信息
    vectorLayerInfo.deleteXCls(
      'SfeatureCls',
      '新图层',
      deleteXClsSuccess,
      deleteXClsError
    );
  };
  const deleteXClsSuccess = (data) => {
    if (data.succeed) {
      alert('删除图层操作成功！');
      //结果面板显示目标GDB的所有简单要素类
      getSfclsList('db');
    } else {
      alert('删除图层操作失败！');
      //清空结果显示面板
      document.getElementById('resultShow4').innerHTML = '';
    }
  };
  const deleteXClsError = () => {
    alert('删除图层操作失败！请检查图层是否存在');
    //清空结果显示面板
    document.getElementById('resultShow4').innerHTML = '';
  };
  return (
    <React.Fragment>
      <div className='map_container'>
        <div className='ToolLib'>
          <input
            type='button'
            value='获取指定GDB下所有简单要素类列表'
            onClick={() => getSfclsList('db')}
          />
          <input
            type='button'
            value='获取指定要素集下简单要素类列表'
            onClick={() => getSfclsList('ds')}
          />
          <input
            type='button'
            value='获取指定GDB下所有注记类列表'
            onClick={() => getAclsList('db')}
          />
          <input
            type='button'
            value='获取指定要素集下注记类列表'
            onClick={() => getAclsList('ds')}
          />
          <input
            type='button'
            value='获取指定GDB下所有对象类列表'
            onClick={() => getOclsList('db')}
          />
          <input
            type='button'
            value='获取指定要素集下对象类列表'
            onClick={() => getOclsList('ds')}
          />
          <input
            type='button'
            value='获取指定GDB下所有网络类列表'
            onClick={() => getNclsList('db')}
          />
          <input
            type='button'
            value='获取指定要素集下网络类列表'
            onClick={() => getNclsList('ds')}
          />
          <input
            type='button'
            value='获取指定GDB下所有栅格数据集列表'
            onClick={() => getRdsList('db')}
          />
          <input
            type='button'
            value='获取指定栅格目录下栅格数据集列表'
            onClick={() => getRdsList('rcs')}
          />
          <input
            type='button'
            value='获取指定GDB下指定类型的图层列表信息'
            onClick={() => getLayerList('db')}
          />
          <input
            type='button'
            value='获取要素集下指定类型的图层列表信息'
            onClick={() => getLayerList('ds')}
          />
          <input
            type='button'
            value='在指定GDB中创建一个图层'
            onClick={CreateVectCls}
          />
          <input
            type='button'
            value='删除指定GDB中的某一个图层数据'
            onClick={deleteXCls}
          />
        </div>
        <div>
          <font>
            说明：上述为GDB的目录服务接口示例，默认使用平台示例数据库sample.hdf，操作前请先确认此数据库已经附加。图层的创建与删除使用自定义图层，一般先创建后删除。
          </font>
        </div>
        <div id='resultShow4'></div>
      </div>
    </React.Fragment>
  );
}
