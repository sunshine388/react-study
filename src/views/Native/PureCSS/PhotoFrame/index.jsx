import React, { Component } from 'react';
import './PhotoFrame.scss';

class PhotoFrameView extends Component {
  render() {
    return (
      <div className='box'>
        {/* 图片 */}
        <img src={require('@/assets/images/gwen-spider-verse-ah.jpg')} alt='' />
        {/* 内容 */}
        <div className='box__inner__content'>
          <h3 className='title'>Gwen</h3>
          <span className='post'>spider verse</span>
        </div>
      </div>
    );
  }
}

export default PhotoFrameView;
