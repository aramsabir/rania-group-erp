import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  styleUrls: ['./new-tasks.component.scss']
})
export class NewTasksComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  constructor() { }

  ngOnInit(): void {
  }

}
