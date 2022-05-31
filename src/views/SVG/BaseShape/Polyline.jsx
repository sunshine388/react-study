import React, { Component } from 'react';

class PolylineView extends Component {
  render() {
    return (
      <div>
        <p>折线</p>
        <svg className='svg__polyline'>
          <polyline
            points='5,20 20,20 25,10 35,30 45,10 55,30 65,10 75,30 80,20 95,20'
            fill='none'
            stroke='black'
            strokeWidth='3'
          />

          {/* 不设置fill的特殊情况 */}
          <polyline
            points='5,70 20,70 25,60 35,80 45,60 55,80 65,60 75,80 80,70 95,70'
            stroke='red'
            strokeWidth='3'
          />

          {/* 简单填充 */}
          <polyline
            points='125,10 155,10 140,40 '
            style={{ fill: 'red', stroke: 'black' }}
          />

          {/* linejoin 线连接处 */}
          {/* stroke-linejoin: miter 尖的（默认值） */}
          <polyline
            points='30,150 65,115 100,150'
            fill='none'
            stroke='red'
            strokeWidth='20'
            strokeLinejoin='miter'
          />

          {/* stroke-linejoin: round 圆的 */}
          <polyline
            points='130,150 165,115 200,150'
            fill='none'
            stroke='hotpink'
            strokeWidth='20'
            strokeLinejoin='round'
          />

          {/* stroke-linejoin: bevel 平的 */}

          <polyline
            points='230,150 265,115 300,150'
            fill='none'
            stroke='yellowgreen'
            strokeWidth='20'
            strokeLinejoin='bevel'
          />
        </svg>
      </div>
    );
  }
}

export default PolylineView;
