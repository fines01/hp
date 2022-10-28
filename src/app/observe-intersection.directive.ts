import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { debounceTime, Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appObserveIntersection]',
  exportAs: 'intersection',
})
export class ObserveIntersectionDirective implements AfterViewInit, OnDestroy {

  @Input() root: HTMLElement | null = null;
  @Input() rootMargin = '200px 0px 0px 0px';
  @Input() threshold = 1;
  @Input() debounceTime = 225; // tells us when the user has stopped scrolling
  @Input() isContinuous = false; // flag that we use to decide whether we want to continue observing an element for visibility changes

  @Output() isIntersecting = new EventEmitter<boolean>() //  emits an event that tells us if the element is intersecting
  @Output() scrollDirection = new EventEmitter<string | null>();

  options!: IntersectionObserverInit;
  intersectionObserver!: IntersectionObserver;
  _intersecting = false;  
  _scrollDirection: string | null = null; // null, +1 for down, -1 for up, or 'up', 'down'
  // subscription!: Subscription;

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
      this.options = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    } 

    this.observeIntersection();
    //this.subscription = this.createAndObserve();
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
    this.intersectionObserver.unobserve(<Element>(this.element.nativeElement));
    this.intersectionObserver.disconnect();
  }

  observeIntersection(){
    this.intersectionObserver = new IntersectionObserver( entries => {
      this.checkForIntersection(entries);
    }, this.options);

    this.intersectionObserver.observe(this.element.nativeElement);
  }

  private checkForIntersection(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIntersection(entry)) {
        //this.checkScrollDirection(entry);
        this.isIntersecting.emit(true);
        // this.scrollDirection.emit(this._scrollDirection);
        this._intersecting = true;
        // this.intersectionObserver.unobserve(<Element>(this.element.nativeElement));
        // this.intersectionObserver.disconnect();
      }
      else this.isIntersecting.emit(false);
    });
  }

  private checkIntersection(entry: IntersectionObserverEntry){
    return (<any>entry).isIntersecting && entry.target === this.element.nativeElement; 
  }

  private checkScrollDirection(entry: IntersectionObserverEntry) {
    // console.log(entry.boundingClientRect);
    // if (entry.boundingClientRect.top < 0) {
    //       if (entry.isIntersecting) {
    //         // entered viewport at the top edge, hence scroll direction is up
    //         this._scrollDirection = 'up';
    //         this.scrollDirection.emit('up');
    //         console.log(this._scrollDirection);
    //       } else {
    //         // left viewport at the top edge, hence scroll direction is down
    //         this.scrollDirection.emit('down');;
    //       }
    // } 

  }
  
}
