export class Point {
 
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.1;
    this.cur = index;
    //얼마나 움직일지에 대한 값 Max
    this.max = Math.random() * 100 + 150;
  }
  //update를 실행하면 아래위로 포인트가 움직인다
  update() {
    //현재값을 speed만큼 증가
    this.cur += this.speed;
    this.y = this.fixedY + (Math.sin(this.cur) * this.max);
  }
}
