import { DOCUMENT, DatePipe } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { SwitcherService } from 'src/app/shared/services/switcher.service';

@Component({
  selector: 'app-hbf-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class HilalBrickContentComponent implements OnInit {
  layoutSub!: Subscription;
  sidenavtoggled1: any;
  lang: any = '';
  audioFile: any;

  notifications: any;
  notificationsCount: number = 0;
  company: string = 'bas-home'

  constructor(
    private layoutService: SwitcherService,
    public httpService: HttpService,
    public dic: DicService,
    private route: ActivatedRoute,
    private router: Router,
    public datePipe: DatePipe,) {
    this.lang = this.dic.lang();
    this.layoutSub = layoutService.SwitcherChangeEmitted.subscribe(
      (value) => {}
    );

    // this.getNotifications();
    // setInterval(() => this.getNotifications(), 30000);
  }
  ngOnInit() {}
  toggleSwitcher() {
    this.layoutService.emitSwitcherChange(false);
  }
  ngAfterViewInit() {
    this.audioFile = new Audio('/assets/audio/notification.mp3');
  }

  scrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 70;
  }
  
  hoverEffect($event: any) {
    this.sidenavtoggled1 =
      $event.type == 'mouseover'
        ? document
            .querySelector('.sidenav-toggled')
            ?.classList.add('sidenav-toggled1')
        : document
            .querySelector('.sidenav-toggled')
            ?.classList.remove('sidenav-toggled1');
  }

 

  numbersObject: { [x: string]: string } = {
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
    '0': '٠',
  };
  transform(n: number | string): string {
    if (n === null || n === undefined) return '';
    n = n + ''; // to make it a string if it was a number
    let newString = '';
    for (let i = 0; i < n.length; i++) {
      if (this.numbersObject[n.charAt(i)])
        newString += this.numbersObject[n.charAt(i)];
      else newString += n.charAt(i);
    }

    return newString;
  }
}
