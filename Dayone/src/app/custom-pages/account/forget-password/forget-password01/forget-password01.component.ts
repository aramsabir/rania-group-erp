import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password01',
  templateUrl: './forget-password01.component.html',
  styleUrls: ['./forget-password01.component.scss']
})
export class ForgetPassword01Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
