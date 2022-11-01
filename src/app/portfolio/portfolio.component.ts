import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { slideInAnimation, slideInReverseAnimation, slideUpAnimation } from '../animations';
import { projects } from 'src/assets/data/projects';
import { Project } from '../interfaces/project';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [ slideInAnimation, slideInReverseAnimation, slideUpAnimation ],
})
export class PortfolioComponent implements OnInit {

  filteredProjects: Project[] = projects;
  filter!: string | undefined;

  headerAnimationIn: boolean = false;
  btnAnimationIn: boolean = false;
  projectRowAnimationInArr: boolean[] = [];

  //@ViewChild('portfolio') sectionRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.filteredProjects = projects;
  }

  // setIntersection(isIntersecting: boolean, element: string) {
  //   if (element == 'header') this.headerAnimationIn = isIntersecting; // now also check for scroll-direction? (scroll-up: stay in)
  //   if (element == 'buttons') this.btnAnimationIn = isIntersecting;
  // }

  // setRowIntersection(isIntersecting: boolean, elementIndex: number){
  //   this.projectRowAnimationInArr[elementIndex] = isIntersecting;
  // }

  filterProjects(filterTerm?: string) {
    if (filterTerm) this.filteredProjects = projects.filter((project)=>{
      return (project.tags.indexOf(filterTerm) > -1)
    });
    else this.filteredProjects = projects;
    this.filter = filterTerm;
  }

}
