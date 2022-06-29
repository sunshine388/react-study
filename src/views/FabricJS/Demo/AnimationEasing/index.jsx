import React, { Component } from 'react';
import './AnimationEasing.scss';
import { fabric } from 'fabric';

class AnimationEasingView extends Component {
  state = {
    canvas: null,
    btnDisabled: false,
    selectedVal: 'easeInOutQuad'
  };
  animationList = [
    'easeInOutQuad',
    'easeInCubic',
    'easeOutCubic',
    'easeInOutCubic',
    'easeInQuart',
    'easeOutQuart',
    'easeInOutQuart',
    'easeInQuint',
    'easeOutQuint',
    'easeInOutQuint',
    'easeInSine',
    'easeOutSine',
    'easeInOutSine',
    'easeInExpo',
    'easeOutExpo',
    'easeInOutExpo',
    'easeInCirc',
    'easeOutCirc',
    'easeInOutCirc',
    'easeInElastic',
    'easeOutElastic',
    'easeInOutElastic',
    'easeInBack',
    'easeOutBack',
    'easeInOutBack',
    'easeInBounce',
    'easeOutBounce',
    'easeInOutBounce'
  ];

  init = () => {
    const canvas = new fabric.Canvas('canvas');
    const rect = new fabric.Rect({
      width: 50,
      height: 50,
      left: 100,
      top: 100,
      stroke: '#aaf',
      strokeWidth: 5,
      fill: '#faa',
      selectable: false
    });
    canvas.add(rect);
    this.setState({
      canvas: canvas
    });
  };

  // 动吧
  exercise = () => {
    this.setState({
      btnDisabled: true
    });
    // canvas.item(0)是canvas第一个元素，这里只有一个矩形元素，所以就是它咯
    let rect = this.state.canvas.item(0);
    rect.animate('left', rect.left === 100 ? 400 : 100, {
      duration: 1000, // 动画执行时长
      onChange: this.state.canvas.renderAll.bind(this.state.canvas), // 动画渲染
      onComplete: () => {
        this.setState({
          btnDisabled: false
        });
      },
      easing: fabric.util.ease[this.state.selectedVal] // 动画执行效果
    });
  };
  changeValue = (event) => {
    this.setState({
      selectedVal: event.target.value
    });
  };
  componentDidMount() {
    this.init();
  }
  render() {
    return (
      <div className='box'>
        <div>
          <select
            id='type'
            value={this.state.selectedVal}
            onChange={this.changeValue}>
            {this.animationList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button onClick={this.exercise} disabled={this.state.btnDisabled}>
            动吧
          </button>
        </div>
        <canvas
          width='600'
          height='600'
          id='canvas'
          style={{ border: '1px solid #ccc' }}></canvas>
        <div>
          代码出处{' '}
          <a href='http://fabricjs.com/animation-easing' target='view_window'>
            http://fabricjs.com/animation-easing
          </a>
        </div>
      </div>
    );
  }
}

export default AnimationEasingView;
