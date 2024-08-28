import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lock-screen02',
  templateUrl: './lock-screen02.component.html',
  styleUrls: ['./lock-screen02.component.scss']
})
export class LockScreen02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
