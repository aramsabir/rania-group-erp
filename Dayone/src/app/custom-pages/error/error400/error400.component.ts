import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error400',
  templateUrl: './error400.component.html',
  styleUrls: ['./error400.component.scss']
})
export class Error400Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
