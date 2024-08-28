import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwitcherService } from '../../services/switcher.service';
import * as supportswitcher from './supportswitcher'
@Component({
  selector: 'app-support-switcher',
  templateUrl: './support-switcher.component.html',
  styleUrls: ['./support-switcher.component.scss']
})
export class SupportSwitcherComponent implements OnInit {
  layoutSub: Subscription;

  body = document.querySelector('body');

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
    supportswitcher.localStorageBackUp();
  }
  ngAfterViewInit(){
    supportswitcher.updateChanges();
    supportswitcher.customSwitcherClickFn();
  }
  reset(){
    localStorage.clear(); 
    let html:any = document.querySelector('html')
    let body = document.querySelector('body')
    html.style = ''; 
    body?.classList.remove('dark-mode');
    body?.classList.remove('transparent-mode');
    body?.classList.remove('boxed');
    body?.classList.remove('bg-img1');
    body?.classList.remove('bg-img2');
    body?.classList.remove('bg-img3');
    body?.classList.remove('bg-img4');
    supportswitcher.updateChanges();
    supportswitcher.checkOptions();
    let primaryColorVal = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg-color').trim();
    
    document.querySelector('html')?.style.setProperty('--primary-bg-color', primaryColorVal); 
    let styleId = document.querySelector('#style');

     // rtl to ltr
    //add
    body?.classList.add('ltr');
    html?.setAttribute('dir', 'ltr');
    styleId?.setAttribute( 'href', '/assets/plugins/bootstrap/css/bootstrap.css');
    //remove
    body?.classList.remove('rtl');
  }

  public color1: string = '#3366ff';
  public color2: string = '#3366ff';
  public color3: string = '#3366ff';
  public color4: string = '#3366ff';
  public color5: string = '#3366ff';

  public dynamicLightPrimary(data: any): void {
    this.color1 = data.color;

    const dynamicPrimaryLight = document.querySelectorAll('input.color-primary-light');

    supportswitcher.dynamicLightPrimaryColor(dynamicPrimaryLight, this.color1);
    
    localStorage.setItem('Dayonelight-primary-color', this.color1);
    localStorage.setItem('Dayonelight-primary-hover', this.color1);
    localStorage.setItem('Dayonelight-primary-border', this.color1);
    let light = document.getElementById('myonoffswitch1') as HTMLInputElement;
    light.checked = true;

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
    supportswitcher.checkOptions();
    supportswitcher.updateChanges();
  }
  public dynamicDarkPrimary(data: any): void {
    this.color2 = data.color;

    const dynamicPrimaryDark = document.querySelectorAll('input.color-primary-dark');

    supportswitcher.dynamicDarkPrimaryColor(dynamicPrimaryDark, this.color2);
    
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
    supportswitcher.checkOptions();
    supportswitcher.updateChanges();
  }
  public dynamicTranparentPrimary(data: any): void {
    this.color3 = data.color;

    const dynamicPrimaryTrasnsparent = document.querySelectorAll('input.color-primary-transparent');

    supportswitcher.dynamicTrasnsparentPrimaryColor(
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
    supportswitcher.removeForTransparent();
    supportswitcher.updateChanges();
  }
  public dynamicTranparentBgPrimary(data: any): void {
    this.color4 = data.color;

    const dynamicPrimaryBgTrasnsparent = document.querySelectorAll('input.color-bg-transparent');

    supportswitcher.dynamicBgTrasnsparentPrimaryColor(
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
    supportswitcher.removeForTransparent();
    supportswitcher.updateChanges();
  }
  public dynamicTranparentImgPrimary(data: any): void {
    this.color5 = data.color;

    const dynamicPrimaryBgImgTrasnsparent = document.querySelectorAll('input.color-primary-transparent-img');

    supportswitcher.dynamicBgImgTrasnsparentPrimaryColor(
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
    supportswitcher.removeForTransparent();
    supportswitcher.updateChanges();
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
    supportswitcher.removeForTransparent();
    supportswitcher.updateChanges();
  }
}
