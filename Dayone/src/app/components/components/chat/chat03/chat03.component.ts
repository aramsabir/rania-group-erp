import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-chat03',
  templateUrl: './chat03.component.html',
  styleUrls: ['./chat03.component.scss']
})
export class Chat03Component implements OnInit {

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }
  open(content) {
    this.modalService.open(content)
  }
}
