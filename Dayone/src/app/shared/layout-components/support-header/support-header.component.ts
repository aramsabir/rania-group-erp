import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent } from 'rxjs';
import { AuthService } from '../../services/firebase/auth.service';
import { NavService } from '../../services/nav.service';
import { SwitcherService } from '../../services/switcher.service';

@Component({
  selector: 'app-support-header',
  templateUrl: './support-header.component.html',
  styleUrls: ['./support-header.component.scss'],
})
export class SupportHeaderComponent implements OnInit {
  scrolled!: boolean;
  constructor(
    public authService: AuthService,
    public layout: SwitcherService,
    public navServices: NavService,
    private modalService: NgbModal
  ) {}
  private supportMenuClick$;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }

  ngOnInit(): void {
    let subIcon = document.querySelectorAll('.sub-icon');
    subIcon.forEach((e: any) => {
      const supportMenuClick = fromEvent(e, 'click');

      this.supportMenuClick$ = supportMenuClick.subscribe(() => {
        subIcon.forEach((el: any) => {
          if (el !== e) {
            el.nextElementSibling.style.display = 'none';
          }
        });
        if (e.nextElementSibling.style.display != 'block') {
          e.nextElementSibling.style.display = 'block';
        } else {
          e.nextElementSibling.style.display = 'none';
        }
      });
    });
  }
  signout() {
    this.authService.SignOut();
  }
  toggleSwitcher(e: any) {
    let bothSwitcher = document.querySelectorAll('.demo-icon');
    bothSwitcher.forEach((el, i) => {
      if (el.classList.contains('false')) {
        this.layout.emitSwitcherChange(false);
        el.classList.remove('false');
      } else {
        this.layout.emitSwitcherChange(true);
        el.classList.add('false');
      }
    });
  }

  toggleSidebar() {
    if (document.querySelector('.app')?.classList.contains('active')) {
      document.querySelector('.app')?.classList.remove('active');
      document.querySelector('.horizontal-overlapbg')?.classList.remove('active');
    } else {
      document.querySelector('.app')?.classList.add('active');
      document.querySelector('.horizontal-overlapbg')?.classList.add('active');
    }
  }

  open(content) {
    this.modalService.open(content);
  }

  ngOnDestroy() {
    // unsubscribing the Observable
    this.supportMenuClick$.unsubscribe();
  }
  sidebarClose(){
    document.querySelector('.app')?.classList.remove('active');
  }
}
