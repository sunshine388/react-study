import React, { useEffect } from 'react';
import './ViewAnimate.scss';
import { Map, View } from 'ol';
import * as olEasing from 'ol/easing';
import Tile from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import 'ol/ol.css';

const London = [-0.12755, 51.507222]; // 伦敦
const Moscow = [37.6178, 55.7517]; // 莫斯科
const Istanbul = [28.9744, 41.0128]; // 伊斯坦布尔
const Rome = [12.5, 41.9]; // 罗马
const Bern = [7.4458, 46.95]; // 伯尔尼

let map = null;

export default function ViewAnimateView() {
  const initMap = () => {
    map = new Map({
      target: 'map',
      layers: [
        // 图层
        new Tile({
          preload: Infinity, // 预加载
          source: new BingMaps({
            key:
              'AiZrfxUNMRpOOlCpcMkBPxMUSKOEzqGeJTcVKUrXBsUdQDXutUBFN3-GnMNSlso-',
            imagerySet: 'Road'
          })
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [116.404, 39.915],
        zoom: 6 // 地图缩放最大级别
      })
    });
  };

  // 顺时针
  const rotateLeft = () => {
    let currentRotation = map.getView().getRotation();
    map.getView().setRotation(currentRotation + 1);
  };

  // 逆时针
  const rotateRight = () => {
    let currentRotation = map.getView().getRotation();
    map.getView().setRotation(currentRotation - 1);
  };

  // 平移到伦敦
  const panToLondon = () => {
    map.getView().animate({
      center: London, // 目标位置
      duration: 2000 // 动画时长
    });
  };

  // 弹性平移到莫斯科
  const elasticToMoscow = () => {
    map.getView().animate({
      center: Moscow, // 目标位置
      easing: olEasing.easeOut // 动画: 传入动画函数，olEasing是内置动画集
    });
  };

  // 弹跳平移到伊斯坦布尔
  const bounceToIstanbul = () => {
    map.getView().animate({
      center: Istanbul,
      duration: 2000, // 动画时长
      easing: bounce // 动画：传入动画函数
    });
  };

  // 旋转平移到罗马
  const spinToRome = () => {
    let view = map.getView();
    let center = view.getCenter();
    view.animate(
      {
        // 将多个动画连在一起使用
        center: [
          center[0] + (Rome[0] - center[0]) / 2,
          center[1] + (Rome[1] - center[1]) / 2
        ],
        rotation: Math.PI,
        easing: olEasing.easeIn
      },
      {
        center: Rome,
        rotation: 2 * Math.PI, // 旋转角度
        easing: olEasing.easeOut
      }
    );
  };

  // 绕着罗马旋转
  const rotateAroundRome = () => {
    let view = map.getView();
    let rotation = view.getRotation();
    view.animate(
      {
        // 将多个动画连在一起使用
        rotation: rotation + Math.PI,
        anchor: Rome, // 锚点
        easing: olEasing.easeIn // 动画：传入动画函数
      },
      {
        rotation: rotation + 2 * Math.PI,
        anchor: Rome, // 锚点
        easing: olEasing.easeOut // 动画：传入动画函数
      }
    );
  };

  // 飞行到伯尔尼
  const flyToBern = () => {
    let view = map.getView();
    let duration = 2000;
    let zoom = view.getZoom();
    let parts = 2;
    let called = false;
    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
      }
    }
    view.animate(
      {
        center: Bern,
        duration: duration
      },
      callback
    );
    view.animate(
      {
        zoom: zoom - 1,
        duration: duration / 2
      },
      {
        zoom: zoom,
        duration: duration / 2
      },
      callback
    );
  };

  // 弹跳动画
  const bounce = (t) => {
    let s = 7.5625;
    let p = 2.75;
    let l;
    if (t < 1 / p) {
      l = s * t * t;
    } else {
      if (t < 2 / p) {
        t -= 1.5 / p;
        l = s * t * t + 0.75;
      } else {
        if (t < 2.5 / p) {
          t -= 2.25 / p;
          l = s * t * t + 0.9375;
        } else {
          t -= 2.625 / p;
          l = s * t * t + 0.984375;
        }
      }
    }
    return l;
  };

  useEffect(() => {
    initMap();
  }, []);

  return (
    <React.Fragment>
      <div id='map'></div>
      <div className='map-btn'>
        <button onClick={rotateLeft}>↻</button>
        <button onClick={rotateRight}>↺</button>
        <button onClick={panToLondon}>平移到伦敦</button>
        <button onClick={elasticToMoscow}>弹性平移到莫斯科</button>
        <button onClick={bounceToIstanbul}>弹跳平移到伊斯坦布尔</button>
        <button onClick={spinToRome}>旋转平移到罗马</button>
        <button onClick={rotateAroundRome}>绕着罗马旋转</button>
        <button onClick={flyToBern}>飞行到伯尔尼</button>
      </div>
    </React.Fragment>
  );
}
