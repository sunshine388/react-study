import React, { Component } from 'react';

class CircleView extends Component {
  render() {
    return (
      <div>
        <p>圆形</p>
        <svg className='svg__circle' viewBox='0 0 460 180'>
          <circle
            cx='80'
            cy='80'
            r='60'
            style={{ stroke: 'black', fill: 'none' }}
          />
          <circle
            cx='230'
            cy='80'
            r='60'
            stroke='#cca8e9'
            strokeWidth='10'
            fill='none'
          />
          <circle
            cx='380'
            cy='80'
            r='60'
            stroke='#cca8e9'
            strokeWidth='4'
            strokeDasharray='10 4'
            fill='none'
          />
        </svg>
      </div>
    );
  }
}

export default CircleView;
