import React, { useEffect } from 'react';

export default function GridTilesView() {
  const initMap = () => {
    // eslint-disable-next-line
    let mymap = L.map('map7', {
      //参考坐标系
      // eslint-disable-next-line
      crs: L.CRS.EPSG3857,
      //不添加属性说明控件
      attributionControl: false,
      //显示中心
      center: [40, 116.3],
      //最小显示等级
      minZoom: 1,
      //最大显示等级
      maxZoom: 18,
      //当前显示等级
      zoom: 7,
      //限制显示地理范围
      maxBounds: [
        [-90, -180],
        [90, 180]
      ]
    });

    //显示天地图（矢量图层+注记）
    // eslint-disable-next-line
    L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    ).addTo(mymap);
    // eslint-disable-next-line
    L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=df06b00c610e0690974f4f5e09737bdd',
      {
        //设置地图不连续显示
        noWrap: true,
        // 设置图层显示范围
        bounds: [
          [-90, -180],
          [90, 180]
        ]
      }
    ).addTo(mymap);

    // eslint-disable-next-line
    let tiles = new L.GridLayer({
      //设置地图不连续显示
      noWrap: true,
      // 设置图层显示范围
      bounds: [
        [-90, -180],
        [90, 180]
      ]
    });
    //生成瓦片
    tiles.createTile = function(coords) {
      //创建canvas
      // eslint-disable-next-line
      let tile = L.DomUtil.create('canvas', 'leaflet-tile');
      //获取canvas中的画布（上下文）
      let ctx = tile.getContext('2d');
      //设置canvas的宽高
      let size = this.getTileSize();
      tile.width = size.x;
      tile.height = size.y;
      // 将切片号乘以切片分辨率，默认为256pixel,得到切片左上角的绝对像素坐标
      let nwPoint = coords.scaleBy(size);
      // 根据绝对像素坐标，以及缩放层级，反投影得到其经纬度
      let nw = mymap.unproject(nwPoint, coords.z);
      //利用画布绘制网格
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, size.x, 50);
      ctx.fillStyle = 'black';
      //设置网格中的文本内容
      ctx.fillText(
        'x: ' + coords.x + ', y: ' + coords.y + ', zoom: ' + coords.z,
        20,
        20
      );
      ctx.fillText('lat: ' + nw.lat + ', lon: ' + nw.lng, 20, 40);
      //设置边界填充色
      ctx.strokeStyle = 'red';
      //开始绘制
      ctx.beginPath();
      //移动画布至（0,0）
      ctx.moveTo(0, 0);
      ctx.lineTo(size.x - 1, 0);
      ctx.lineTo(size.x - 1, size.y - 1);
      ctx.lineTo(0, size.y - 1);
      //结束绘制
      ctx.closePath();
      ctx.stroke();
      //返回瓦片
      return tile;
    };
    //将瓦片网格图层添加至地图
    tiles.addTo(mymap);
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map7' className='map'></div>;
}
