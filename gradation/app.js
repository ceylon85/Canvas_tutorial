import { GlowParticle } from "./glowparticle.js";

const COLORS = [
  { r: 45, g: 74, b: 227 }, //blue
  { r: 250, g: 255, b: 89 }, //yellow
  { r: 255, g: 104, b: 248 }, //puple
  { r: 44, g: 209, b: 252 }, //skyblue
  { r: 54, g: 233, b: 84 }, //green
];

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.totalParticles = 15;
    this.particles = [];
    this.maxRadius = 900;
    this.minRadius = 400;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    //globalCompositeOperation :도형합성, 기존 도형 뒤에 새로운 도형을 그릴 수 있을뿐 아니라,
    //도형의 일정 영역을 가려 보이지 않게 하거나 캔버스의 특정부분을 지우는 등의 효과를 얻는다
    //type: saturation 아래쪽 레이어의 색상과 명도를 보존하고 위쪽 레이어의 채도를 적용
    this.ctx.globalCompositeOperation = "saturation";

    this.createParticles();
  }

  createParticles() {
    let curColor = 0;
    this.particles = [];

    for (let i = 0; i < this.totalParticles; i++) {
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        COLORS[curColor]
      );

      if (++curColor >= COLORS.length) {
        curColor = 0;
      }
      this.particles[i] = item;
    }
  }
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.totalParticles; i++) {
      const item = this.particles[i];
      item.animate(this.ctx, this.stageWidth, this.stageHeight);
    }
  }
}

window.onload = () => {
  new App();
};
