import { Component, OnInit } from '@angular/core';
import { skills } from 'src/assets/data/skills';
import { slideInAnimation, slideInBarAnimation, slideInReverseAnimation } from '../animations';
import { Skill } from '../interfaces/skill';
import { about } from 'src/assets/data/about';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [ slideInAnimation, slideInReverseAnimation,slideInBarAnimation],
})
export class AboutComponent implements OnInit {

  skills!: Skill[];
  about!: any;

  constructor() { }

  ngOnInit(): void {
    this.skills = skills;
    this.about = about;
    window.scrollTo(0, 0);
  }

}
