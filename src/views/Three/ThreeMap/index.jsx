import React, { Component } from 'react';
import './ThreeMap.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class ThreeMapView extends Component {
  initMap = () => {
    let container = document.getElementById('WebGL-output');
    const width = container.clientWidth;
    const height = container.clientHeight;

    //创建一个场景
    const scene = new THREE.Scene();

    const group = new THREE.Group();
    scene.add(group);

    // 辅助线
    let axisHelper = new THREE.AxesHelper(120);
    scene.add(axisHelper);
    // 光源
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // 创建相机
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.z = 300;
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);

    // 生成渲染实例
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height); // 设置场景的宽高。
    renderer.setClearColor(0x00ffff, 0.5); // 不写就是黑色
    container.appendChild(renderer.domElement);

    // 轨道
    let orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0, 0, 0); //控制焦点
    orbitControls.autoRotate = false; //将自动旋转关闭
    orbitControls.enablePan = false; // 不禁止鼠标平移, 可以用键盘来平移
    orbitControls.maxDistance = 1000; // 最大外移动
    orbitControls.minDistance = 100; // 向内最小外移动

    // 把背景图加载过来当做纹理。
    let loader = new THREE.TextureLoader();
    let planetTexture = require('@/assets/images/Three/Earth.png');
    const texture = loader.load(planetTexture);
    // 这个绘制球体
    const geometry = new THREE.SphereGeometry(80, 50, 50);
    // 放入纹理
    const material = new THREE.MeshLambertMaterial({
      map: texture,
      overdraw: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    animate();
    function animate() {
      group.rotation.y -= 0.005; //这行可以控制地球自转
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
  };
  componentDidMount() {
    this.initMap();
  }
  render() {
    return <div id='WebGL-output'></div>;
  }
}

export default ThreeMapView;
