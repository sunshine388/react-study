import React, { Component } from 'react';
import './Deserialization.scss';
import { fabric } from 'fabric';

class DeserializationView extends Component {
  init = () => {
    const str =
      '{"version":"4.6.0","objects":[{"type":"rect","version":"4.6.0","originX":"left","originY":"top","left":50,"top":50,"width":20,"height":20,"fill":"green","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"circle","version":"4.6.0","originX":"left","originY":"top","left":80,"top":80,"width":80,"height":80,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"radius":40,"startAngle":0,"endAngle":6.283185307179586}],"background":"#ddd"}';
    let canvas = new fabric.Canvas('canvas');
    canvas.loadFromJSON(str);
  };

  componentDidMount() {
    this.init();
  }
  render() {
    return (
      <div className='box'>
        <p>loadFromJSON</p>
        <canvas
          width='600'
          height='600'
          id='canvas'
          style={{ border: '1px solid #ccc' }}></canvas>
      </div>
    );
  }
}

export default DeserializationView;
