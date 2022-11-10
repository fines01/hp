import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FloatEffect } from 'src/models/float-effect';
import { RainEffect } from 'src/models/rain-effect.class';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [],
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>
  @ViewChild('frame') frame!: ElementRef<any>;
  
  context!: CanvasRenderingContext2D | null;
  animation!: RainEffect | FloatEffect | null;
  canvasWidth!: number;
  canvasHeight!: number;
  
  constructor() { }
  
  ngOnInit(): void {
    this.calculateDocumentHeight();
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.init()
  }

  setCanvasSize(){
    this.canvasWidth = this.frame.nativeElement.clientWidth;
    this.canvasHeight = this.frame.nativeElement.clientHeight;
    this.canvas.nativeElement.width = this.canvasWidth;
    this.canvas.nativeElement.height = this.canvasHeight;
  }

  @HostListener('window:resize')
  init(){
    this.calculateDocumentHeight();
    this.cancelAnimation();
    this.setCanvasSize();
    if(this.context) this.animation = new FloatEffect(this.canvasWidth, this.canvasHeight, this.context); // option A.: floating & connecting particles
    //if(this.context) this.animation = new RainEffect(this.canvasWidth, this.canvasHeight, this.context); // option B.: character rain
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (window.scrollY >= window.innerHeight * 0.1) this.cancelAnimation(); // but maybe still show first frame (else sometimes empty)
    else this.startAnimation();
  }

  cancelAnimation() {
    if (this.animation && this.animation.animationLoop) {
      cancelAnimationFrame(this.animation.animationLoop);
      this.animation.paused = true;
    }
  }

  startAnimation() {
    if (this.animation && this.animation.animationLoop) {
      this.animation.checkAnimationFrameTime(0);
      this.animation.paused = false;
    } 
  }

  /** calculates actual inner height of the browser window. 
   * This fixes issue with vh on mobile devices (like the browser toolbar height, which is not taken into account in vh) */
  calculateDocumentHeight(){
    let documentHeight = window.innerHeight;
    document.documentElement.style.setProperty('view-height', documentHeight + 'px');
  }

  

}
