import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, Scroll} from '@angular/router';
import { Subscription } from 'rxjs';
import { slideDownAnimation, slideInAnimation} from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation, slideDownAnimation ],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-website';
  currentRoute!: string;
  routerSubscription!: Subscription;
  showDivider = false;
  showMobileMenu = false;
  fragment!: any; //string

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    //viewportScroller.setOffset([0,30]);
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe( (e: any) => {
      if (e instanceof NavigationEnd) {
        this.currentRoute = e.url
        this.closeMenu();
      }
      if (e instanceof Scroll && e.anchor) {
        // anchor navigation (fixes wrong scroll position when navigating from another url)
        setTimeout(() => {
          if (typeof e.anchor == 'string') this.viewportScroller.scrollToAnchor(e.anchor);
        });
      };
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();  
  }

  @HostListener('window:scroll', [])
  onScroll(target?: any) {
    if (window.scrollY >= window.innerHeight - 60 - 117 && !this.showMobileMenu || (this.currentRoute === '/about-me' && !this.showMobileMenu)) this.showDivider = true; // 117: css var 'canvas-btm-height', 4: divider-height
    else this.showDivider = false;
  }

  toggleMenu() {
    this.showMobileMenu = !this.showMobileMenu;
    this.onScroll();
  }

  closeMenu() {
    this.showMobileMenu= false;
  }
}
