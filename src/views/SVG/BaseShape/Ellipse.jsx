import React, { Component } from 'react';

class EllipseView extends Component {
  render() {
    return (
      <div>
        <p>椭圆</p>
        <svg className='svg__ellipse'>
          {/* cx和cy 椭圆圆心坐标（x轴和y轴） */}
          {/* rx x轴方向的半径 */}
          {/* ry y轴方向的半径 */}
          <ellipse
            cx='60'
            cy='60'
            rx='20'
            ry='40'
            fill='none'
            stroke='#f67280'
          />
          <ellipse
            cx='60'
            cy='130'
            rx='40'
            ry='20'
            fill='none'
            stroke='#f67280'
            strokeDasharray='10 4'
          />
        </svg>
      </div>
    );
  }
}

export default EllipseView;
