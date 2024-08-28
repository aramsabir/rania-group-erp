import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  page = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
