import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { slideInAnimation, slideInReverseAnimation, slideUpAnimation } from '../animations';
import { projects } from 'src/assets/data/projects';
import { Project } from '../interfaces/project';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [ slideInAnimation, slideInReverseAnimation, slideUpAnimation ],
})
export class PortfolioComponent implements OnInit {

  filteredProjects: Project[] = projects;
  filter!: string | undefined;

  showImgOverlay: boolean = false;

  //@ViewChild('portfolio') sectionRef!: ElementRef;

  constructor(private navService: NavigationService) { }

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

  showOverlay(index: number){
    console.log(index);
    this.showImgOverlay = true;
  }

  hideOverlay() {
    this.showImgOverlay = false;
  }

  onIntersection(event: any){
    // console.log(isVisible);
    // if (isVisible) 
    if (event) this.navService.visibleNavSection = 'portfolio';
  }

}
