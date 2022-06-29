import React, { Component } from 'react';
import './IText.scss';
import { fabric } from 'fabric';

class ITextView extends Component {
  init = () => {
    const canvas = new fabric.Canvas('canvas');

    // 使用 IText，可编辑文本
    const text = new fabric.IText('雷猴啊，双击打几个字试下~', {
      fontFamily: 'Comic Sans'
    });
    canvas.add(text);
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

export default ITextView;
