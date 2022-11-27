import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { slideInAnimation, slideInBarAnimation, slideInReverseAnimation, turnCardsAnimation } from '../../animations';
import { Skill } from '../../interfaces/skill';
import { skills } from 'src/assets/data/skills';
import { about } from 'src/assets/data/about';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [ slideInAnimation, slideInReverseAnimation, slideInBarAnimation, turnCardsAnimation, ],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  skills!: Skill[];
  aboutHtml!: any;

  constructor( private navService: NavigationService) { }

  ngOnInit(): void {
    this.skills = skills;
    this.aboutHtml = about;
    //window.scrollTo(0, 0);
    console.log(this.aboutHtml)
  }

  onIntersection(event: any){
    if (event) this.navService.visibleNavSection = 'about';
  }


}
