import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ResisterComponent } from './auth/resister/resister.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatNativeDateModule } from '@angular/material/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxNotifierModule, NgxNotifierService } from 'ngx-notifier';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PipesModule } from './@core/pipes/pipes.module';
import { CoreModule } from './@core/core.module';
import { Error404Component } from './auth/error404/error404.component';
import { AuthService } from './shared/services/firebase/auth.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JwtInterceptor, ServerErrorInterceptor } from './@core/interceptors';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      return authService.getUserByToken().subscribe(
        {
          next: user => {
            // console.log('app initializer', user);
            if (user) {
              // console.log('User loaded during app initialization', user);
              authService.currentUserSubject.next(user);
            } else {
              // console.log('No user found during app initialization');
            }
            resolve(null);
          },
          error: (error) => {
            // console.error('Error during app initialization', error);
            resolve(null);
          }
        }
      )

    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResisterComponent,
    ForgetPasswordComponent,
    VerifyEmailComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    SharedModule,
    NgbModule,
    MatNativeDateModule,
    SimpleNotificationsModule.forRoot(),
    HttpClientModule,
    NgxNotifierModule,
    PipesModule,
    CoreModule,
    // InitializerModule
  ],
  providers: [
    // NgxNotifierService,

    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
    ,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
