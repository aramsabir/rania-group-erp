import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxNotifierService } from 'ngx-notifier';
import { ToastrService } from 'ngx-toastr';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { setItem, StorageItem } from 'src/app/@core/utils';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  public loginForm: FormGroup | any;
  public errorMessage: any;
  public model: any = {};
  lang: any;
  dir: any;

  constructor(
    public authService: AuthService,
    private dicService: DicService,
    private ngxNotifierService: NgxNotifierService,
    private httpService: HttpService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let body = document.querySelector('body');
    this.lang = this.dicService.lang();
    if (this.lang == 'en') this.setLtr();
    else this.setRtl();
    if (localStorage.getItem('DayoneDarkTheme') !== null) {
      body?.classList.add('dark-mode');

      body?.classList.remove('light-mode');
      body?.classList.remove('transparent-mode');
    }
    //firebase
    // this.loginForm = this.fb.group({
    //   email: ['spruko@template.com', [Validators.required, Validators.email]],
    //   password: ['spruko', Validators.required]
    // });
  }

  showPassword() {
    this.show = !this.show;
  }

  // Login With Google
  loginGoogle() {
    this.authService.GoogleAuth();
  }

  // Login With Twitter
  loginTwitter(): void {
    this.authService.signInTwitter();
  }

  // Login With Facebook
  loginFacebook() {
    this.authService.signInFacebok();
  }

  // Simple Login
  login() {
    this.authService.signIn(this.model).subscribe(
      (res: any) => {
        console.log(res);
        
        if (res.success == true) {
          this.authService.value = true;
         
            // setItem(StorageItem.Auth, { token: res.token, email: res.email });
            this.httpService.createToast('success', res.message);
            // this.router.navigate(['/bas-home']);
            window.location.href = '/bas-home';
        } else {
          this.httpService.createToast('error', res.message);
        }
      },
      () => {
        this.httpService.createToast('error', 'Network error');
      }
    );
  }
  successAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Well Done!',
      text: 'You clicked the button!',
      confirmButtonColor: '#6259ca',
    });
  }
  createToast(style: string, message: any): void {
    this.ngxNotifierService.createToast(style, message, 5000);
    return;
  }
  ngOnInit(): void {}

  setLtr() {
    {
      let html: any = document.querySelector('html');
      let body = document.querySelector('body');
      let styleId = document.querySelector('#style');

      //add
      body?.classList.add('ltr');
      html?.setAttribute('dir', 'ltr');
      styleId?.setAttribute(
        'href',
        './assets/plugins/bootstrap/css/bootstrap.css'
      );
      //remove
      body?.classList.remove('rtl');
    }
  }
  setRtl() {
    {
      let html: any = document.querySelector('html');
      let body = document.querySelector('body');
      let styleId = document.querySelector('#style');

      //add
      body?.classList.add('rtl');
      html?.setAttribute('dir', 'rtl');
      styleId?.setAttribute(
        'href',
        './assets/plugins/bootstrap/css/bootstrap.css'
      );
      //remove
      body?.classList.remove('ltr');
    }
  }

  changeDir(language: any) {
    if (this.lang != language) {
      this.dicService.setLanguage(language);
      localStorage.setItem('dir', language !== 'en' ? 'rtl' : 'ltr');
      if (language !== 'en') localStorage.setItem('DayoneRtl', 'true');
      else localStorage.removeItem('DayoneRtl');

      this.lang = language;
      this.dir = language == 'en' ? 'ltr' : 'rtl';

      if (language == 'en') this.setLtr();
      else this.setRtl();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 50);
    }
  }
}
