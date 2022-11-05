import { Component, OnInit } from '@angular/core';
import { imprint } from 'src/assets/data/legalAT';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

 html: string = imprint;

  constructor() { }

  ngOnInit(): void {
    
  }

}
