import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // todo: send data to app (to menu to activate active section-links) --> data share service via behavioral subject
  homeInView!: boolean;
  pfInView!: boolean;
  contactInView!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  // check if in view:
  onIntersection(intersecting: boolean, section: string) {
    if (section === 'home') this.homeInView = intersecting;
    if (section === 'portfolio') this.pfInView = intersecting;
    if (section === 'contact') this.contactInView = intersecting
  }
  
}
