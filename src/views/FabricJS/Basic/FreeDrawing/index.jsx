import React, { useEffect, useState } from 'react';
import './FreeDrawing.scss';
import { fabric } from 'fabric';

let canvas = null;

export default function FreeDrawingView() {
  const [isDrawing, setIsDrawing] = useState(true);

  // 切换绘画和框选模式
  const toggleIsDrawing = () => {
    canvas.isDrawingMode = !isDrawing;
    setIsDrawing((val) => !val);
  };

  // 清除画布
  const clearCanvas = () => {
    canvas.clear();
  };

  useEffect(() => {
    if (!canvas) {
      canvas = new fabric.Canvas('canvas', {
        isDrawingMode: isDrawing // 开启绘图模式
      });

      // 设置画笔颜色
      canvas.freeDrawingBrush.color = '#11999e';

      // 设置画笔粗细
      canvas.freeDrawingBrush.width = 10;

      // 画笔投影
      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: 10,
        offsetX: 10,
        offsetY: 10,
        affectStroke: true,
        color: '#30e3ca'
      });
    }
  }, [isDrawing]);

  return (
    <div className='box'>
      <canvas
        width='600'
        height='600'
        id='canvas'
        style={{ border: '1px solid #ccc' }}></canvas>
      <div className='tools__x'>
        <button type='success' onClick={toggleIsDrawing}>
          {isDrawing ? '框选模式' : '绘图模式'}
        </button>
        <button onClick={clearCanvas}>清空画布</button>
      </div>
    </div>
  );
}
