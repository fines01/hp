import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SlideInAnimation, slideUpAnimation } from '../animations';
import { projects } from 'src/assets/data/projects';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [ SlideInAnimation, slideUpAnimation ],
})
export class PortfolioComponent implements OnInit {

  filteredProjects: any[] = projects;
  filter!: string | undefined;

  headerAnimationIn: boolean = false;
  btnAnimationIn: boolean = false;
  projectRowAnimationIn: boolean = false;

  // @ViewChild('portfolio') sectionRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.filteredProjects = projects;
  }

  test(value?: any){
    console.log('Intersecting pf: ', value);
  }

  setIntersection(isIntersecting: boolean, element: string) {
    if (element == 'header') this.headerAnimationIn = isIntersecting; // now also check for scroll-direction? (scroll-up: stay in)
    if (element == 'buttons') this.btnAnimationIn = isIntersecting;
  }

  filterProjects(filterTerm?: string) {
    if (filterTerm) this.filteredProjects = projects.filter((project)=>{
      return (project.tags.indexOf(filterTerm) > -1)
    });
    else this.filteredProjects = projects;
    this.filter = filterTerm;
  }

}
