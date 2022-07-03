import React, { Component } from 'react';
import './Loading.scss';

class LoadingView extends Component {
  render() {
    return (
      <div className='com-box'>
        <div className='loading75'>
          <div className='shape shape-4'>
            <div className='shape-4-top'></div>
            <div className='shape-4-bottom'></div>
            <div className='shape-4-eye'></div>
          </div>
          <div className='shape shape-1'></div>
          <div className='shape shape-2'></div>
          <div className='shape shape-3'></div>
        </div>
        <h4>Loading75</h4>
      </div>
    );
  }
}

export default LoadingView;
