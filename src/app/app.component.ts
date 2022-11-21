import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, Scroll} from '@angular/router';
import { Subscription } from 'rxjs';
import { slideDownAnimation, slideInAnimation} from './animations';
import { NavigationService } from './services/navigation.service';

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

  constructor(private router: Router, private viewportScroller: ViewportScroller, private navService: NavigationService) { 
    // viewportScroller.setOffset([0,30]);
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe( (e: any) => {
      if (e instanceof NavigationEnd) {
        this.currentRoute = e.url;
        //if (this.currentRoute === '/about-me' || this.currentRoute == '/data-protection' || this.currentRoute == '/imprint') this.navService.visibleNavSection = '';
        if (this.currentRoute.substring(0,2) !== '/#') this.navService.visibleNavSection = '';
        this.closeMenu();
      }
      if (e instanceof Scroll && e.anchor) {
        // anchor navigation (fixes wrong scroll position when navigating from another url)
        setTimeout(() => {
          if (typeof e.anchor == 'string') this.viewportScroller.scrollToAnchor(e.anchor);
        },125);
      };
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();  
  }

  // @HostListener('window:scroll', [])
  // onScroll(target?: any) {
  //   console.log(this.navService.visibleNavSection);
  // }

  toggleMenu() {
    this.showMobileMenu = !this.showMobileMenu;
    //this.onScroll();
  }

  closeMenu() {
    this.showMobileMenu= false;
  }

  sectionInView(sectionName: string) {
    if (this.navService.visibleNavSection === sectionName) return true;
    return false;
  }
}
