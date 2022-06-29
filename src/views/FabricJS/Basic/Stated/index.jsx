import React, { Component } from 'react';
import './Stated.scss';
import { fabric } from 'fabric';
import jailCellBars from '@/assets/images/FabricJS/jail_cell_bars.png';

const imgURL =
  'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27d1b4e5f8824198b6d51a2b1c2d0d75~tplv-k3u1fbpfcp-zoom-crop-mark:400:400:400:400.awebp';

class StatedView extends Component {
  init1 = () => {
    let canvas = new fabric.Canvas('canvas1'); // 通过元素id绑定

    // 矩形
    let rect = new fabric.Rect({
      top: 100, // 矩形离顶部距离
      left: 100, // 矩形离左侧距离
      fill: 'red', // 填充色
      width: 30, // 矩形宽度
      height: 30 // 矩形高度
    });

    canvas.add(rect); // 将图案添加到canvas里
  };

  init2 = () => {
    let canvas = new fabric.StaticCanvas('canvas2'); // 通过元素id绑定

    // 矩形
    let rect = new fabric.Rect({
      top: 100, // 矩形离顶部距离
      left: 100, // 矩形离左侧距离
      fill: 'red', // 填充色
      width: 30, // 矩形宽度
      height: 30 // 矩形高度
    });

    canvas.add(rect); // 将图案添加到canvas里
  };

  init3 = () => {
    let canvas = new fabric.Canvas('canvas3', {
      width: 300,
      height: 300,
      backgroundColor: '#eee'
    });

    // 圆形
    let circle = new fabric.Circle({
      radius: 30,
      top: 20,
      left: 20,
      fill: 'pink'
    });

    canvas.add(circle);
  };

  init4 = () => {
    let canvas = new fabric.Canvas('canvas4');
    canvas.setBackgroundImage(imgURL, canvas.renderAll.bind(canvas));
  };

  init5 = () => {
    let canvas = new fabric.Canvas('canvas5');
    canvas.setBackgroundImage(imgURL, canvas.renderAll.bind(canvas), {
      angle: 15 // 旋转背景图
    });
  };

  init6 = () => {
    let canvas = new fabric.Canvas('canvas6');
    fabric.Image.fromURL(imgURL, (img) => {
      img.set({
        // 缩放图片，使其完全填充满画布
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
      });
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        repeat: 'repeat'
      });
    });
  };

  init7 = () => {
    let canvas = new fabric.Canvas('canvas7');
    canvas.setBackgroundColor(
      {
        source:
          'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27d1b4e5f8824198b6d51a2b1c2d0d75~tplv-k3u1fbpfcp-zoom-crop-mark:40:40:40:40.awebp',
        repeat: 'repeat'
      },
      canvas.renderAll.bind(canvas)
    );
  };

  init8 = () => {
    let canvas = new fabric.Canvas('canvas8');
    canvas.add(
      new fabric.Circle({
        radius: 30,
        fill: '#f55',
        top: 70,
        left: 70
      })
    );
    // 设置覆盖图像的画布
    canvas.setOverlayImage(
      // setOverlayImage(image, callback, optionsopt)
      jailCellBars, // 图片，script开头import进来的
      canvas.renderAll.bind(canvas)
    );
  };

  componentDidMount() {
    this.init1();
    this.init2();
    this.init3();
    this.init4();
    this.init5();
    this.init6();
    this.init7();
    this.init8();
  }
  render() {
    return (
      <div className='box'>
        <div className='canvas_x'>
          <div>可交互</div>
          <canvas width='400' height='400' id='canvas1'></canvas>
        </div>

        <div className='canvas_x'>
          <div>不可交互</div>
          <canvas width='400' height='400' id='canvas2'></canvas>
        </div>

        <div className='canvas_x'>
          <div>初始化画布样式</div>
          <canvas id='canvas3'></canvas>
        </div>

        <div className='canvas_x'>
          <div>使用背景图</div>
          <canvas width='400' height='400' id='canvas4'></canvas>
        </div>

        <div className='canvas_x'>
          <div>旋转背景图</div>
          <canvas width='400' height='400' id='canvas5'></canvas>
        </div>

        <div className='canvas_x'>
          <div>拉伸背景图</div>
          <canvas width='400' height='400' id='canvas6'></canvas>
        </div>

        <div className='canvas_x'>
          <div>重复背景图</div>
          <canvas width='400' height='400' id='canvas7'></canvas>
        </div>

        <div className='canvas_x'>
          <div>重叠影象</div>
          <canvas width='400' height='400' id='canvas8'></canvas>
        </div>
      </div>
    );
  }
}

export default StatedView;
