import React, { useEffect } from 'react';
import './BasicGraph.scss';
import { fabric } from 'fabric';

export default function BasicGraphView() {
  const init = () => {
    let canvas = new fabric.Canvas('canvas');

    // 矩形
    let rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'orange',
      width: 100,
      height: 100
    });
    canvas.add(rect);

    // 圆角矩形
    let rect2 = new fabric.Rect({
      left: 300,
      top: 100,
      fill: 'yellowgreen',
      width: 100,
      height: 100,
      rx: 20,
      ry: 20
    });
    canvas.add(rect2);

    // 圆形
    let circle = new fabric.Circle({
      radius: 50,
      fill: 'green',
      left: 200,
      top: 200,
      controls: false, // 不可编辑
      hasControls: false // 控件将不显示，并且不能用于操作对象
    });

    // 三角形
    let triangle = new fabric.Triangle({
      width: 80, // 底边宽度
      height: 100, // 底边到定点的距离
      fill: 'blue',
      left: 300,
      top: 300
    });

    canvas.add(circle, triangle); // 一次添加2个图形

    // 椭圆
    let ellipse = new fabric.Ellipse({
      top: 20,
      left: 20,
      rx: 70,
      ry: 30,
      fill: '#f38181'
    });
    canvas.add(ellipse);

    // 线
    let line = new fabric.Line([450, 10, 500, 300], {
      stroke: '#5E2300' //笔触颜色
    });
    canvas.add(line);

    // 多边形，会自动闭合
    let polygon = new fabric.Polygon(
      [
        { x: 100, y: 300 },
        { x: 300, y: 320 },
        { x: 10, y: 500 },
        { x: 40, y: 200 }
      ],
      {
        fill: '#ffd3b6'
      }
    );
    canvas.add(polygon);

    // 折线
    let polyline = new fabric.Polyline(
      [
        { x: 430, y: 430 },
        { x: 530, y: 430 },
        { x: 430, y: 530 },
        { x: 530, y: 530 }
      ],
      {
        fill: 'transparent',
        stroke: '#6639a6',
        strokeWidth: 10
      }
    );
    canvas.add(polyline);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className='box'>
      <canvas
        width='600'
        height='600'
        id='canvas'
        style={{ border: '1px solid #ccc' }}></canvas>
    </div>
  );
}
