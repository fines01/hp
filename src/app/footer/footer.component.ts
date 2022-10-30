import { Component, OnDestroy, OnInit } from '@angular/core';
import { slideUpToplinkAnimation } from '../animations';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [slideUpToplinkAnimation]
})
export class FooterComponent implements OnInit, OnDestroy {

  linkBaseTransformPosition = 'translate(-50%, -100%) scale(1)';
  mobileQuery: string = '(max-width: 575px)';//MediaQueryList; $breakpoint-sm = 575px;
  breakPointSubscription!: Subscription;
  destroyed = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver) {
    //this.mobileQuery = mediaMatcher.matchMedia('(max-width: 815px)');
   }

  ngOnInit(): void {
    this.breakpointObserver.observe(this.mobileQuery).pipe(takeUntil(this.destroyed)).subscribe( result=>{
      // if (Object.values(result.breakpoints)[0]) this.linkBaseTransformPosition = 'translate(-50%, -190%) scale(1)';
      if (result.matches) this.linkBaseTransformPosition = 'translate(-50%, -190%) scale(1)';
      else this.linkBaseTransformPosition = 'translate(-50%, -100%) scale(1)';
    });
  }

  ngOnDestroy(): void {
    if (this.breakPointSubscription) this.breakPointSubscription.unsubscribe(); 
    this.destroyed.next();
    this.destroyed.complete();
  }

  onScrollToTop() {
    window.scrollTo(0,0);
  }

}
