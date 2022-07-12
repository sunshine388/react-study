import React, { useEffect } from 'react';
import './Cube.scss';
import * as THREE from 'three';

export default function ThreeMapView() {
  const initMap = () => {
    let container = document.getElementById('WebGL-output');

    //创建一个场景
    const scene = new THREE.Scene();

    // 生成渲染实例
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    //创建相机
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 4;

    // 创建图形
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    animate();

    function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='WebGL-output'></div>;
}
