import React, { useEffect } from 'react';
import './Hovering.scss';
import { fabric } from 'fabric';

export default function HoveringView() {
  const init = () => {
    const canvas = new fabric.Canvas('canvas');
    // 随机生成一些图形
    for (let i = 15; i--; ) {
      let dim = fabric.util.getRandomInt(30, 60);
      let klass = ['Rect', 'Triangle', 'Circle'][
        fabric.util.getRandomInt(0, 2)
      ];
      let options = {
        top: fabric.util.getRandomInt(0, 600),
        left: fabric.util.getRandomInt(0, 600),
        fill: 'green'
      };
      if (klass === 'Circle') {
        options.radius = dim;
      } else {
        options.width = dim;
        options.height = dim;
      }
      canvas.add(new fabric[klass](options));
    }

    // 鼠标经过的时候变红色
    canvas.on('mouse:over', function(e) {
      if (e.target) {
        e.target.set('fill', 'red');
        canvas.renderAll();
      }
    });

    // 鼠标移开后变回绿色
    canvas.on('mouse:out', function(e) {
      if (e.target) {
        e.target.set('fill', 'green');
        canvas.renderAll();
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className='box'>
      <canvas
        width='600'
        height='600'
        id='canvas'
        style={{ border: '1px solid #ccc' }}></canvas>
      <div>
        代码出处{' '}
        <a href='http://fabricjs.com/hovering' target='view_window'>
          http://fabricjs.com/hovering
        </a>
      </div>
    </div>
  );
}
