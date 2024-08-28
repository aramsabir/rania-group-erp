import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
})
export class Error404Component implements OnInit {
  constructor() {}
  counter: any = 0;
  ngOnInit(): void {
    setInterval(() => {
      if (this.counter > 96) this.counter = 2;
      this.counter += 1;
    }, 50);
    // this.counter = 1;
    // while (this.counter <100) {
    //   if(this.counter > 98){
    //     this.counter = 1
    //   }
    //   this.counter += 1;

    // }
  }
  progressColor(progress: number) {
    if (progress == 100) {
      return 'success';
    } else if (progress > 75) {
      return 'success';
    } else if (progress > 50) {
      return 'warning';
    } else if (progress > 25) {
      return 'orange';
    } else {
      return 'danger';
    }
  }

  ngOnDestroy() {
    document
      .querySelector('body')
      ?.classList.remove('horizontal', 'horizontal-hover');
    document.querySelector('body')?.classList.add('sidebar-mini');
  }
}
