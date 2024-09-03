import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AuthService } from './shared/services/firebase/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthService) {
    // this.authService.getUserByToken()
  }

  ngOnInit() {

    // this.config.api$.subscribe((data) => {
    //   console.log('app initializer => ', data);
    // });

    fromEvent(window, 'load').subscribe(() => document.querySelector('#glb-loader')?.classList.remove('loaderShow'));

  }

}
