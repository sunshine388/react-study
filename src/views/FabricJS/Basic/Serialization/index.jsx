import React, { Component } from 'react';
import './Serialization.scss';
import { fabric } from 'fabric';

class SerializationView extends Component {
  state = {
    canvas5: null,
    canvas6: null
  };
  init1 = () => {
    let canvas = new fabric.Canvas('canvas1');

    // 序列化空画布 {"version":"4.6.0","objects":[]}
    console.log('canvas1', JSON.stringify(canvas));
    console.log('canvas1', canvas.toJSON());
  };

  init2 = () => {
    let canvas = new fabric.Canvas('canvas2', {
      backgroundColor: '#ddd'
    });

    console.log('canvas2: ', canvas.toJSON());
  };

  init3 = () => {
    let canvas = new fabric.Canvas('canvas3', {
      backgroundColor: '#ddd'
    });

    canvas.add(
      new fabric.Rect({
        left: 50,
        top: 50,
        height: 20,
        width: 20,
        fill: 'green'
      })
    );

    canvas.add(
      new fabric.Circle({
        left: 80,
        top: 80,
        radius: 40,
        fill: 'red'
      })
    );

    console.log('canvas3', canvas.toJSON());
  };

  init4 = () => {
    let canvas = new fabric.Canvas('canvas4', {
      backgroundColor: '#ddd'
    });

    canvas.add(
      new fabric.Rect({
        left: 50,
        top: 50,
        height: 20,
        width: 20,
        fill: 'green'
      })
    );

    canvas.add(
      new fabric.Circle({
        left: 80,
        top: 80,
        radius: 40,
        fill: 'red'
      })
    );

    // toObject仅以实际对象的形式返回与toJSON相同的表示形式，而没有字符串序列化
    console.log('canvas4', canvas.toObject());
  };

  init5 = () => {
    let canvas5 = new fabric.Canvas('canvas5', {
      backgroundColor: '#a5dee5'
    });

    canvas5.add(
      new fabric.Rect({
        left: 50,
        top: 50,
        height: 20,
        width: 20,
        fill: 'green'
      })
    );

    canvas5.add(
      new fabric.Circle({
        left: 80,
        top: 80,
        radius: 40,
        fill: 'red'
      })
    );
    this.setState({
      canvas5: canvas5
    });
  };

  toPng = () => {
    console.log('toPng', this.state.canvas5.toDataURL('png'));
  };

  init6 = () => {
    let canvas6 = new fabric.Canvas('canvas6', {
      backgroundColor: '#a5dee5'
    });

    canvas6.add(
      new fabric.Rect({
        left: 50,
        top: 50,
        height: 20,
        width: 20,
        fill: 'green'
      })
    );

    canvas6.add(
      new fabric.Circle({
        left: 80,
        top: 80,
        radius: 40,
        fill: 'red'
      })
    );
    this.setState({
      canvas6: canvas6
    });
  };

  toSVG = () => {
    console.log(this.state.canvas6.toSVG());
  };

  componentDidMount() {
    this.init1();
    this.init2();
    this.init3();
    this.init4();
    this.init5();
    this.init6();
  }
  render() {
    return (
      <div className='box'>
        <div className='canvas_x'>
          <div>1、空画布</div>
          <canvas
            width='200'
            height='200'
            id='canvas1'
            style={{ border: '1px solid #ccc' }}></canvas>
        </div>

        <div className='canvas_x'>
          <div>2、有背景色的画布</div>
          <canvas
            width='200'
            height='200'
            id='canvas2'
            style={{ border: '1px solid #ccc' }}></canvas>
        </div>

        <div className='canvas_x'>
          <div>3、有图案的 toJSON</div>
          <canvas
            width='200'
            height='200'
            id='canvas3'
            style={{ border: '1px solid #ccc' }}></canvas>
        </div>

        <div className='canvas_x'>
          <div>4、有图案的 toObject</div>
          <canvas
            width='200'
            height='200'
            id='canvas4'
            style={{ border: '1px solid #ccc' }}></canvas>
        </div>

        <div className='canvas_x'>
          <div>5、输出base64 - png</div>
          <canvas
            width='200'
            height='200'
            id='canvas5'
            style={{ border: '1px solid #ccc' }}></canvas>
          <div>
            <button onClick={this.toPng}>toDataURL('png')</button>
          </div>
        </div>

        <div className='canvas_x'>
          <div>6、toSVG</div>
          <canvas
            width='200'
            height='200'
            id='canvas6'
            style={{ border: '1px solid #ccc' }}></canvas>
          <div>
            <button onClick={this.toSVG}>toSVG</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SerializationView;
