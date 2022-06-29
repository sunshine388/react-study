import React, { Component } from 'react';
import './Textbox.scss';
import { fabric } from 'fabric';

class TextboxView extends Component {
  init = () => {
    const canvas = new fabric.Canvas('canvas');
    const textbox = new fabric.Textbox('Lorum ipsum dolor sit amet', {
      left: 50,
      top: 50,
      width: 150,
      fontSize: 20
    });

    canvas.add(textbox);
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

export default TextboxView;
