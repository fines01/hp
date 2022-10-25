import { Character } from "./character.class";
import { Dot } from "./dot.class";

export class FloatEffect {

  accelerationPerFrame!: number;
  lastAnimationFrame = 0;
  animationFrameTimer = 0;
  fps = 60;
  
  animationFrameInterval = 1000 / this.fps; //amount of ms we wait until we trigger the next frame
  particlesArray!: Dot[]; // dots or letters
  animationLoop!: number;
  canvasWidth!: number;
  canvasHeight!: number;

  ctx!: CanvasRenderingContext2D;
  bgGradient!: any;

  constructor(canvasWidth: number, canvasHeight: number, context: CanvasRenderingContext2D) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ctx = context; // canvas
    this.createCanvasBgGradient();
    this.#initialize();
  }

  /**
   * Initializes the canvas animation
   */
  #initialize() {
    if (this.animationLoop) cancelAnimationFrame(this.animationLoop);
    this.generateParticles();
    this.checkAnimationFrameTime(0);
  }

  connect() {
    let lineOpacity;
    for (let a = 0; a < this.particlesArray.length; a++) {
      for (let b = a; b < this.particlesArray.length; b++) {
        let distance =
          ((this.particlesArray[a].x - this.particlesArray[b].x) * (this.particlesArray[a].x - this.particlesArray[b].x)) +
          ((this.particlesArray[a].y - this.particlesArray[b].y) * (this.particlesArray[a].y - this.particlesArray[b].y));

        if (distance < (this.canvasWidth / 7) * (this.canvasHeight / 7) ) { // && (!this.particlesArray[a].pushed && !this.particlesArray[b].pushed) // (smaller number: longer lines, but more connecting particles: performance)
          lineOpacity = 0.8 - (distance / 40000); //20 000: tryal and error
          this.ctx.lineWidth = 1;
          if (this.particlesArray[a].pushed && this.particlesArray[b].pushed) lineOpacity = 0;
          // else 
          this.ctx.strokeStyle = `rgba(115,115,115,${lineOpacity})`; //'rgba(140,85,31,1';
          this.ctx.beginPath();
          this.ctx.moveTo(this.particlesArray[a].x, this.particlesArray[a].y);
          this.ctx.lineTo(this.particlesArray[b].x, this.particlesArray[b].y);
          this.ctx.stroke();
        }
      }
    }
  }

  generateParticles() {
    this.particlesArray = [];
    let numberOfParticles = (this.canvasHeight * this.canvasWidth) / 5000;//9000;
    for (let i = 0; i < numberOfParticles; i++) {
        this.particlesArray.push(new Dot(this.canvasWidth, this.canvasHeight, this.ctx));
    }
  }

  /**
   * Creates a transparent gradient background that is used to overdraw the canvas background
   * after each animation-frame, creating a washed-out impression
   */
  createCanvasBgGradient() {
    let length;
    if (this.canvasHeight > this.canvasWidth) length = this.canvasWidth;
    else length = this.canvasHeight;
    this.bgGradient = this.ctx.createRadialGradient(this.canvasWidth / 2, this.canvasHeight / 2, 150, this.canvasWidth / 2, this.canvasHeight / 2, length * 0.9);
    this.bgGradient.addColorStop(0, 'rgba(51, 0, 87, 0.5)');
    this.bgGradient.addColorStop(0.8, 'rgba(40,40,40,0.5');
  }

  /**
   * Creates the animation loop:
   * Compares the elapsed time in ms since the last animation frame to the object's defined animation frame interval,
   * and applies the object's animation if enough time has passed.
   * @param {number} timeStamp - timestamp in ms of the last animation frame that was served in the animation-loop 
   */
  checkAnimationFrameTime(timeStamp: number) {
    let deltaTime = timeStamp - this.lastAnimationFrame;
    this.lastAnimationFrame = timeStamp;
    if (this.animationFrameTimer > this.animationFrameInterval) {
      this.animate()
      this.animationFrameTimer = 0;
    } else {
      this.animationFrameTimer += deltaTime;
    }
    let self = this;
    this.animationLoop = requestAnimationFrame(() => {
      let timeStamp = Date.now();
      self.checkAnimationFrameTime(timeStamp);
    });
  }

  /**
   * Re-draws the canvas (by over-painting it with the transparent gradient) and 
   * calling the update method for each character
   */
  animate() {
    //this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    //this.ctx.fillStyle = this.bgGradient;
    for (let i = 0; i < this.particlesArray.length; i++) {
      this.particlesArray[i].moveDot();
    }
    this.connect();
  }

}
