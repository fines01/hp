export class Mouse {

    x!: number | undefined;
    y!: number | undefined;
    radius!: number;
    frame!: any;
    canvasWidth!: number;
    canvasHeight!: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.frame = document.getElementById('frame'); // in class Mouse
        this.x = undefined;
        this.y = undefined;
        this.radius = (this.canvasHeight / 80) * (this.canvasWidth / 80);
        this.bindEvents();
    }

     /**
     * Binds events relevant to mouse interactions on the frame (HTML element)
     * @Todo (make own class for: Mouse)
     */
    bindEvents() {
        this.frame.addEventListener('mousemove', (event: any)=> this.setMouseCoordinates(event));
        this.frame.addEventListener('mouseout', ()=> this.clearMouseCoordinates());
        this.frame.addEventListener('touchstart', (event: any)=> this.setMouseCoordinates(event));
        this.frame.addEventListener('touchend', ()=> this.clearMouseCoordinates());
        this.frame.addEventListener('click', ()=> this.clearMouseCoordinates())
    }

    clearMouseCoordinates(){
        this.x = undefined;
        this.y = undefined;
    }

    setMouseCoordinates(event: any){
        this.x = event.x;
        this.y = event.y;
    }

}