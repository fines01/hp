import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { debounceTime, Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appObserveIntersection]',
  exportAs: 'intersection',
})
export class ObserveIntersectionDirective implements AfterViewInit, OnDestroy {

  // change default intersectionObserver options via input parameter if necessary:
  @Input() root: HTMLElement | null = null;
  @Input() rootMargin = '200px 0px 0px 0px';
  @Input() threshold = 1;

  // @Input() debounceTime = 225; // tells us when the user has stopped scrolling
  // @Input() isContinuous = false; // flag that we use to decide whether we want to continue observing an element for visibility changes

  @Output() isIntersecting = new EventEmitter<boolean>() //  emits an event that tells us if the element is intersecting
  //@Output() scrollDirection = new EventEmitter<string | null>();

  intersectionObserver!: IntersectionObserver;
  options!: IntersectionObserverInit;
  _intersecting = false;  
  //_scrollDirection: string | null = null; // null, +1 for down, -1 for up, or 'up', 'down'
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
        this._intersecting = true;
      }
      else {
        this.isIntersecting.emit(false);
        this._intersecting = false;
      }
    });
  }

  private checkIntersection(entry: IntersectionObserverEntry){
    return (<any>entry).isIntersecting && entry.target === this.element.nativeElement; 
  }

  private checkScrollDirection(entry: IntersectionObserverEntry) {
    // console.log(entry.boundingClientRect);
  }
  
}
