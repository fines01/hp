import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  projects = [
    {
      name: 'My website',
      description: 'My portofolio website. This site is built with Angular and written in HTML, SCSS and TypeScript.',
      img: 'assets/img/example2.jpg',
      GHlink: 'https://github.com/fines01/hp', //is private rn 
      link: '', // disabled
      tags: ['Angular','TypeScript','SCSS','HTML'],
    },
    // Kochwelten, photogallerie, TicTacToe, QuizApp etc später raus nehmen
    {
      name: 'Kochwelt',
      description: 'My first project which was built in a team. Building something together as a team is a whole new learning experience in itself.',
      img: 'assets/img/example3.jpg',
      GHlink: '', // no GH, disabled
      link: 'https://ines-fritsch.developerakademie.net/Kochwelt/pages/',
      tags: ['JavaScript','CSS','HTML'],
    },
    {
      name: 'Picture Gallery',
      description: 'Simple gallery written in JavaScript, HTML and CSS.',
      img: 'assets/img/example4.png',
      GHlink: 'https://github.com/fines01/picture-gallery',
      link: 'https://ines-fritsch.developerakademie.net/fotoalbum/',
      tags: ['JavaScript','CSS','HTML'],
    },
    {
      name: 'Tic Tac Toe',
      description: 'The classic game, implemented as a handsome web game. A single player option allows you to play against the "computer".', // eye-pleasing
      img: 'assets/img/example.jpg',
      GHlink: 'https://github.com/fines01/tictactoe',
      link: 'https://ines-fritsch.developerakademie.net/tictactoe/',
      tags: ['JavaScript','CSS','HTML'],
    },
    // Ende alte Projekte
    {
      name: 'Pokedex',
      description: 'Fun application making use of the extensive PokéAPI, because who doesn\'t love Pokemon?', // Verweis auf mini-backend (simulation) & smallest_backend_ever GH
      img: 'assets/img/example2.jpg',
      GHlink: 'https://github.com/fines01/pokedex',
      link: 'https://ines-fritsch.developerakademie.net/pokedex/',
      tags: ['JavaScript','CSS','HTML', 'API'],
    },
    {
      name: 'Join',
      description: 'A task management application, written in pure JavaScript, HTML and CSS. Manage your tasks according to the Kanban principle.', // Verweis auf mini-backend (simulation) & smallest_backend_ever GH
      img: 'assets/img/example3.jpg',
      GHlink: 'https://github.com/fines01/join',
      link: 'https://ines-fritsch.developerakademie.net/join/',
      tags: ['JavaScript','CSS','HTML'],
    },
    {
      name: 'El Pollo Loco',
      description: 'This is a fun little JavaScript based jump-and-run game. The focus lies in object-oriented programming with pure vanilla JavaScript, using ES6 classes ???...',
      img: 'assets/img/example4.png',
      GHlink: 'https://github.com/fines01/el-pollo-loco',
      link: 'https://ines-fritsch.developerakademie.net/el-pollo-loco/', //aktuelle version hochladen!
      tags: ['JavaScript','CSS','HTML'],
    },
    {
      name: 'Ring Of Fire',
      description: 'The popular drinking game as Angular based web-app.',
      img: 'assets/img/example.jpg',
      GHlink: 'https://github.com/fines01/ringoffire',
      link: 'https://ines-fritsch.developerakademie.net/ring-of-fire',
      tags: ['Angular','TypeScript','SCSS','HTML', 'Firebase'],
    },
    {
      name: 'Simple CRM',
      description: 'A simple but smart project management tool.',
      img: 'assets/img/example2.jpg',
      GHlink: 'https://github.com/fines01/simple-crm',
      link: 'https://ines-fritsch.developerakademie.net/simple-crm/home/sign-in',
      tags: ['Angular','TypeScript','SCSS','HTML', 'Firebase', 'NoSQL'],
    },
    
  ];

  filteredProjects: any[] = this.projects;
  filter!: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.filteredProjects = this.projects;
  }

  filterProjects(filterTerm?: string) {
    if (filterTerm) this.filteredProjects = this.projects.filter((project)=>{
      return (project.tags.indexOf(filterTerm) > -1)
    });
    else this.filteredProjects = this.projects;
    this.filter = filterTerm;
  }

}
