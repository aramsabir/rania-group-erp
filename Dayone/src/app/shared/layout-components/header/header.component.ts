import { Component, OnInit, Inject, Input } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { AuthService } from '../../services/firebase/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwitcherService } from '../../services/switcher.service';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { ApiMethod } from 'src/app/@core/service/apis';
import { environment } from 'src/environments/environment';
import { MainConsts } from 'src/app/@core/service/constants/cities';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() notificationsCount: number = 0

  public elem: any;
  public isCollapsed = true;
  lang: string | null;
  dir: any = 'rtl';
  userData: any;
  userPhoto: any = './assets/images/users/16.jpg';
  model: any = {};

  default_company: any = "All"

  my_companies: any = [];
  company: any = '';
  company_images: any = '';
  company_name: any = '';
  selected_company: any = [];
  endPoint: any = environment.apiIMG + '/companys/';
  company_small_images: string = ""


  constructor(
    public layout: SwitcherService,
    public authService: AuthService,
    public navServices: NavService,
    public httpService: HttpService,
    private modalService: NgbModal,
    private dicService: DicService
  ) {

    this.myCompanies()
    this.default_company = localStorage.getItem('default_company_name');
    this.lang = localStorage.getItem('language');
    this.userInfo();

    console.log("authService.currentUser$");
    console.log(authService.currentUser$);
    
  }

  ngOnInit() {
    this.elem = document.documentElement;
  }

  userInfo() {
    // this.httpService.call('userinfo', ApiMethod.GET, {}).subscribe(
    //   (res: any) => {
    //     if (res.status == true) {
          this.userData = this.authService.getUserData()

          this.userPhoto = `${environment.apiUrl}/public/profile_photos/${this.userData.profile_photo}`;
      //   } else {
      //     this.httpService.createToast('error', res.message);
      //   }
      // },
      // () => {
      //   this.httpService.createToast('error', 'Network error');
      // }
    // );
  }

  myCompanies() {
    this.httpService
      .call(`${'my_companies'}`, ApiMethod.GET, {
        page: 0,
        page_size: 1000,
        order_by: 'name',
      })
      .subscribe((res: any) => {
        this.my_companies = res.data['list'];

        if (
          this.my_companies.length >= 0 &&
          (this.company == '' || this.company == null)
        ) {
          this.setCompany(
            this.my_companies[0].id,
            this.my_companies[0].name,
            this.my_companies[0].image,
          );
        }
      });
  }


  setCompany(id: any, name: any, image: any) {
    id = id + '';
    var comapnies: any = localStorage.getItem(MainConsts.Company)?.split(',');
    var company_names: any = localStorage
      .getItem(MainConsts.CompanyNames)
      ?.split(',');
    var company_images: any = localStorage
      .getItem(MainConsts.CompanyListImages)
      ?.split(',');

    var names = '';
    var images = '';
    var ids = '';
    if (!comapnies?.includes(id)) {
      for (let index = 0; index < comapnies?.length; index++) {
        if (comapnies[index] != '') ids += comapnies[index] + ',';
      }
      ids += id;

      for (let index = 0; index < company_images?.length; index++) {
        if (company_images[index] != '') images += company_images[index] + ',';
      }
      images += image;
      for (let index = 0; index < company_names?.length; index++) {
        if (company_names[index] != '') names += company_names[index] + ',';
      }
      names += name;

      this.dicService.setItem(MainConsts.Company, ids);
      this.dicService.setItem(MainConsts.CompanyNames, names);
      this.dicService.setItem(MainConsts.CompanyListImages, images);
      this.dicService.setItem(MainConsts.CompanyName, name);
      this.dicService.setItem(MainConsts.CompanyImages, image);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      names = '';
      images = '';
      var selected_company = '';
      var selected_full_image = '';
      var selected_small_image = '';
      for (let index = 0; index < comapnies.length; index++) {
        if (comapnies[index] != id && comapnies[index] != '') {
          ids += comapnies[index] + ',';
          names += company_names[index] + ',';
          images += company_images[index] + ',';
          selected_company = company_names[index];
          selected_full_image = company_images[index];
          selected_small_image = company_images[index];
        }
      }

      if (ids.endsWith(',')) ids = ids.substring(0, ids.length - 1);
      if (names.endsWith(',')) names = names.substring(0, names.length - 1);
      if (images.endsWith(',')) images = images.substring(0, images.length - 1);

      this.dicService.setItem(MainConsts.Company, ids);
      this.dicService.setItem(MainConsts.CompanyNames, names);
      this.dicService.setItem(MainConsts.CompanyListImages, images);

      this.dicService.setItem(MainConsts.CompanyName, selected_company);
      this.dicService.setItem(MainConsts.CompanyImages, selected_full_image);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
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
