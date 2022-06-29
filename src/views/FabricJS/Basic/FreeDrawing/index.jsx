import React, { Component } from 'react';
import './FreeDrawing.scss';
import { fabric } from 'fabric';

class FreeDrawingView extends Component {
  state = {
    canvas: null,
    isDrawing: true
  };
  init = () => {
    let canvas = new fabric.Canvas('canvas', {
      isDrawingMode: this.state.isDrawing // 开启绘图模式
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
    this.setState({
      canvas: canvas
    });
  };

  // 切换绘画和框选模式
  toggleIsDrawing = () => {
    let canvas = this.state.canvas;
    canvas.isDrawingMode = !this.state.isDrawing;
    this.setState({
      canvas: canvas,
      isDrawing: !this.state.isDrawing
    });
  };

  // 清除画布
  clearCanvas = () => {
    this.state.canvas.clear();
  };

  componentDidMount() {
    this.init();
  }
  render() {
    return (
      <div className='box'>
        <canvas
          width='600'
          height='600'
          id='canvas'
          style={{ border: '1px solid #ccc' }}></canvas>
        <div className='tools__x'>
          <button type='success' onClick={this.toggleIsDrawing}>
            {this.state.isDrawing ? '框选模式' : '绘图模式'}
          </button>
          <button onClick={this.clearCanvas}>清空画布</button>
        </div>
      </div>
    );
  }
}

export default FreeDrawingView;
