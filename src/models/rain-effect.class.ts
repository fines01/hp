import { Character } from "./character.class";
import { Mouse } from "./mouse.class";

export class RainEffect {
    
    fontSize: number = 14;
    accelerationPerFrame!: number;
    lastAnimationFrame = 0;
    animationFrameTimer = 0;
    fps = 35;
    padding: number = 1.25; // number > 0 
    animationFrameInterval = 1000 / this.fps; //amount of ms we wait until we trigger the next frame
    characterArray!: Character[];
    animationLoop!: number;
    paused = false;
    canvasWidth!: number;
    canvasHeight!: number;
    numberOfColumns!: number;
    numberOfCharactersPerColumn!: number;
    ctx!: CanvasRenderingContext2D;
    bgGradient!: any;   
    mouse!: Mouse;

    constructor(canvasWidth: number, canvasHeight: number, context: CanvasRenderingContext2D) { // canvas?, canvas.width, canvas.height
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = context; // canvas
        this.numberOfColumns = canvasWidth / (this.fontSize * this.padding * 2);
        this.numberOfCharactersPerColumn = canvasHeight / (this.fontSize * this.padding * 2.5);
        this.mouse = new Mouse(this.canvasWidth, this.canvasHeight);
        this.createCanvasBgGradient();
        this.#initialize();
    }

    /**
     * Initializes the canvas animation
     */
    #initialize() {
        if (this.animationLoop) cancelAnimationFrame(this.animationLoop);
        this.generateColumns();
        this.checkAnimationFrameTime(0);
    }

    /**
     * Creates a number of columns with a number of characters proportional to the canvas size and the font size, 
     * each column is assigned a random acceleration value;
     */
    generateColumns() {
        this.characterArray = [];
        for (let i = 0; i < this.numberOfColumns; i++) { 
            let columnAcceleration = (Math.random() * 0.008) + 0.002; // 0.002 -  ? test
            let columnY = (Math.random() * ((this.canvasHeight - this.fontSize * 2) - (this.fontSize * 2)) + this.fontSize * 2) * 0.33;
            for (let j = 0; j < this.numberOfCharactersPerColumn; j++) {
                this.characterArray.push(new Character(i * this.fontSize * this.padding * 2, columnY + j * this.fontSize * this.padding * 2, columnAcceleration, this.canvasWidth, this.canvasHeight, this.ctx, this.fontSize, this.mouse));
            }
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
        this.bgGradient = this.ctx.createRadialGradient(this.canvasWidth / 2, this.canvasHeight / 2, 150, this.canvasWidth / 2, this.canvasHeight / 2, length*0.9);
        this.bgGradient.addColorStop(0, 'rgba(51, 0, 87, 0.4)');
        this.bgGradient.addColorStop(0.89,'rgba(40,40,40,0.2');
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
        this.ctx.fillStyle = this.bgGradient; //radGradient1;
        //this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (let i = 0; i < this.characterArray.length; i++) {
            this.characterArray[i].update();
        }

        //this.connect();
    }

}