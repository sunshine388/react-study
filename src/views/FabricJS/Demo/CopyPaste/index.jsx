import React, { Component } from 'react';
import './CopyPaste.scss';
import { fabric } from 'fabric';

class CopyPasteView extends Component {
  state = {
    canvas: null, // canvas实例，初始化时赋值
    clipboard: null // 复制到的内容
  };
  init = () => {
    let canvas = new fabric.Canvas('canvas');

    const rect = new fabric.Rect({
      left: 100,
      top: 50,
      fill: '#D81B60',
      width: 100,
      height: 100,
      strokeWidth: 2,
      stroke: '#880E4F',
      rx: 10,
      ry: 10,
      angle: 45
    });

    let rect2 = new fabric.Rect({
      left: 200,
      top: 50,
      fill: '#F06292',
      width: 100,
      height: 100,
      strokeWidth: 2,
      stroke: '#880E4F',
      rx: 10,
      ry: 10,
      angle: 45
    });

    const circle1 = new fabric.Circle({
      radius: 65,
      fill: '#039BE5',
      left: 0
    });

    const circle2 = new fabric.Circle({
      radius: 65,
      fill: '#4FC3F7',
      left: 110,
      opacity: 0.7
    });

    const group = new fabric.Group([circle1, circle2], {
      left: 40,
      top: 250
    });

    canvas.add(rect, rect2, group);
    this.setState({
      canvas: canvas
    });
  };

  // 复制
  copy = () => {
    if (!this.state.canvas.getActiveObject()) {
      alert('请先选择元素');
      return;
    }
    this.state.canvas.getActiveObject().clone((cloned) => {
      this.setState({
        clipboard: cloned
      });
    });
  };

  // 粘贴
  paste = () => {
    if (!this.state.clipboard) {
      alert('还没复制过任何内容');
      return;
    }

    let clipboard = this.state.clipboard;
    clipboard.clone((clonedObj) => {
      console.log(clonedObj);
      this.state.canvas.discardActiveObject(); // 取消选择

      // 设置新内容的坐标位置
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true
      });

      if (clonedObj.type === 'activeSelection') {
        // 活动选择需要一个对画布的引用
        clonedObj.canvas = this.state.canvas;
        clonedObj.forEachObject(function(obj) {
          this.state.canvas.add(obj);
        });

        clonedObj.setCoords();
      } else {
        this.state.canvas.add(clonedObj);
      }
      clipboard.top += 10;
      clipboard.left += 10;
      this.state.canvas.setActiveObject(clonedObj);
      this.state.canvas.requestRenderAll();
      this.setState({
        clipboard: clipboard
      });
    });
  };
  componentDidMount() {
    this.init();
  }
  render() {
    return (
      <div className='box'>
        <div>
          <button onClick={this.copy}>复制</button>
          <button onClick={this.paste}>粘贴</button>
        </div>
        <canvas
          width='600'
          height='600'
          id='canvas'
          style={{ border: '1px solid #ccc' }}></canvas>
        <div>
          代码出处{' '}
          <a href='http://fabricjs.com/copypaste' target='view_window'>
            http://fabricjs.com/copypaste
          </a>
        </div>
      </div>
    );
  }
}

export default CopyPasteView;
