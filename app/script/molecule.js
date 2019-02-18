class Molecule {
    constructor (canvas, Point, numOfpoint=30) {
        this.figure = Point;
        this.point = [];
        this.raf = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.numOfpoint = numOfpoint;
        this.speed = 1;
        this.isAnimated = false;
    }

    animate () {
        this.isAnimated = true;
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight); 
        for (let i = 0; i < this.numOfpoint; i++) {
            if (this.point[i]) {
                this.point[i].drowPoint(this.ctx);

                // for (let j = 0; j < this.numOfpoint; j++) {
                //     if (this.point[j]){
                //         if ((this.point[i].positionX < this.point[j].positionX + 250) && (this.point[i].positionX > this.point[j].positionX - 250)){
                //             if ((this.point[i].positionY < this.point[j].positionY + 250) && (this.point[i].positionY > this.point[j].positionY - 250)){
                //                 if ((this.point[i].numberLine < 2) && (this.point[j].numberLine < 2)) {
                //                     this.point[i].drowLine(this.ctx, this.point[j].positionX, this.point[j].positionY);
                //                     this.point[i].numberLine += 1;
                //                     this.point[j].numberLine += 1;
                //                 }
                //             }else{
                //                 this.point[i].numberLine = 0;
                //             }
                //         }else{
                //             this.point[i].numberLine = 0;
                //         }
                //     }
                // }

                this.point[i].move();
                this.point[i].checkPosition(this.canvas);
            }
        } 
        this.raf = requestAnimationFrame(this.animate.bind(this));
    }

    start () {
        if (this.isAnimated) return;
        let t = 500;
        for (let i = 0; i < this.numOfpoint; i++) {
            this.point[i] = new this.figure();
            this.point[i].setParam();
        }
        this.animate();
    } 
    
    stop () {
        if (!this.isAnimated) return;
        cancelAnimationFrame(this.raf);
        this.isAnimated = false;
    }
}