import React, { Component } from 'react';
import './GradientText.scss';

class GradientTextView extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='gradient__text-vertical'>垂直渐变文字</div>
        <div className='gradient__text-horizontal'>水平渐变文字</div>
      </React.Fragment>
    );
  }
}

export default GradientTextView;
