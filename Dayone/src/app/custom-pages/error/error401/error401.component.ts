import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error401',
  templateUrl: './error401.component.html',
  styleUrls: ['./error401.component.scss']
})
export class Error401Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
