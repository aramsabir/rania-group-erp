import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register02',
  templateUrl: './register02.component.html',
  styleUrls: ['./register02.component.scss']
})
export class Register02Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
