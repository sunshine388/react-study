import React, { useEffect } from 'react';
import './Bubble.scss';

export default function BubbleView() {
  const bubble = () => {
    const appHome = document.getElementById('appHome');

    let canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      canvasWidth = (canvas.width = appHome.offsetWidth),
      canvasHeight = (canvas.height = appHome.offsetHeight);

    let mouseX,
      mouseY,
      pop = false,
      attract = false;

    // 检查鼠标事件是否在气泡上方
    let mouseOver = function(x, y, radius) {
      let diffX = Math.abs(mouseX - x);
      let diffY = Math.abs(mouseY - y);

      if (diffX < radius && diffY < radius) {
        return true;
      }

      return false;
    };

    // 随机函数，min到max之间
    let randomNum = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // 使用随机数更改设置
    let changeSettings = function(setting, min, max, prob) {
      let chance = randomNum(0, prob);

      if (setting < min || chance === 1) {
        return 1;
      } else if (setting > max || chance === 2) {
        return -1;
      } else {
        return 0;
      }
    };

    // 泡泡配置
    let bubbles = [], // 存储所有泡泡
      count = 0, // 泡泡数量
      maxCount = 10, // 初始化最多生成的泡泡
      maxSize = 100,
      minSize = 5,
      minSpeed = 5,
      maxSpeed = 10,
      bgcolor = 'hsl(235,60%,13%)', // Canvas背景
      colors = [
        {
          color1: '#fa4c2b',
          color2: '#6aff6e'
        },
        {
          color1: '#ffff82',
          color2: '#ffce72'
        },
        {
          color1: '#fa4c2b',
          color2: '#0bfcff'
        }
      ];

    // 泡泡构造函数
    let Bubble = function(x, y, size) {
      this.id = count + 1;
      this.x = x || randomNum(0, canvasWidth);
      this.y = y || randomNum(0, canvasHeight);
      this.radius = size || randomNum(minSize, maxSize);
      this.color = colors[randomNum(0, colors.length - 1)];

      this.speed = randomNum(minSpeed, maxSpeed) / 10;
      this.speedBackup = this.speed;
      this.directionX = randomNum(-1, 1) || 1;
      this.directionY = randomNum(-1, 1) || 1;
      this.flicker = 0;

      count++;
      bubbles[count] = this;
    };

    // 泡泡分裂
    Bubble.prototype.destroy = function() {
      // 根据原有泡泡半径来产生更多泡泡
      let popCount = this.radius / 10 > 0 ? this.radius / 10 : 2;
      for (let i = 0; i < popCount; i++) {
        new Bubble(this.x, this.y, randomNum(this.radius / 4, this.radius / 2));
      }

      // 缩小原有泡泡半径，改变颜色
      this.radius = randomNum(this.radius / 4, this.radius / 2);
      this.color = colors[randomNum(0, colors.length - 1)];
    };

    // 泡泡动画
    Bubble.prototype.draw = function() {
      // 随机改变方向，默认相同方向
      this.directionX =
        changeSettings(this.x, 0, canvasWidth, 500) || this.directionX;
      this.directionY =
        changeSettings(this.y, 0, canvasHeight, 500) || this.directionY;

      // 重置移动速度
      this.speed = this.speedBackup;

      // 如果鼠标被按住并且气泡在鼠标
      if (attract === true && mouseOver(this.x, this.y, this.radius)) {
        let moveTowardMouse = randomNum(0, 10); // 随机改变方向
        if (moveTowardMouse >= 5) {
          this.directionX = mouseX - this.x > 0 ? 1 : -1;
        } else if (moveTowardMouse < 5) {
          this.directionY = mouseY - this.y > 0 ? 1 : -1;
        }

        this.speed = 1.25; // 加速
      }

      // 泡泡移动
      this.x += this.speed * this.directionX;
      this.y += this.speed * this.directionY;

      this.radius += changeSettings(this.radius, minSize, maxSize, 15);

      ctx.save();
      // 设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上。
      // 将底层除以顶层的反置
      ctx.globalCompositeOperation = 'color-dodge';
      // 清空子路径列表开始一个新路径
      ctx.beginPath();

      // 根据参数确定两个圆的坐标，绘制放射性渐变
      let gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.radius
      );
      gradient.addColorStop(0, this.color.color1);
      gradient.addColorStop(0.5, this.color.color2);
      gradient.addColorStop(1, 'rgba(250,76,43,0)');

      //  绘制圆弧路径的方法
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.closePath();
      ctx.restore();

      if (pop === true && mouseOver(this.x, this.y, this.radius)) {
        bubbles[this.id].destroy();
        pop = false;
      }
    };

    // 创建初始泡泡
    for (let i = 0; i < maxCount; i++) {
      new Bubble();
    }

    let animate = function() {
      // 填充背景颜色
      ctx.fillStyle = bgcolor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // 泡泡动画
      for (let i = 1; i <= count; i++) {
        bubbles[i].draw();
      }

      requestAnimationFrame(animate);
    };

    // 以浏览器的显示频率来作为其动画动作的频率
    requestAnimationFrame(animate);

    // 点击新增一个泡泡
    canvas.addEventListener('click', function(e) {
      new Bubble(e.layerX, e.layerY);
    });

    // 在鼠标点击右键或者按下键盘上的菜单键时被触发
    canvas.addEventListener('contextmenu', function(e) {
      mouseX = e.layerX;
      mouseY = e.layerY;
      pop = true;
      e.preventDefault();
    });

    let startAttracting;

    //  用户按下任意鼠标按钮时触发,不能通过键盘事件触发
    canvas.addEventListener('mousedown', function(e) {
      mouseX = e.layerX;
      mouseY = e.layerY;

      clearTimeout(startAttracting);
      startAttracting = setTimeout(function() {
        return (attract = true);
      }, 500);
    });

    // 鼠标指针位置发生变化
    canvas.addEventListener('mousemove', function(e) {
      if (attract) {
        mouseX = e.layerX;
        mouseY = e.layerY;
      }
    });

    canvas.addEventListener('mouseup', function(e) {
      clearTimeout(startAttracting);
      attract = false;
    });
  };

  useEffect(() => {
    bubble();
  }, []);

  return (
    <div className='app__home' id='appHome'>
      <canvas id='canvas'></canvas>
    </div>
  );
}
