import React, { Component } from 'react';

class LineView extends Component {
  render() {
    return (
      <div>
        <p>线段</p>
        <svg className='svg__line'>
          {/* stroke 笔画颜色，可以使用颜色关键字、6位十六进制、3位十六进制、rgb和currentColor表示。currentColor代表继承父容器的color */}
          {/* stroke-width 是画笔宽度 */}
          {/* stroke-opacity 控制线条不透明度 */}
          {/* stroke-dasharray 点线或虚线 */}
          {/* stroke-linecap 线帽，可用于 line 和 polyline */}

          {/* 水平线段 */}
          <line x1='10' y1='10' x2='50' y2='10' stroke='currentColor' />

          {/* 垂直线段 */}
          <line
            x1='20'
            y1='30'
            x2='20'
            y2='90'
            stroke='#f08a5d'
            strokeWidth='5'
          />

          {/* 倾斜线 */}
          <line x1='30' y1='30' x2='90' y2='90' stroke='#71c9ce' />

          {/* 在style指定样式 */}
          <line
            x1='60'
            y1='30'
            x2='120'
            y2='90'
            style={{ stroke: '#ffde7d', strokeWidth: 10 }}
          />

          {/* 在css指定 class  */}
          <line x1='100' y1='30' x2='160' y2='90' className='line4' />

          {/* 不透明度 stroke-opacity */}
          <line
            x1='230'
            y1='10'
            x2='230'
            y2='120'
            style={{ stroke: '#118df0', strokeWidth: 5 }}
          />
          <line
            x1='200'
            y1='20'
            x2='260'
            y2='20'
            style={{ stroke: '#118df0', strokeWidth: 5, strokeOpacity: 0.2 }}
          />
          <line
            x1='200'
            y1='40'
            x2='260'
            y2='40'
            style={{ stroke: '#118df0', strokeWidth: 5, strokeOpacity: 0.4 }}
          />
          <line
            x1='200'
            y1='60'
            x2='260'
            y2='60'
            stroke='#118df0'
            strokeWidth='5'
            strokeOpacity='0.6'
          />
          <line
            x1='200'
            y1='80'
            x2='260'
            y2='80'
            stroke='#118df0'
            strokeWidth='5'
            strokeOpacity='0.8'
          />
          <line
            x1='200'
            y1='100'
            x2='260'
            y2='100'
            stroke='#118df0'
            strokeWidth='5'
            strokeOpacity='1'
          />

          {/* 虚线 stroke-dasharray */}
          {/* 10像素虚线，4像素空隙 */}
          <line
            x1='10'
            y1='130'
            x2='290'
            y2='130'
            stroke='#415f9d'
            strokeWidth='4'
            strokeDasharray='10, 4'
          />

          {/* 5像素虚线，3像素空隙，20像素虚线，12像素空隙 */}
          {/* 可以使用空格的方式分隔 */}
          <line
            x1='10'
            y1='150'
            x2='290'
            y2='150'
            stroke='#415f9d'
            strokeWidth='4'
            strokeDasharray='5 3 20 12'
          />

          {/* 奇数情况：10像素虚线，3像素缝隙，20像素虚线，10像素缝隙，3像素虚线... */}
          <line
            x1='10'
            y1='170'
            x2='290'
            y2='170'
            stroke='#415f9d'
            strokeWidth='4'
            strokeDasharray='10, 3, 20'
          />

          {/* linecap="butt" 平头（默认值） */}
          <line
            x1='330'
            y1='15'
            x2='430'
            y2='15'
            stroke='black'
            strokeLinecap='butt'
            strokeWidth='15'
          />

          {/* linecap="round" 凸圆头 */}
          <line
            x1='330'
            y1='60'
            x2='430'
            y2='60'
            stroke='black'
            strokeLinecap='round'
            strokeWidth='15'
          />

          {/*linecap="square" 凸方头 */}
          <line
            x1='330'
            y1='105'
            x2='430'
            y2='105'
            stroke='black'
            strokeLinecap='square'
            strokeWidth='15'
          />
        </svg>
      </div>
    );
  }
}

export default LineView;
