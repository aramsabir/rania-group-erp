import { Component, OnInit, Inject, Input } from '@angular/core';
import { NavService } from '../../../../services/nav.service';
import { AuthService } from '../../../../services/firebase/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwitcherService } from '../../../../services/switcher.service';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { ApiMethod } from 'src/app/@core/service/apis';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SettingsHeaderComponent implements OnInit {

  public elem: any;
  public isCollapsed = true;
  lang: string | null;
  dir: any = 'rtl';
  userData: any;
  userPhoto: any = './assets/images/users/16.jpg';
  model: any = {};
  companies: any = [

  ];
  default_company: any = "All"
  constructor(
    public layout: SwitcherService,
    public authService: AuthService,
    public navServices: NavService,
    public httpService: HttpService,
    private modalService: NgbModal,
    private dicService: DicService
  ) {
    this.lang = localStorage.getItem('language');
    this.userInfo();
    console.log("authService.currentUser$");
    console.log(authService.currentUser$);
  }

  ngOnInit() {
    this.elem = document.documentElement;
  }

  userInfo() {
    // this.httpService.call('my-roles', ApiMethod.GET, {}).subscribe(
    //   (res: any) => {
    //     if (res.status == true) {
          this.userData = this.authService.getUserData()

          this.userPhoto = `${environment.apiUrl}/public/profile_photos/${this.userData.profile_photo}`;
    //     } else {
    //       this.httpService.createToast('error', res.message);
    //     }
    //   },
    //   () => {
    //     this.httpService.createToast('error', 'Network error');
    //   }
    // );
  }

  changePassword() {
    this.httpService
      .call('changemypassword', ApiMethod.PUT, {}, this.model)
      .subscribe(
        (res: any) => {
          if (res.status == true) {
            this.ngOnInit();
            document.getElementById('close')!.click();
            this.httpService.createToast('success', res.message);
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        () => {
          this.httpService.createToast('error', 'Network error');
        }
      );
  }

  open(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
      windowClass: 'modalCusSty',
    });
  }

  signout() {
    this.authService.SignOut();
  }
  toggleSidebarNotification() {
    this.layout.emitSidebarNotifyChange(true);
  }
  toggleSwitcher() {
    this.layout.emitSwitcherChange(true);
  }
  setTheme(theme: any) {
    if (theme == 'dark') localStorage.setItem('DayoneDarkTheme', 'true');
    else localStorage.removeItem('DayoneDarkTheme');
  }
  changeCompany(company: any) {
    localStorage.setItem('default_company_id', company._id);
    localStorage.setItem('default_company_name', company.name);
  }
  changeDir(language: any) {
    if (this.lang != language) {
      this.dicService.setLanguage(language);
      localStorage.setItem('dir', language !== 'en' ? 'rtl' : 'ltr');
      if (language !== 'en') localStorage.setItem('DayoneRtl', 'true');
      else localStorage.removeItem('DayoneRtl');

      this.lang = language;
      this.dir = language == 'en' ? 'ltr' : 'rtl';
      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
  }
}
