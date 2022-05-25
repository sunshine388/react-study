import React, { Component } from 'react';
import './Batman.scss';

class BatmanView extends Component {
  render() {
    return (
      <div class='box'>
        <div class='batman'>
          <div class='head'></div>
          <div class='eye left'></div>
          <div class='eye right'> </div>
          <div class='mouth'></div>
          <div class='body'></div>
        </div>
      </div>
    );
  }
}

export default BatmanView;
