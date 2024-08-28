import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-inbox',
  templateUrl: './email-inbox.component.html',
  styleUrls: ['./email-inbox.component.scss']
})
export class EmailInboxComponent implements OnInit {
  page =1;
  constructor() { }

  ngOnInit(): void {
  }

}
