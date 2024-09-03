import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { getItem, setItem, StorageItem } from 'src/app/@core/utils';
import { SwitcherService } from '../../services/switcher.service';
import { checkHoriMenu } from '../sidebar/sidebar';
import * as switcher from './switcher'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {
  layoutSub: Subscription;

  body = document.querySelector('body');
  authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  @ViewChild('switcher', { static: false }) switcher!: ElementRef;
  constructor(
    public renderer: Renderer2,
    public switcherServic: SwitcherService
  ) {
    this.layoutSub = switcherServic.SwitcherChangeEmitted.subscribe((value) => {
      if (value) {
        this.renderer.addClass(this.switcher.nativeElement,'active');
        this.renderer.setStyle(this.switcher.nativeElement,'right','0px');
        value = true;
      } else {
        this.renderer.removeClass(this.switcher.nativeElement,'active');
        this.renderer.setStyle(this.switcher.nativeElement,'right','-270px');
        value = false;
      }
    });
  }
  ngOnInit(): void {
    let mainContent = document.querySelector('.main-content');
    mainContent?.classList.remove('app-content');
    switcher.localStorageBackUp();
    switcher.customClickFn();
    switcher.updateChanges();
    switcher.checkOptions();
    localStorage.setItem('DayoneHorizontalHover', 'true');
  }
  reset(){
    var auth = localStorage.getItem(StorageItem.Auth)
    var lang = localStorage.getItem('language') ?? 'en'
    var dayoneRtl = localStorage.getItem('DayoneRtl')
    var dir = localStorage.getItem('dir') ?? 'ltr'
    localStorage.clear(); 
    localStorage.setItem('language', lang);
    localStorage.setItem('dir', dir);
    localStorage.setItem('DayoneRtl', dir === 'ltr'?'true':'false');
    if (dayoneRtl) localStorage.setItem('DayoneRtl', dayoneRtl);
    localStorage.setItem(StorageItem.Auth, auth ?? '')//+

    let html:any = document.querySelector('html')
    let body = document.querySelector('body')
    html.style = ''; 
    body?.classList.add('light-header');
    body?.classList.add('dark-menu');

    body?.classList.remove('dark-mode');
    body?.classList.remove('transparent-mode');
    body?.classList.remove('dark-header');
    body?.classList.remove('color-header');
    body?.classList.remove('gradient-header');
    body?.classList.remove('light-menu');
    body?.classList.remove('color-menu');
    body?.classList.remove('gradient-menu');
    body?.classList.remove('boxed');
    body?.classList.remove('scrollable-layout');
    body?.classList.remove('bg-img1');
    body?.classList.remove('bg-img2');
    body?.classList.remove('bg-img3');
    body?.classList.remove('bg-img4');
    switcher.updateChanges();
    switcher.checkOptions();
    let primaryColorVal = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg-color').trim();
    
    document.querySelector('html')?.style.setProperty('--primary-bg-color', primaryColorVal);
    // horizontal to vertical
    let mainContent = document.querySelector('.main-content');
    let mainContainer = document.querySelectorAll('.main-container');
    let appHeader = document.querySelector('.app-header');
    let appSidebar = document.querySelector('.app-sidebar');
    let mainSidemenu = document.querySelector('.main-sidemenu');
    let appSidebar3 = document.querySelector('.app-sidebar3');
    let mainMenu = document.querySelector('.main-menu');
    let header = document.querySelector('.header');
    let styleId = document.querySelector('#style');

    mainContent?.classList.add('app-content');
    mainContainer.forEach((e,i)=>{
      e?.classList.add('container-fluid');
    })
    body?.classList.add('sidebar-mini');
    header?.classList.add('app-header');
    //remove
    body?.classList.remove('horizontal');
    body?.classList.remove('horizontal-hover');
    mainContent?.classList.remove('horizontal-content');
    mainContainer.forEach((e,i)=>{
      e?.classList.remove('container');
    })
    appHeader?.classList.remove('hor-header');
    mainContent?.classList.remove('hor-content');
    header?.classList.remove('side-header');
    appSidebar?.classList.remove('horizontal-main', 'hor-menu');
    mainMenu?.classList.remove('horizontalMenu');
    appSidebar3?.classList.remove('horizontal-mainwrapper', 'container');
    mainSidemenu?.classList.remove('container');

    document.querySelector('.slide-left')?.classList.add('d-none');
    document.querySelector('.slide-right')?.classList.add('d-none');
    document.querySelector('.slide-leftRTL')?.classList.add('d-none');
    document.querySelector('.slide-rightRTL')?.classList.add('d-none');

     
    if(dir == "ltr"){
    //add
    body?.classList.add('ltr');
    html?.setAttribute('dir', 'ltr');
    styleId?.setAttribute( 'href', './assets/plugins/bootstrap/css/bootstrap.css');
    //remove
    body?.classList.remove('rtl');
    checkHoriMenu();
    }
    
    let vertical = document.getElementById('myonoffswitch34') as HTMLInputElement;
    vertical.checked = true;
    let light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = true;
    let ltr = document.getElementById('myonoffswitch54') as HTMLInputElement;
    ltr.checked = true;
    let defaultLayout = document.getElementById('myonoffswitch18') as HTMLInputElement;
    defaultLayout.checked = true;
  }

  public color1: string = '#16263a';
  public color2: string = '#16263a';
  public color3: string = '#16263a';
  public color4: string = '#16263a';
  public color5: string = '#16263a';

  public dynamicLightPrimary(data: any): void {
    this.color1 = data.color;

    const dynamicPrimaryLight = document.querySelectorAll('input.color-primary-light');

    switcher.dynamicLightPrimaryColor(dynamicPrimaryLight, this.color1);
    
    localStorage.setItem('Dayonelight-primary-color', this.color1);
    localStorage.setItem('Dayonelight-primary-hover', this.color1);
    localStorage.setItem('Dayonelight-primary-border', this.color1);
    let light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = false;

    // Adding
    this.body?.classList.add('light-mode');
    localStorage.setItem('DayoneLightTheme', 'true');
    
    // removing
    localStorage.removeItem('DayoneDarkTheme');
    localStorage.removeItem('DayoneTransparentTheme');
    this.body?.classList.remove('dark-mode');
    this.body?.classList.remove('transparent-mode');
    this.body?.classList.remove('bg-img1');
    this.body?.classList.remove('bg-img2');
    this.body?.classList.remove('bg-img3');
    this.body?.classList.remove('bg-img4');
    
    localStorage.removeItem('Dayonedark-primary-color');
    localStorage.removeItem('Dayonetransparent-primary-color');
    localStorage.removeItem('Dayonetransparent-bg-color');
    localStorage.removeItem('Dayonetransparent-bgImg-primary-color');
    localStorage.removeItem('DayoneBgImage');
    switcher.checkOptions();
    switcher.updateChanges();
  }
  public dynamicDarkPrimary(data: any): void {
    this.color2 = data.color;

    const dynamicPrimaryDark = document.querySelectorAll('input.color-primary-dark');

    switcher.dynamicDarkPrimaryColor(dynamicPrimaryDark, this.color2);
    
    localStorage.setItem('Dayonedark-primary-color', this.color2);
    let dark = document.getElementById('myonoffswitch2') as HTMLInputElement;
    dark.checked = true;

    // Adding
    this.body?.classList.add('dark-mode');
    localStorage.setItem('DayoneDarkTheme', 'true');
    
    // removing
    localStorage.removeItem('DayoneLightTheme');
    localStorage.removeItem('DayoneTransparentTheme');
    this.body?.classList.remove('light-mode');
    this.body?.classList.remove('transparent-mode');
    this.body?.classList.remove('bg-img1');
    this.body?.classList.remove('bg-img2');
    this.body?.classList.remove('bg-img3');
    this.body?.classList.remove('bg-img4');    
    
    localStorage.removeItem('Dayonelight-primary-color');
    localStorage.removeItem('Dayonelight-primary-hover');
    localStorage.removeItem('Dayonelight-primary-border');
    localStorage.removeItem('Dayonetransparent-primary-color');
    localStorage.removeItem('Dayonetransparent-bg-color');
    localStorage.removeItem('Dayonetransparent-bgImg-primary-color');
    localStorage.removeItem('DayoneBgImage');
    switcher.checkOptions();
    switcher.updateChanges();
  }
  public dynamicTranparentPrimary(data: any): void {
    this.color3 = data.color;

    const dynamicPrimaryTrasnsparent = document.querySelectorAll('input.color-primary-transparent');

    switcher.dynamicTrasnsparentPrimaryColor(
      dynamicPrimaryTrasnsparent,
      this.color3
    );
    localStorage.setItem('Dayonetransparent-primary-color', this.color3);
    let transparent = document.getElementById('myonoffswitchTransparent') as HTMLInputElement;
    transparent.checked = true;

    // Adding
    this.body?.classList.add('transparent-mode');
    localStorage.setItem('DayoneTransparentTheme', 'true');
    
    // Removing
    localStorage.removeItem('DayoneDarkTheme');
    localStorage.removeItem('DayoneLightTheme');
    this.body?.classList.remove('light-mode');
    this.body?.classList.remove('dark-mode');
    this.body?.classList.remove('bg-img1');
    this.body?.classList.remove('bg-img2');
    this.body?.classList.remove('bg-img3');
    this.body?.classList.remove('bg-img4'); 
    this.body?.classList.remove('light-header');
    this.body?.classList.remove('dark-header');
    this.body?.classList.remove('color-header');
    this.body?.classList.remove('gradient-header');
    this.body?.classList.remove('light-menu');
    this.body?.classList.remove('color-menu');
    this.body?.classList.remove('dark-menu');
    this.body?.classList.remove('gradient-menu');   

    localStorage.removeItem('Dayonelight-primary-color');
    localStorage.removeItem('Dayonelight-primary-hover');
    localStorage.removeItem('Dayonelight-primary-border');
    localStorage.removeItem('Dayonedark-primary-color');
    localStorage.removeItem('Dayonetransparent-bg-color');
    localStorage.removeItem('Dayonetransparent-bgImg-primary-color');
    localStorage.removeItem('DayoneBgImage');
    switcher.removeForTransparent();
    switcher.updateChanges();
  }
  public dynamicTranparentBgPrimary(data: any): void {
    this.color4 = data.color;

    const dynamicPrimaryBgTrasnsparent = document.querySelectorAll('input.color-bg-transparent');

    switcher.dynamicBgTrasnsparentPrimaryColor(
      dynamicPrimaryBgTrasnsparent,
      this.color4
    );
    localStorage.setItem('Dayonetransparent-bg-color', this.color4);
    let transparent = document.getElementById('myonoffswitchTransparent') as HTMLInputElement;
    transparent.checked = true;

    // Adding
    this.body?.classList.add('transparent-mode');
    localStorage.setItem('DayoneTransparentTheme', 'true');
    
    // Removing
    localStorage.removeItem('DayoneDarkTheme');
    localStorage.removeItem('DayoneLightTheme');
    this.body?.classList.remove('light-mode');
    this.body?.classList.remove('dark-mode');
    this.body?.classList.remove('bg-img1');
    this.body?.classList.remove('bg-img2');
    this.body?.classList.remove('bg-img3');
    this.body?.classList.remove('bg-img4'); 
    this.body?.classList.remove('light-header');
    this.body?.classList.remove('dark-header');
    this.body?.classList.remove('color-header');
    this.body?.classList.remove('gradient-header');
    this.body?.classList.remove('light-menu');
    this.body?.classList.remove('color-menu');
    this.body?.classList.remove('dark-menu');
    this.body?.classList.remove('gradient-menu');

    localStorage.removeItem('Dayonelight-primary-color');
    localStorage.removeItem('Dayonelight-primary-hover');
    localStorage.removeItem('Dayonelight-primary-border');
    localStorage.removeItem('Dayonedark-primary-color');
    localStorage.removeItem('Dayonetransparent-bgImg-primary-color');
    localStorage.removeItem('DayoneBgImage');
    switcher.removeForTransparent();
    switcher.updateChanges();
  }
  public dynamicTranparentImgPrimary(data: any): void {
    this.color5 = data.color;

    const dynamicPrimaryBgImgTrasnsparent = document.querySelectorAll('input.color-primary-transparent-img');

    switcher.dynamicBgImgTrasnsparentPrimaryColor(
      dynamicPrimaryBgImgTrasnsparent,
      this.color5
    );
    
    localStorage.setItem('Dayonetransparent-bgImg-primary-color', this.color5);
    let transparent = document.getElementById('myonoffswitchTransparent') as HTMLInputElement;
    transparent.checked = true;

    if (
      document.querySelector('body')?.classList.contains('bg-img1') == false &&
      document.querySelector('body')?.classList.contains('bg-img2') == false &&
      document.querySelector('body')?.classList.contains('bg-img3') == false &&
      document.querySelector('body')?.classList.contains('bg-img4') == false
    ) {
      document.querySelector('body')?.classList.add('bg-img1');
      localStorage.setItem('DayoneBgImage', 'bg-img1');
    }
    // Adding
    this.body?.classList.add('transparent-mode');
    localStorage.setItem('DayoneTransparentTheme', 'true');
    
    // Removing
    localStorage.removeItem('DayoneDarkTheme');
    localStorage.removeItem('DayoneLightTheme');
    this.body?.classList.remove('light-mode');
    this.body?.classList.remove('dark-mode'); 
    this.body?.classList.remove('light-header');
    this.body?.classList.remove('dark-header');
    this.body?.classList.remove('color-header');
    this.body?.classList.remove('gradient-header');
    this.body?.classList.remove('light-menu');
    this.body?.classList.remove('color-menu');
    this.body?.classList.remove('dark-menu');
    this.body?.classList.remove('gradient-menu');

    localStorage.removeItem('Dayonelight-primary-color');
    localStorage.removeItem('Dayonelight-primary-hover');
    localStorage.removeItem('Dayonelight-primary-border');
    localStorage.removeItem('Dayonedark-primary-color');
    localStorage.removeItem('Dayonetransparent-primary-color');
    localStorage.removeItem('Dayonetransparent-bg-color');
    switcher.removeForTransparent();
    switcher.updateChanges();
  }

  bgImage(e: any) {
    let transparent = document.getElementById('myonoffswitchTransparent') as HTMLInputElement;
    transparent.checked = true;

    let img = e.parentElement.classList[0];
    localStorage.setItem('DayoneBgImage', img);
    // this.body?.classList.add(img);
    let allImg = document.querySelectorAll('.bg-img');
    allImg.forEach((el, i) => {
      let ele = el.classList[0];
      this.body?.classList.remove(ele);
      this.body?.classList.add(img);
    });

    // Adding
    this.body?.classList.add('transparent-mode');
    localStorage.setItem('DayoneTransparentTheme', 'true');
    
    // Removing
    localStorage.removeItem('DayoneDarkTheme');
    localStorage.removeItem('DayoneLightTheme');
    this.body?.classList.remove('light-mode');
    this.body?.classList.remove('dark-mode'); 
    this.body?.classList.remove('light-header');
    this.body?.classList.remove('dark-header');
    this.body?.classList.remove('color-header');
    this.body?.classList.remove('gradient-header');
    this.body?.classList.remove('light-menu');
    this.body?.classList.remove('color-menu');
    this.body?.classList.remove('dark-menu');
    this.body?.classList.remove('gradient-menu');
    localStorage.removeItem('Dayonelight-primary-color');
    localStorage.removeItem('Dayonelight-primary-hover');
    localStorage.removeItem('Dayonelight-primary-border');
    localStorage.removeItem('Dayonedark-primary-color');
    localStorage.removeItem('Dayonetransparent-primary-color');
    localStorage.removeItem('Dayonetransparent-bg-color');
    switcher.removeForTransparent();
    switcher.updateChanges();
  }
}
