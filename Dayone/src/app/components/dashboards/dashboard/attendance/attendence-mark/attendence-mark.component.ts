import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-attendence-mark',
  templateUrl: './attendence-mark.component.html',
  styleUrls: ['./attendence-mark.component.scss']
})
export class AttendenceMarkComponent implements OnInit {
  model!: NgbDateStruct;

  constructor() { }

  ngOnInit(): void {
  }

}
