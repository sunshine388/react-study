import React, { Component } from 'react';
import './Batman.scss';

class BatmanView extends Component {
  render() {
    return (
      <div className='box'>
        <div className='batman'>
          <div className='head'></div>
          <div className='eye left'></div>
          <div className='eye right'></div>
          <div className='mouth'></div>
          <div className='body'></div>
        </div>
      </div>
    );
  }
}

export default BatmanView;
