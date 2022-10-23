import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  skills = [
    {
      name: 'JavaScript',
      value: '50',
    },
    {
      name: 'Angular',
      value: '40',
    },
    {
      name: 'HTML & CSS',
      value: '60',
    },
    {
      name: 'SCRUM',
      value: '70',
    },
    {
      name: 'Git',
      value: '45',
    },
    {
      name: 'REST API',
      value: '35',
    },
    {
      name: 'Databases',
      value: '45',
    },
    {
      name: 'Design Thinking',
      value: '65',
    },
    {
      name: 'Test Automation',
      value: '30',
    },
  ];

  journey = [
    {
      icon: '',
      header: '',
      description: '',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
