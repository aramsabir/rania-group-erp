import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login01',
  templateUrl: './login01.component.html',
  styleUrls: ['./login01.component.scss']
})
export class Login01Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
