import React, { Component } from 'react';
import './BaseShape.scss';
import Line from './Line.jsx';
import Rect from './Rect.jsx';
import Circle from './Circle.jsx';
import Ellipse from './Ellipse.jsx';
import Polygon from './Polygon.jsx';
import Polyline from './Polyline.jsx';
class BaseShapeView extends Component {
  render() {
    return (
      <div className='layout'>
        {/* 线段 */}
        <Line></Line>
        {/* 矩形 */}
        <Rect></Rect>
        {/* 圆形 */}
        <Circle></Circle>
        {/* 椭圆 */}
        <Ellipse></Ellipse>
        {/* 多边形 */}
        <Polygon></Polygon>
        {/* 折线 */}
        <Polyline></Polyline>
      </div>
    );
  }
}

export default BaseShapeView;
