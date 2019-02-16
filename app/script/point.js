class Point {
    constructor () {
      this.positionX = 50;
      this.positionY = 50;
      this.speedY = 1;
      this.speedX = 1;
      // this.color = "rgb(34, 138, 124)";
      this.color = "rgb(128, 255, 0)";
      this.size = 4;
      this.numberLine = 0;
    }

    setParam(e){
      let x, y;
      if (e){
        x = e.offsetX;
        y = e.offsetY;
      }

      this.numberLine = 0;
      this.size = 2 + Math.random() * 5;
      this.speedY = -0.5 + Math.random() * 1;
      this.speedX = -0.5 + Math.random() * 1;
      this.positionY = y || Math.random() * 700;
      this.positionX = x || Math.random() * 1550;
    }

    drowPoint(ctx){
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.positionX, this.positionY, this.size, 0, 6);
      ctx.fill();
    }

    drowLine(ctx, x, y){
      if ((this.positionX == x) && (this.positionY == y)) return;
      ctx.beginPath();
      ctx.moveTo(this.positionX, this.positionY);
      ctx.lineTo(x , y);
      ctx.lineTo(x + 1, y + 1);
      ctx.fill();
    }

    move(){
      this.positionY += this.speedY;  
      this.positionX += this.speedX;   
    }

    checkPosition(elem){
      let width = elem.clientWidth;
      let height = elem.clientHeight;
      if(this.positionY >= height+200 || this.positionY < -200 ) {
        // this.speedY = -this.speedY;
        this.setParam();
      }     
      if(this.positionX >= width+200 || this.positionX < -200 ) {
        // this.speedX = -this.speedX;
        this.setParam();
      }     
    }
  }

