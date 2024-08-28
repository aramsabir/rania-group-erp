import { Component, HostListener, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { SwitcherService } from 'src/app/shared/services/switcher.service';

@Component({
  selector: 'app-support-system',
  templateUrl: './support-system.component.html',
  styleUrls: ['./support-system.component.scss']
})
export class SupportSystemComponent implements OnInit {

  constructor(public layout: SwitcherService){ }

  ngOnInit(): void {
    localStorage.removeItem('DayoneHorizontal');
    localStorage.removeItem('DayoneHorizontalHover');
    document.querySelector('body')?.classList.add('main-content','main');



    let boxed: any = document.querySelector('#myonoffswitch19');
    let body = document.querySelector('body');
    let html = document.querySelector('html');
    let ltr = document.querySelectorAll('#myonoffswitch54');
    let rtl = document.querySelectorAll('#myonoffswitch55');
    let styleId = document.querySelector('#style');
    
    fromEvent(boxed, 'click').subscribe(() => {
      document.body?.classList.add('boxed');
      document.body?.classList.remove('default');
    });
      // LTR
    fromEvent(ltr, 'click').subscribe(() => {
      //add
      body?.classList.add('ltr');
      html?.setAttribute('dir', 'ltr');
      styleId?.setAttribute( 'href', '/assets/plugins/bootstrap/css/bootstrap.css');
      //remove
      body?.classList.remove('rtl');
      localStorage.removeItem('DayoneRtl')
    });
    // RTL
    fromEvent(rtl, 'click').subscribe(() => {
      //add
      body?.classList.add('rtl');
      html?.setAttribute('dir', 'rtl');
      styleId?.setAttribute('href','/assets/plugins/bootstrap/css/bootstrap.rtl.css');
      //remove
      body?.classList.remove('ltr');
      localStorage.setItem('DayoneRtl', 'true');
  });
  }
  toggleSwitcher() {
    this.layout.emitSwitcherChange(false);
    let bothSwitcher = document.querySelectorAll('.demo-icon');
    bothSwitcher.forEach((el, i)=>{
      el.classList.remove('false')
    })
  }

  scrolled!: boolean;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.scrolled = true
    }
    else{
      this.scrolled = false
    }
  }

  ngOnDestroy(){
    location.reload()
  }
}
