import React, { Component } from 'react';
import './Loading.scss';

class LoadingView extends Component {
  render() {
    return (
      <div className='com-box'>
        <div className='loading42'>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h4>Loading42</h4>
      </div>
    );
  }
}

export default LoadingView;
