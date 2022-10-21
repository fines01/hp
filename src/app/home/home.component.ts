import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CharacterRain } from 'src/models/character-rain.class';
import { Character } from 'src/models/character.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>
  @ViewChild('frame') frame!: ElementRef<any>;
  
  context!: CanvasRenderingContext2D | null;
  animation!: CharacterRain;
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
    this.setCanvasHeight();
    this.cancelAnimation();
    if(this.canvasWidth && this.canvasHeight && this.context) this.animation = new CharacterRain(this.canvasWidth, this.canvasHeight, this.context);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    console.log(window.scrollY)
    if (window.scrollY >= window.innerHeight * 0.5) this.cancelAnimation();
    else this.startAnimation();
  }

  cancelAnimation() {
        if (this.animation && this.animation.animationLoop) cancelAnimationFrame(this.animation.animationLoop);
    }

    startAnimation() {
        if (this.animation) this.animation.checkAnimationFrameTime(Date.now());
    }

}
