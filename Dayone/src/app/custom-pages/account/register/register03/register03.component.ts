import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register03',
  templateUrl: './register03.component.html',
  styleUrls: ['./register03.component.scss']
})
export class Register03Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
