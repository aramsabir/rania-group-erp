import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-danger-message',
  templateUrl: './danger-message.component.html',
  styleUrls: ['./danger-message.component.scss']
})
export class DangerMessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('horizontal', 'horizontal-hover')
    document.querySelector('body')?.classList.add('sidebar-mini')
  }
}
