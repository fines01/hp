import { MAT_RIPPLE_GLOBAL_OPTIONS } from "@angular/material/core";
import { Mouse } from "./mouse.class";

export class Dot {

    particleOpacity: number = 0.12;
    radius: number = (Math.random() * 8) + 2;
    //colors = [`rgb(45, 252, 216,${this.particleOpacity})`, `rgb(250, 39, 89,${this.particleOpacity}), rgba(0,255,255,${this.particleOpacity}), rgb(212, 175, 55,${this.particleOpacity})`];
    color= `rgba(255,255,255,${this.particleOpacity})`;
    //rgbValue = '255,255,255';
    colorIndex!: number;
    canvasWidth!: number;
    canvasHeight!: number;
    ctx!: CanvasRenderingContext2D;
    x!: number;
    y!: number;
    directionX!: number;
    directionY!: number;
    mouse!: any;
    gradient!: any;
    pushed = false;
    pushRadius = 10;

    constructor(canvasWidth: number, canvasHeight: number, context:CanvasRenderingContext2D, mouse: Mouse) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = context;
        this.x = (Math.random() * ((this.canvasWidth - this.radius * 2) - (this.radius * 2)) + this.radius * 2);
        this.y = (Math.random() * ((this.canvasHeight - this.radius * 2) - (this.radius * 2)) + this.radius * 2);
        this.directionX = (Math.random() * 0.125) - 0.0625;
        this.directionY = (Math.random() * 1) - 0.5;
        //this.colorIndex = Math.floor(Math.random() * this.colors.length);
        // this.radius = (Math.random() * 4) + 1; // random between 1 and 4;
        // this.particleOpacity = (Math.random() * 0.6) + 0.4;
        this.mouse = mouse;
        this.gradient = this.createDotGradient();
    }

    getColor() {
        // this.colors = [`rgb(45, 252, 216,${this.particleOpacity})`, `rgb(250, 39, 89,${this.particleOpacity}), rgba(0,255,255,${this.particleOpacity}), rgb(212, 175, 55,${this.particleOpacity})`];
        // return this.colors[this.colorIndex];
        return `rgba(255,255,255,${this.particleOpacity})`;
    }

     /**
     * Creates a transparent gradient canvas background that is used to color the characters on the canvas.
     * This is achieven dy applying the gradient before drawing each character.
     */
    createDotGradient() {
        let length;
        if (this.canvasHeight > this.canvasWidth) length = this.canvasWidth;
        else length = this.canvasHeight;
        this.gradient = this.ctx.createRadialGradient(this.canvasWidth / 2, this.canvasHeight / 2, 150, this.canvasWidth / 2, this.canvasHeight / 2, length*0.8); // (x1,y1,radius1,x2,y2,radius2) // inner circle (x,y,radius 1 && outer circle (x,y,radius 22)) --> gradient will be drawn between these two circles
        this.gradient.addColorStop(0, 'rgba(0,255,255, 0.9)'); // (offset[0,1], color) , offset 0 == start, offset 1 == end
        // this.gradient.addColorStop(0.8, 'rgba(255,255,255)');
        this.gradient.addColorStop(0.8, 'rgba(255,0,255, 0.9)');
    }

    drawDot() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // draw as circles with this.size as radius - length!
        if (!this.pushed) this.ctx.fillStyle = this.getColor();
        if (this.pushed) this.ctx.fillStyle = `rgba(0,255,255,1)`;
        this.ctx.fillStyle = this.gradient;
        this.ctx.fill();
    }

     // check particle position, check mouse position, move the particle, draw the particle
    moveDot() {
        this.checkOutOfRangeParticles()
        this.checkMouseCollision();
        this.x += this.directionX;
        this.y += this.directionY;
        this.drawDot();
    }

    // collision detection: check for collision between mouse position - particle
    checkMouseCollision() {
        let dx = this.mouse.x - this.x;
        let dy = this.mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        //check if colliding
        if (distance < this.mouse.radius + this.radius) {
            // check from which side the particle comes (and if it is far enough from the edge)
            // push dot particle 
            this.pushed = true;
            //console.log('ouch', this.mouse.x, this.mouse.y);
            setTimeout(()=>{
                this.pushed = false;
            },1100);
            //
            if (this.mouse.x < this.x && this.x < this.canvasWidth - this.radius * this.pushRadius) this.pushDot('x', +1); // push to the right
            if (this.mouse.x > this.x && this.x > this.radius * this.pushRadius ) this.pushDot('x', -1);
            if (this.mouse.y < this.y && this.y < this.canvasHeight - this.radius * this.pushRadius) this.pushDot('y', +1);
            if (this.mouse.y > this.y && this.y > this.radius * this.pushRadius) this.pushDot('y', -1);         
        }
    }

    pushDot(coordinate: string, direction: number) {
        if (coordinate == 'y') {
            this.y += direction * this.pushRadius;
            setTimeout(()=>{
                this.y -= (direction * this.pushRadius + this.directionY);
            }, 1000);
        }
        if (coordinate == 'x') {
            this.x += direction * this.pushRadius;
            setTimeout(()=>{
                this.x -= direction * this.pushRadius + this.directionX;
            }, 1000);
        }
    }

    // check if particle is still withhin canvas
    checkOutOfRangeParticles() {
        if (this.x > this.canvasWidth || this.x < 0 ) {
            this.directionX = -this.directionX; // animate into opposite direction
        }
        if (this.y > this.canvasHeight || this.y < 0) {
            this.directionY = -this.directionY;
        }
    }

}
