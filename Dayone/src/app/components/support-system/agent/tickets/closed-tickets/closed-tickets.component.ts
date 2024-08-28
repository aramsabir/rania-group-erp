import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.scss']
})
export class ClosedTicketsComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  page = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
