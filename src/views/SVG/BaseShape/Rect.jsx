import React, { Component } from 'react';

class RectView extends Component {
  render() {
    return (
      <div>
        <p>矩形</p>
        <svg className='svg__rect' viewBox='0 0 240 180'>
          {/* 默认 */}
          <rect x='10' y='10' width='60' height='30' />

          {/* 无填充色，只描边 */}
          <rect x='10' y='50' width='60' height='30' fill='none' stroke='red' />

          {/* 填充黄色，半透明蓝色边框 */}
          <rect
            x='10'
            y='90'
            width='60'
            height='30'
            fill='#ffde7d'
            stroke='#3f72af'
            strokeWidth='5'
            strokeOpacity='0.5'
          />

          {/* 填充半透明黄色，绿色虚线边框 */}
          <rect
            x='10'
            y='135'
            width='100'
            height='30'
            fill='#ffde7d'
            fillOpacity='0.5'
            stroke='#00b8a9'
            strokeWidth='2'
            strokeDasharray='5 2'
          />

          {/* 圆角矩形 */}
          <rect
            x='80'
            y='10'
            width='60'
            height='30'
            rx='6'
            ry='6'
            fill='none'
            stroke='#3f72af'
          />
          <rect
            x='80'
            y='50'
            width='60'
            height='30'
            rx='10'
            ry='10'
            fill='none'
            stroke='#3f72af'
          />
          <rect
            x='80'
            y='90'
            width='60'
            height='30'
            rx='15'
            ry='15'
            fill='none'
            stroke='#3f72af'
          />

          <rect
            x='150'
            y='10'
            width='60'
            height='30'
            rx='6'
            ry='20'
            fill='none'
            stroke='#3f72af'
          />
          <rect
            x='150'
            y='50'
            width='60'
            height='30'
            rx='20'
            ry='6'
            fill='none'
            stroke='#3f72af'
          />
        </svg>
      </div>
    );
  }
}

export default RectView;
