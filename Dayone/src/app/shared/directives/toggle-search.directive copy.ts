import { Directive, HostListener } from '@angular/core';
import { NavService } from '../services/nav.service';

@Directive({
  selector: '[appToggleSearch]'
})
export class ToggleSearchDirective {
  private body:any = document.querySelector('body');
  constructor(private navService : NavService) { }

  @HostListener('click') toggleTheme(){
    if (this.navService.search!= !this.navService.search) {
      this.body.classList.toggle('search-show')
    }
  }
}
