import React, { Component } from 'react';
import './UseImage.scss';
import { fabric } from 'fabric';
import logo from '@/assets/images/logo.png';

class UseImageView extends Component {
  init = () => {
    let canvas = new fabric.Canvas('canvas');
    let imgElement = document.getElementById('logo');
    imgElement.onload = () => {
      let imgInstance = new fabric.Image(imgElement, {
        left: 100,
        top: 100,
        width: 200,
        height: 200,
        angle: 50 // 旋转
      });
      canvas.add(imgInstance);
    };

    fabric.Image.fromURL(logo, (oImg) => {
      oImg.scale(0.5); // 缩放
      canvas.add(oImg); // 将图片加入到画布
    });
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
        <img src={logo} id='logo' alt='' />
      </div>
    );
  }
}

export default UseImageView;
