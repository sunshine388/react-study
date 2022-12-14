import React, { useEffect } from 'react';
import './Locking.scss';
import { fabric } from 'fabric';

export default function LockingView() {
  const init = () => {
    let canvas = new fabric.Canvas('canvas');

    let rect1 = new fabric.Rect({
      width: 100,
      height: 50,
      fill: '#ffde7d',
      top: 20,
      left: 20
    });

    // 不允许水平移动
    rect1.lockMovementX = true;

    let rect2 = new fabric.Rect({
      width: 100,
      height: 50,
      fill: '#f6416c',
      top: 100,
      left: 20
    });

    // 不允许垂直移动
    rect2.lockMovementY = true;

    let rect3 = new fabric.Rect({
      width: 100,
      height: 50,
      fill: '#3490de',
      top: 60,
      left: 160
    });

    // 禁止旋转
    rect3.lockRotation = true;

    let rect4 = new fabric.Rect({
      width: 100,
      height: 50,
      fill: '#ff9a3c',
      top: 200,
      left: 400
    });

    // 禁止水平缩放
    rect4.lockScalingX = true;

    let rect5 = new fabric.Rect({
      width: 100,
      height: 50,
      fill: '#f95959',
      top: 300,
      left: 200
    });

    // 禁止垂直缩放
    rect5.lockScalingY = true;

    canvas.add(rect1, rect2, rect3, rect4, rect5);
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
