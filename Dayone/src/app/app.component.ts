import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ConfigService } from './config.server/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor( private config: ConfigService) {}

  ngOnInit() {
    
    this.config.api$.subscribe((data) => {
      console.log('app initializer => ', data);
    });
    fromEvent(window, 'load').subscribe(() => document.querySelector('#glb-loader')?.classList.remove('loaderShow'));

  }
  
}
