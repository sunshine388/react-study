import React, { useEffect } from 'react';
import './Animation.scss';

let map = null;
let animation = null;

const KeyFrames = [
  {
    // eslint-disable-next-line
    center: new BMapGL.Point(116.307092, 40.054922),
    zoom: 20,
    tilt: 50,
    heading: 0,
    percentage: 0
  },
  {
    // eslint-disable-next-line
    center: new BMapGL.Point(116.307631, 40.055391),
    zoom: 21,
    tilt: 70,
    heading: 0,
    percentage: 0.1
  },
  {
    // eslint-disable-next-line
    center: new BMapGL.Point(116.306858, 40.057887),
    zoom: 21,
    tilt: 70,
    heading: 0,
    percentage: 0.25
  },
  {
    // eslint-disable-next-line
    center: new BMapGL.Point(116.306858, 40.057887),
    zoom: 21,
    tilt: 70,
    heading: -90,
    percentage: 0.35
  },
  {
    // eslint-disable-next-line
    center: new BMapGL.Point(116.307904, 40.058118),
    zoom: 21,
    tilt: 70,
    heading: -90,
    percentage: 0.45
  },
  {
    // eslint-disable-next-line
    center: new BMapGL.Point(116.307904, 40.058118),
    zoom: 21,
    tilt: 70,
    heading: -180,
    percentage: 0.55
  },
  {
    // eslint-disable-next-line
    center: new BMapGL.Point(116.308902, 40.055954),
    zoom: 21,
    tilt: 70,
    heading: -180,
    percentage: 0.75
  },
  {
    // eslint-disable-next-line
    center: new BMapGL.Point(116.308902, 40.055954),
    zoom: 21,
    tilt: 70,
    heading: -270,
    percentage: 0.85
  },
  {
    // eslint-disable-next-line
    center: new BMapGL.Point(116.307779, 40.055754),
    zoom: 21,
    tilt: 70,
    heading: -360,
    percentage: 0.95
  },
  {
    // eslint-disable-next-line
    center: new BMapGL.Point(116.307092, 40.054922),
    zoom: 20,
    tilt: 50,
    heading: -360,
    percentage: 1
  }
];

const opts = {
  delay: 100,
  duration: 10000,
  interation: 'INFINITE'
};

export default function AnimationView() {
  const initMap = () => {
    // eslint-disable-next-line
    map = new BMapGL.Map('container'); // 创建Map实例
    // eslint-disable-next-line
    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 20); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
    map.setTilt(50);
    map.setHeading(0);
    // eslint-disable-next-line
    animation = new BMapGL.ViewAnimation(KeyFrames, opts);

    // 动画开始时触发，如果配置了delay，则在delay后触发
    animation.addEventListener('animationstart', () => {
      console.log('start');
    });

    // 当动画循环大于1次时，上一次结束既下一次开始时触发。最后一次循环结束时不触发
    animation.addEventListener('animationiterations', () => {
      console.log('animationiterations');
    });

    // 动画结束时触发，如果动画中途被终止，则不会触发
    animation.addEventListener('animationend', () => {
      console.log('animationend');
    });

    // 动画中途被终止时触发
    animation.addEventListener('animationcancel', () => {
      console.log('animationcancel');
    });
  };

  const handleStart = () => {
    map.startViewAnimation(animation);
  };

  const handleCancel = () => {
    map.cancelViewAnimation(animation);
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div id='container'></div>
      <div className='map-btn'>
        <button onClick={handleStart}>start</button>
        <button onClick={handleCancel}>cancel</button>
      </div>
    </React.Fragment>
  );
}
