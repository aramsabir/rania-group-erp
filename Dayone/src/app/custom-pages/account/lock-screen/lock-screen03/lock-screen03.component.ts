import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lock-screen03',
  templateUrl: './lock-screen03.component.html',
  styleUrls: ['./lock-screen03.component.scss']
})
export class LockScreen03Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }

}
