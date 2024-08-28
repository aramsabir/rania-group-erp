import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-active-tickets',
  templateUrl: './active-tickets.component.html',
  styleUrls: ['./active-tickets.component.scss']
})
export class ActiveTicketsComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  page = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

}
