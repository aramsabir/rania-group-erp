import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password03',
  templateUrl: './forget-password03.component.html',
  styleUrls: ['./forget-password03.component.scss']
})
export class ForgetPassword03Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
