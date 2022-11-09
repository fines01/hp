import { Mouse } from "./mouse.class";

export class Character {

    // characters = "Fines01Front1End2Developer3With4Full5Stack6Basics/|JAVASCRIPT?ANGULAR?SQL?NoSQL?Git?RestAPI+789-*<>$";
    characters = '/><+-*$?!=|&%#{}[]01010101Σ/><><><><><seni❄'; // λπΣ√τ ツ
    characterOpacity = 0.5;
    colors = [`rgb(0,255,299,${this.characterOpacity})`, `rgb(227, 27, 109,${this.characterOpacity})`, `rgb(255, 255, 255,${this.characterOpacity})`];
    //letters = this.characters.split(''); // array with all characters
    pushed = false;
    pushRadius = 5; // TODO also set mouse radius (in rel to push radius?)
    fontSize;
    acceleration;
    speed;
    x;
    y;
    directionY;
    colorIndex;
    activeCharacter;
    canvasWidth!: number;
    canvasHeight!: number;
    ctx;
    charGradient!: any;
    // in class Mouse:
    //frame!: any;
    mouse!: any;

    constructor(x: number, y: number, acceleration: number, canvasWidth: number, canvasHeight: number, context: any, fontSize: number, mouse: Mouse) { //
        this.fontSize = fontSize; // TODO set fontsize in rel to screen size
        this.acceleration = acceleration; // * 0.01;
        this.speed = 0;
        this.x = x; //? x : (Math.random() * ((innerWidth - this. fontSize * 2) - (this.fontSize * 2)) + this.fontSize * 2);
        this.y = y;
        this.directionY = (Math.random() * 0.25) + 0.125;
        this.colorIndex = Math.floor(Math.random() * this.colors.length);
        //this.characterOpacity = this.y / canvasHeight;
        let index = Math.floor(Math.random() * this.characters.length);
        this.activeCharacter = this.characters.charAt(index);
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = context;
        this.mouse = mouse;
        // in class Mouse
        // this.frame = document.getElementById('frame');
        // this.setMouse();
        this.createCanvasCharGradient();
    }

    /**
     * Sets character color with current character opacity value.
     * @returns rgba color code with opacity value
     */
    getColor() {
        this.colors = [`rgb(45, 252, 216,${this.characterOpacity})`, `rgb(250, 39, 89,${this.characterOpacity})`, `rgb(255, 255, 255,${this.characterOpacity})`];
        return this.colors[this.colorIndex];
    }

   
    /**
     * 
     */
    draw() {
        this.ctx.textAlign = 'center';
        //else ctx.fillStyle = this.getColor();
        if (this.pushed) this.ctx.fillStyle = 'rgba(0,255,255,0.99)';//'rgb(45, 252, 216, 0.25)'; //'rgb(255,255,255,0.15)'; //'rgb(250, 39, 89)';
        else this.ctx.fillStyle = this.charGradient;
        this.ctx.font = this.fontSize + 'px monospace';
        this. ctx.fillText(this.activeCharacter, this.x, this.y);
    }

    // check character position, check mouse position, move the character, draw the character
    update() {
        // move (not colliding) character
        this.y += this.speed;
        this.speed += this.acceleration;
        // this.characterOpacity = (this.y * 0.7 / this.canvasHeight) + 0.1;
        // check if character is at bottom
        if (this.y > this.canvasHeight) {
            this.y = -this.fontSize + 3;
            this.speed = 0;
        }
        if (this.mouse.x && this.mouse.y) this.checkMouseCollision();
        this.draw();
    }

    /**
     * Checks for collisions between the mouse position (incl a radius) and the character.
     * In case of a collision the character is pushed from its default position and reset after some time.
     */
    checkMouseCollision() { // pass: push-radius rel to canvas-size
        let dx = this.mouse.x - this.x;
        let dy = this.mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        //check if colliding
        if (distance < this.mouse.radius + this.fontSize) {
            this.pushed = true;
            setTimeout(()=>{
                this.pushed = false;
            },1100);
            // check from which side the character collides (and if it is far enough from the edge)
            if (this.mouse.x < this.x && this.x < this.canvasWidth - this.fontSize * this.pushRadius) this.pushCharacter(+1,'x');
            if (this.mouse.x > this.x && this.x > this.fontSize * this.pushRadius) this.pushCharacter(-1,'x');
            if (this.mouse.y < this.y && this.y < this.canvasHeight - this.fontSize * this.pushRadius) this.pushCharacter(+1, 'y');
            if (this.mouse.y > this.y && this.y > this.fontSize * this.pushRadius) this.pushCharacter(-1, 'y');
        }
    }

    /**
     * Pushes a particle in a defined direction and coordinate axis, 
     * and resets its position afer some time
     * @param {+1 | -1} direction
     * @param {'x' | 'y'} coordinate
     */
    pushCharacter(direction: number, coordinate: string) {
        if (coordinate == 'y') {
            this.y += direction * this.pushRadius;
            setTimeout(()=>{
                this.y -= (direction * this.pushRadius + this.speed);
            }, 1000);
        }
        if (coordinate == 'x') {
            this.x += direction * this.pushRadius;
            setTimeout(()=>{
                this.x -= direction * this.pushRadius;
            }, 1000);
        }
    }

    /**
     * Creates a transparent gradient canvas background that is used to color the characters on the canvas.
     * This is achieven dy applying the gradient before drawing each character.
     */
    createCanvasCharGradient() {
        let length;
        if (this.canvasHeight > this.canvasWidth) length = this.canvasWidth;
        else length = this.canvasHeight;
        this.charGradient = this.ctx.createRadialGradient(this.canvasWidth / 2, this.canvasHeight / 2, 150, this.canvasWidth / 2, this.canvasHeight / 2, length*0.8); // (x1,y1,radius1,x2,y2,radius2) // inner circle (x,y,radius 1 && outer circle (x,y,radius 22)) --> gradient will be drawn between these two circles
        this.charGradient.addColorStop(0, 'rgba(0,255,255, 0.5)'); // (offset[0,1], color) , offset 0 == start, offset 1 == end
        this.charGradient.addColorStop(0.5, 'rgba(255,255,255, 0.5)');
        this.charGradient.addColorStop(0.8, 'rgba(255,0,255, 0.5)');
    }

}