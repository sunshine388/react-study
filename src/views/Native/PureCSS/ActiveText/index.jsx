import React, { Component } from 'react';
import './ActiveText.scss';

class ActiveTextView extends Component {
  render() {
    const myName = `I'm Kelvin`;
    let myNameArr = [];
    for (let i = 0; i < myName.length; i++) {
      let str = myName[i] !== ' ' ? myName[i] : '&nbsp;';
      myNameArr.push(str);
    }
    return (
      <div className='active-text'>
        <div className='text'>
          {myNameArr.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>
    );
  }
}

export default ActiveTextView;
