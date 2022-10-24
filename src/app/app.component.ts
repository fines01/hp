import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-website';
  currentRoute!: string;
  routerSubscription!: Subscription;
  showDivider = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe( (events: any) => {
      if (events instanceof NavigationEnd) this.currentRoute = events.url;
    });
  }
 
  ngOnDestroy(): void {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();  
  }

  @HostListener('window:scroll', [])
  onScroll(target?: any) {
    if (window.scrollY >= window.innerHeight - 60) this.showDivider = true;
    else this.showDivider = false;
  }
}
