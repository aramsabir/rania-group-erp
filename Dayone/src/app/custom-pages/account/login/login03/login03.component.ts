import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login03',
  templateUrl: './login03.component.html',
  styleUrls: ['./login03.component.scss']
})
export class Login03Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
