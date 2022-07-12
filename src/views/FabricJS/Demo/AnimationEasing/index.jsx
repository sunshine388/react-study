import React, { useEffect, useState } from 'react';
import './AnimationEasing.scss';
import { fabric } from 'fabric';

const animationList = [
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
export default function AnimationEasingView() {
  const [canvas, setCanvas] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [selectedVal, setSelectedVal] = useState('easeInOutQuad');

  const init = () => {
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
    setCanvas(canvas);
  };

  // 动吧
  const exercise = () => {
    setBtnDisabled(true);
    // canvas.item(0)是canvas第一个元素，这里只有一个矩形元素，所以就是它咯
    let rect = canvas.item(0);
    rect.animate('left', rect.left === 100 ? 400 : 100, {
      duration: 1000, // 动画执行时长
      onChange: canvas.renderAll.bind(canvas), // 动画渲染
      onComplete: () => {
        setBtnDisabled(false);
      },
      easing: fabric.util.ease[selectedVal] // 动画执行效果
    });
  };

  const changeValue = (event) => {
    setSelectedVal(event.target.value);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className='box'>
      <div>
        <select id='type' value={selectedVal} onChange={changeValue}>
          {animationList.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button onClick={exercise} disabled={btnDisabled}>
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
