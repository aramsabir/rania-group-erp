import { Injectable } from '@angular/core';
import { WORDS } from './words';

@Injectable()
export class DicService {
  private selectedLanguage = 'en';

  constructor() {
    let lang = localStorage.getItem('language');
    if (lang == 'ku' || lang == 'ar' || lang == 'en')
      this.selectedLanguage = lang;
    else {
      localStorage.setItem('language', 'en');
      localStorage.setItem('collapse_nav', 'true');
      localStorage.setItem('theme', 'light');
      localStorage.setItem('dir', 'ltr');
    }

    // localStorage.setItem('mode', 'false');

    // var l_mode = localStorage.getItem('mode');
    // var mode = l_mode == 'true' ? true : false;
  }

  translate(v: string): string {
    let tmp = WORDS.filter((item: any) => item.en === v);
    let tmp1: any = {};
    if (tmp[0]) tmp1 = tmp[0];

    if (tmp.length) {
      return tmp1[this.selectedLanguage];
    } else return '*** ' + v + ' ***';
  }

  setLanguage(v: any) {
    this.selectedLanguage = v;
    localStorage.setItem('language', v);
  }

  setItem(item_name:any,value: any) {
    localStorage.setItem(item_name, value);
  }

  removeItem(item_name:any) {
    localStorage.removeItem(item_name);
  }

  getItem(item_name:any) {
    localStorage.getItem(item_name);
  }

  lang() {
    return this.selectedLanguage;
  }
}
