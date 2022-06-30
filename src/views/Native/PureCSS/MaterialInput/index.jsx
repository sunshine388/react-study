import React, { Component } from 'react';
import './MaterialInput.scss';

class MaterialInputView extends Component {
  render() {
    return (
      <div className='input__x'>
        <input type='text' className='input__fill' placeholder='用户名'></input>
        <label className='input__label'>用户名</label>
      </div>
    );
  }
}

export default MaterialInputView;
