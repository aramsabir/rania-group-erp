import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lock-screen01',
  templateUrl: './lock-screen01.component.html',
  styleUrls: ['./lock-screen01.component.scss']
})
export class LockScreen01Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
