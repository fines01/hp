import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hp';
  showDivider = false;

  @HostListener('window:scroll', [])
  onScroll() {
    if (window.scrollY >= window.innerHeight - 60) this.showDivider = true;
    else this.showDivider = false;
  }
}
