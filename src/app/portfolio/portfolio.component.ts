import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SlideInAnimation } from '../animations';
import { projects } from 'src/assets/data/projects';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [ SlideInAnimation ],
})
export class PortfolioComponent implements OnInit, OnDestroy {

  filteredProjects: any[] = projects;
  filter!: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.filteredProjects = projects;
  }

  ngOnDestroy(): void {
      console.log('bye port:)');
  }

  filterProjects(filterTerm?: string) {
    if (filterTerm) this.filteredProjects = projects.filter((project)=>{
      return (project.tags.indexOf(filterTerm) > -1)
    });
    else this.filteredProjects = projects;
    this.filter = filterTerm;
  }

  onScroll(event: any){
  }


}
