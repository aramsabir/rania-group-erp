import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password01',
  templateUrl: './reset-password01.component.html',
  styleUrls: ['./reset-password01.component.scss']
})
export class ResetPassword01Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
