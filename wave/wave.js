import { Point } from "./point.js";

export class Wave {
  constructor(index, totalPoints, color) {
       this.index = index;
       this.totalPoints = totalPoints;
       this.color = color;
       this.points = [];
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    //centerX, centerY의 값은 각각 스테이지 넓이와 높이의 반
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    //포인트의 간격은 총 스테이지 넓이에서 totalPoins 만큼을 나눈 값
    this.pointGap = this.stageWidth/ (this.totalPoints -1);
    this.init();
  }

  //init함수로 새로운 point 생성 후 resize에서 정의했던 centerX,centerY를 넘겨줘
  //각각의 포인트가 화면 중간을 기준으로 그려질 수 있도록 정의
  init() {
    this.points = [];
    
    for(let i = 0; i < this.totalPoints; i++){
        const point = new Point(
            this.index + i,
            this.pointGap * i,
            this.centerY,
        )
        this.points[i] = point;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for(let i =0; i< this.totalPoints; i++){
        if(i< this.totalPoints-1){
            this.points[i].update();
        }

        const cx = (prevX + this.points[i].x) /2;
        const cy = (prevY + this.points[i].y) /2;

        ctx.quadraticCurveTo(prevX, prevY, cx, cy);

        prevX = this.points[i].x;
        prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();
    ctx.closePath();
  }
}
