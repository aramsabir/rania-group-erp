import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;

  active = 1;
  currentRate = 3;

  constructor(config: NgbRatingConfig) {
    // customize default values of ratings used by this component tree
    config.max = 5;
  }
  ngOnInit(): void {
  }

}
