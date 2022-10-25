import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FloatEffect } from 'src/models/float-effect';
import { RainEffect } from 'src/models/rain-effect.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>
  @ViewChild('frame') frame!: ElementRef<any>;
  
  context!: CanvasRenderingContext2D | null;
  animation!: RainEffect | FloatEffect;
  canvasWidth!: number;
  canvasHeight!: number;
  
  constructor() { }
  
  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.init()
  }

  setCanvasHeight(){
    this.canvasWidth = this.frame.nativeElement.clientWidth;
    this.canvasHeight = this.frame.nativeElement.clientHeight;
    this.canvas.nativeElement.width = this.canvasWidth;
    this.canvas.nativeElement.height = this.canvasHeight;
  }

  @HostListener('window:resize')
  init(){
    // console.log(this.frame.nativeElement.clientWidth)
    this.cancelAnimation();
    this.setCanvasHeight();
    if(this.canvasWidth && this.canvasHeight && this.context) this.animation = new FloatEffect(this.canvasWidth, this.canvasHeight, this.context);
    // if(this.canvasWidth && this.canvasHeight && this.context) this.animation = new RainEffect(this.canvasWidth, this.canvasHeight, this.context);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (window.scrollY >= window.innerHeight * 0.1) this.cancelAnimation(); // but maybe still show first frame (else sometimes empty)
    else this.startAnimation();
  }

  cancelAnimation() {
        if (this.animation && this.animation.animationLoop) cancelAnimationFrame(this.animation.animationLoop);
    }

    startAnimation() {
        if (this.animation) this.animation.checkAnimationFrameTime(Date.now());
    }

}
