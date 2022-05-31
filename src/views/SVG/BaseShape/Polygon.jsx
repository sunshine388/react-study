import React, { Component } from 'react';

class PolygonView extends Component {
  render() {
    return (
      <div>
        <p>多边形</p>
        <svg className='svg__polygon'>
          {/* 平行四边形 */}
          <polygon
            points='15,10 55,10 45,20 5,20'
            style={{ fill: 'red', stroke: 'black' }}
          />

          {/* 五角星 */}
          <polygon
            points='35,37.5 37.9,46.1 46.9,46.1 39.7,51.5 42.3,60.1 35,55 27.7,60.1 30.3,51.5 23.1,46.1 32.1,46.1'
            fill='#ccffcc'
            stroke='green'
          />

          {/* 不规则图形 */}
          <polygon
            points='60,60 65,72 80,60 90,90 72,80 72,85 50,95'
            className='polygon3'
          />

          {/* 星星 未填充 */}
          <polygon
            points='148,96 116,176 196,128 100,128 180,176'
            stroke='black'
            fill='none'
          />

          {/* 星星 fill-rule: 交叉区域规则 nonzero在图形内部都填充 */}
          <polygon
            points='148,16 116,96 196,48 100,48 180,96'
            fill='yellow'
            stroke='black'
            fillRule='nonzero'
          />

          {/* 星星 fill-rule: evenodd 边线相交的次数，奇数则认为在图形内部；偶数认为在图形外部 */}
          {/* 如果交叉的边线是从右往左画，则总数加1；如果交叉的边线从左往右画，则总数减1.如果最后总数为0，则认为该点在图形外部，否则认为在图形内部 */}
          <polygon
            points='248,16 216,96 296,48 200,48 280,96'
            fill='yellow'
            stroke='black'
            fillRule='evenodd'
          />
        </svg>
      </div>
    );
  }
}

export default PolygonView;
