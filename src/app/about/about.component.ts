import { Component, OnInit } from '@angular/core';
import { skills } from 'src/assets/data/skills';
import { barAnimation, slideInAnimation, slideInBarAnimation, slideInReverseAnimation } from '../animations';
import { Skill } from '../interfaces/skill';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [ slideInAnimation, slideInReverseAnimation, barAnimation,slideInBarAnimation],
})
export class AboutComponent implements OnInit {

  skills!: Skill[];

  //journey!: any[];

  constructor() { }

  ngOnInit(): void {
    this.skills = skills;
    window.scrollTo(0, 0);
  }

}
