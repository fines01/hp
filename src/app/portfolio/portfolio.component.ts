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

  //@ViewChild('portfolio') sectionRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.filteredProjects = projects;
  }

  filterProjects(filterTerm?: string) {
    if (filterTerm) this.filteredProjects = projects.filter((project)=>{
      return (project.tags.indexOf(filterTerm) > -1)
    });
    else this.filteredProjects = projects;
    this.filter = filterTerm;
  }

}
