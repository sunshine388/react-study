import React, { Component } from 'react';
import './DrawPath.scss';
import { fabric } from 'fabric';

class DrawPathView extends Component {
  init = () => {
    let canvas = new fabric.Canvas('canvas');
    let path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
    path.set({
      left: 120,
      top: 120,
      fill: 'hotpink',
      opacity: 0.5,
      stroke: 'black',
      strokeWidth: 10
    });
    canvas.add(path);
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
      </div>
    );
  }
}

export default DrawPathView;
