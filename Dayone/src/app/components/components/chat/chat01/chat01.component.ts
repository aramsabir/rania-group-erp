import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat01',
  templateUrl: './chat01.component.html',
  styleUrls: ['./chat01.component.scss']
})
export class Chat01Component implements OnInit {
  active = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

}
