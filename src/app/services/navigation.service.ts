import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  // navSections = ['home', 'about', 'portfolio', 'contact'];
  // visibleSectionIndex= 0;
  // visibleNavSection: string = this.navSections[this.visibleSectionIndex];
  visibleNavSection: string = 'home';

  constructor() { }
}
