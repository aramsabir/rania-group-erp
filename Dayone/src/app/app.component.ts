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
    if(localStorage.getItem('list_type') == '' || localStorage.getItem('list_type') ==  null){
      localStorage.setItem('list_type','list');
    }
    // this.config.api$.subscribe((data) => {
    //   console.log('app initializer => ', data);
    // });

    fromEvent(window, 'load').subscribe(() => document.querySelector('#glb-loader')?.classList.remove('loaderShow'));

  }

}
