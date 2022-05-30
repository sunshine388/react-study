import React, { Component } from 'react';
import './Parallax.scss';

// 旋转角度系数
let range = 40;

// 旋转公式（返回-20 ~ 20，保留1为小数）
let calcValue = (a, b) => ((a / b) * range - range / 2).toFixed(1);

class ParallaxView extends Component {
  constructor(props) {
    super(props);
    this.state = { timeout: void 0 };
  }

  // 视差动画函数
  // e：鼠标移动事件的参数
  parallax = (e) => {
    let x = e.x; // 指针x轴位置
    let y = e.y; // 指针y轴位置

    // 如果 timeout 已经存在，就取消一个先前通过调用 window.requestAnimationFrame() 方法添加到计划中的动画帧请求。
    if (this.state.timeout) {
      // 这是一个实验中的功能，此功能某些浏览器尚在开发中
      window.cancelAnimationFrame(this.state.timeout);
    }

    // 在下次重绘之前调用指定的回调函数更新动画
    let timeout = window.requestAnimationFrame(function() {
      // 通过 calcValue 根据鼠标当前位置和容器宽高比计算得出的值
      let xValue = calcValue(x, window.innerWidth);
      let yValue = calcValue(y, window.innerHeight);

      // 设置卡片容器的旋转角度
      document.querySelector('.cards').style.transform =
        'rotateX(' + yValue + 'deg) rotateY(' + xValue + 'deg)';

      // 设置所有图片的位移
      document.querySelectorAll('.card__img').forEach((item) => {
        item.style.transform =
          'translateX(' + -xValue + 'px) translateY(' + yValue + 'px)';
      });

      // 设置所有背景图的位置
      document.querySelectorAll('.card__bg').forEach((item) => {
        item.style.backgroundPosition =
          xValue * 0.45 + 'px ' + -yValue * 0.45 + 'px';
      });
    });
    this.setState({
      timeout: timeout
    });
  };
  componentDidMount() {
    const pageX = document.querySelector('#pageX');
    pageX.addEventListener('mousemove', this.parallax);
  }
  componentWillUnmount() {
    const pageX = document.querySelector('#pageX');
    pageX.removeEventListener('mousemove', this.parallax);
  }
  render() {
    return (
      <div className='page__x' id='pageX'>
        <div className='cards'>
          <h3>Movies</h3>
          <h1>Popular</h1>
          {/* 幽灵公主 */}
          <div className='card princess-mononoke'>
            <div className='card__bg'></div>
            <img
              className='card__img'
              src={require('./img/3dr_mono.png')}
              alt=''
            />
            <div className='card__text'>
              <p className='card__title'>Princess Mononoke</p>
            </div>
          </div>
          {/* 千与千寻 */}
          <div className='card spirited-away'>
            <div className='card__bg'></div>
            <img
              className='card__img'
              src={require('./img/3dr_chihiro.png')}
              alt=''
            />
            <div className='card__text'>
              <p className='card__title'>Spirited Away</p>
            </div>
          </div>
          {/* 哈尔的移动城堡 */}
          <div className='card howl-s-moving-castle'>
            <div className='card__bg'></div>
            <img
              className='card__img'
              src={require('./img/3dr_howlcastle.png')}
              alt=''
            />
            <div className='card__text'>
              <p className='card__title'>Howl's Moving Castle</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ParallaxView;
