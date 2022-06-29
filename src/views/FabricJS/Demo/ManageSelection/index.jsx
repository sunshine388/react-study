import React, { Component } from 'react';
import './ManageSelection.scss';
import { fabric } from 'fabric';

class ManageSelectionView extends Component {
  state = {
    cancas: null
  };
  init = () => {
    let canvas = new fabric.Canvas('canvas');

    const red = new fabric.Rect({
      top: 100,
      left: 0,
      width: 80,
      height: 50,
      fill: 'red'
    });

    const blue = new fabric.Rect({
      top: 0,
      left: 100,
      width: 50,
      height: 70,
      fill: 'blue'
    });

    const green = new fabric.Rect({
      top: 100,
      left: 100,
      width: 60,
      height: 60,
      fill: 'green'
    });

    fabric.Object.prototype.transparentCorners = false; // 选中时，角是被填充了。true 空心；false 实心
    canvas.add(red, blue, green);
    this.setState({
      canvas: canvas
    });
  };

  // 建组
  group = () => {
    // 如果当前没选中东西，什么都不做
    if (!this.state.canvas.getActiveObject()) {
      return;
    }

    console.log('当前选中的状态', this.state.canvas.getActiveObject().type);

    // 如果当前选中的不是框选多个元素的群组，什么都不做
    if (this.state.canvas.getActiveObject().type !== 'activeSelection') {
      return;
    }
    this.state.canvas.getActiveObject().toGroup();
    this.state.canvas.requestRenderAll();
  };

  // 取消组
  ungroup = () => {
    if (!this.state.canvas.getActiveObject()) {
      return;
    }

    console.log('当前选中的状态', this.state.canvas.getActiveObject().type);

    if (this.state.canvas.getActiveObject().type !== 'group') {
      return;
    }
    this.state.canvas.getActiveObject().toActiveSelection();
    this.state.canvas.requestRenderAll();
  };

  // 全选
  multiselect = () => {
    this.state.canvas.discardActiveObject(); // 丢弃当前活动的对象和触发事件。 如果fabric作为鼠标事件的结果调用该函数，则将该事件作为参数传递给自定义事件的fire函数。 当作为一个方法使用时，参数没有任何应用。
    const sel = new fabric.ActiveSelection(this.state.canvas.getObjects(), {
      canvas: this.state.canvas
    });
    // console.log(sel)
    this.state.canvas.setActiveObject(sel);
    this.state.canvas.requestRenderAll();
  };

  // 添加更多图形（随机位置）
  addmore = () => {
    const red = new fabric.Rect({
      top: Math.random() * this.state.canvas.height,
      left: Math.random() * this.state.canvas.width,
      width: 80,
      height: 50,
      fill: 'red'
    });
    const blue = new fabric.Rect({
      top: Math.random() * this.state.canvas.height,
      left: Math.random() * this.state.canvas.width,
      width: 50,
      height: 70,
      fill: 'blue'
    });
    const green = new fabric.Rect({
      top: Math.random() * this.state.canvas.height,
      left: Math.random() * this.state.canvas.width,
      width: 60,
      height: 60,
      fill: 'green'
    });
    this.state.canvas.add(red, blue, green);
  };

  // 取消选择
  discard = () => {
    this.state.canvas.discardActiveObject();
    this.state.canvas.requestRenderAll();
  };

  componentDidMount() {
    this.init();
  }
  render() {
    return (
      <div className='box'>
        <div>
          <button onClick={this.group}>建组</button>
          <button onClick={this.ungroup}>取消组</button>
          <button onClick={this.multiselect}>全选</button>
          <button onClick={this.discard}>取消选中</button>
          <button onClick={this.addmore}>添加更多图形</button>
        </div>
        <canvas
          width='600'
          height='600'
          id='canvas'
          style={{ border: '1px solid #ccc' }}></canvas>
        <div>
          代码出处{' '}
          <a href='http://fabricjs.com/manage-selection' target='view_window'>
            http://fabricjs.com/manage-selection
          </a>
        </div>
      </div>
    );
  }
}

export default ManageSelectionView;
