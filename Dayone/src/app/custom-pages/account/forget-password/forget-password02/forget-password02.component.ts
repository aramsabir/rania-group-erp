import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password02',
  templateUrl: './forget-password02.component.html',
  styleUrls: ['./forget-password02.component.scss']
})
export class ForgetPassword02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
