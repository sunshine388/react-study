import React, { Component } from 'react';
import './Carousel.scss';

class CarouselView extends Component {
  state = {
    type: '1'
  };
  changeValue = (e) => {
    this.setState({
      type: e.target.value
    });
  };
  render() {
    return (
      <div className='carousel__x'>
        {/* 选择按钮（透明度为0）可按不可见 */}
        <input
          className='index__btn'
          type='radio'
          name='carousel'
          value='1'
          checked={this.state.type === '1'}
          onChange={this.changeValue}></input>
        <input
          className='index__btn'
          type='radio'
          name='carousel'
          value='2'
          checked={this.state.type === '2'}
          onChange={this.changeValue}></input>
        <input
          className='index__btn'
          type='radio'
          name='carousel'
          value='3'
          checked={this.state.type === '3'}
          onChange={this.changeValue}></input>
        <input
          className='index__btn'
          type='radio'
          name='carousel'
          value='4'
          checked={this.state.type === '4'}
          onChange={this.changeValue}></input>

        {/* 下标（显示） */}
        <ol className='index__x'>
          <li className='index__item'>1</li>
          <li className='index__item'>2</li>
          <li className='index__item'>3</li>
          <li className='index__item'>4</li>
        </ol>

        {/*内容区 */}
        <ul className='carousel__container'>
          <li className='carousel__item'>1</li>
          <li className='carousel__item'>2</li>
          <li className='carousel__item'>3</li>
          <li className='carousel__item'>4</li>
        </ul>
      </div>
    );
  }
}

export default CarouselView;
