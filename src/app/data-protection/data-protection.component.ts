import { Component, OnInit } from '@angular/core';
import { dataProtection } from 'src/assets/data/legalAT';

@Component({
  selector: 'app-data-protection',
  templateUrl: './data-protection.component.html',
  styleUrls: ['./data-protection.component.scss']
})
export class DataProtectionComponent implements OnInit {

  html: string = dataProtection;

  constructor() { }

  ngOnInit(): void {
  }

}
