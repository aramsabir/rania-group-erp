import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-comparsion',
  templateUrl: './image-comparsion.component.html',
  styleUrls: ['./image-comparsion.component.scss']
})
export class ImageComparsionComponent implements OnInit {

  headers: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  xd(e:any): void {
    e.click();
    // setTimeout(() => (document.scrollingElement?.scrollTop -= 65), 10);
  }
}
