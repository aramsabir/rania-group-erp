import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login02',
  templateUrl: './login02.component.html',
  styleUrls: ['./login02.component.scss']
})
export class Login02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
