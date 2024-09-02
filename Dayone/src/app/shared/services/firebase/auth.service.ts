import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import {
  BehaviorSubject,
  catchError,
  finalize,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
} from 'rxjs';
import { getItem, removeItem, setItem, StorageItem } from 'src/app/@core/utils';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { ApiEndPoints, ApiMethod } from 'src/app/@core/service/apis';
import { Path } from 'src/app/@core/structs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';

export type UserType = UserModel | undefined;

interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  isLoggedIn$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem(this.authLocalStorageToken)
  );
  private apiBaseUrl = `${environment.apiUrl}`;

  public userData: any;
  public user!: firebase.User;
  public showLoader: boolean = false;

  currentUser$!: Observable<any>;
  isLoading$!: Observable<boolean>;
  // templateSaveSubject = new BehaviorSubject<UserType>(undefined);

  currentUserSubject = new BehaviorSubject<UserType>(undefined);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  outPutEmail: string = '';
  outPutPassword: string = '';

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    public afs: AngularFirestore,
    public httpService: HttpService,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private http: HttpClient,
    public toster: ToastrService,
    private cookieService: CookieService
  ) {
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     cookieService.set('user', JSON.stringify(this.userData),{ expires: 2 });
    //     JSON.parse(cookieService.get('user') || '{}');
    //   } else {
    //     JSON.parse(cookieService.get('user') || '{}');
    //   }
    // });

    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);

    // this.unsubscribe.push(subscr);
  }

  ngOnInit() {}

  hasPermission(permission: string) {
    const role = this.currentUserValue?.resources;
    console.log(this.currentUserValue);

    if (!role) {
      return false;
    }
    var resources = role.split(',');
    if (!resources.includes(permission)) {
      return false;
    }
    return true;
  }

  hasAnyPermission(permissions: string[]): boolean {
    const role = this.currentUserValue?.resources;
    if (!role) {
      return false;
    }
    var hasPermission = false;
    var resources = role.split(',');
    permissions.forEach((permission) => {
      if (resources.includes(permission)) {
        hasPermission = true;
      }
    });
    return hasPermission;
  }

  hasAllPermission(permissions: string[]): boolean {
    const role = this.currentUserValue?.resources;
    if (!role) {
      return false;
    }
    var hasPermission = true;
    var resources = role.split(',');
    permissions.forEach((permission) => {
      if (!resources.includes(permission)) {
        hasPermission = false;
        return;
      }
    });
    return hasPermission;
  }

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  public set value(v: boolean) {
    this.isLoggedIn$.next(v);
  }

  checkToken() {
    this.httpService.call(ApiEndPoints.Check, ApiMethod.GET).subscribe(
      (res: any) => {
        if (!res.success) {
          this.router.navigate([`/${Path.SignIn}`]);
        }
      },
      () => {
        this.router.navigate([`/${Path.SignIn}`]);
      }
    );
  }
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth['token']) {
      localStorage.setItem(this.authLocalStorageToken, auth['token']);
      // setItem(StorageItem.Auth, { token: auth.token, email: auth.email });
      return true;
    }
    return false;
  }
  signIn(payload: any): Observable<any> {
    return this.httpService.call('login', ApiMethod.POST, {}, payload).pipe(
      map((auth: any) => {
        this.currentUserSubject.next(auth);
        // console.log(this.currentUserSubject);
        // this.getUserByToken()
        const result = this.setAuthFromLocalStorage(auth);
        if (result) {
          this.isLoggedIn$.next(true);
        }
        return auth;
      })
    );

    return this.http.post<any>(
      `${this.apiBaseUrl}/login_aadministrator`,
      payload
    );
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      // console.error(error);
      return undefined;
    }
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.token) {
      return of(undefined);
    }
    // this.isLoadingSubject.next(true);
    this.isLoadingSubject.next(true);
    return this.httpService.call('userinfo', ApiMethod.GET, {}).pipe(
      map((user: any) => {
        if (user) {
          this.currentUserSubject.next(user.data);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))

      // finalize(() => this.isLoadingSubject.next(false))

      // finalize(() => this.isLoadingSubject.next(false))
    );
  }

  signOut(): void {
    localStorage.removeItem(this.authLocalStorageToken);
    this.isLoggedIn$.next(false);
  }
  // sign in function
  SignIn(email: any, password: any) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        if (result.user.emailVerified !== true) {
          this.SetUserData(result.user);
          this.SendVerificationMail();
          this.showLoader = true;
        } else {
          this.showLoader = false;
          this.ngZone.run(() => {
            this.router.navigate(['/auth/login']);
          });
        }
      })
      .catch((error: any) => {
        this.toster.error('You have enter Wrong Email or Password.');
      });
  }
  // Sign up with email/password
  SignUp(email: any, password: any) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // main verification function
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/hr-dashboard/dashboard']);
      });
  }

  // Sign in with Facebook
  signInFacebok() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  // Sign in with Twitter
  signInTwitter() {
    return this.AuthLogin(new firebase.auth.TwitterAuthProvider());
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error: any) => {
        window.alert(error);
      });
  }

  // Authentication for Login
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result: any) => {
        this.ngZone.run(() => {
          this.router.navigate(['/hr-dashboard/dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error: any) => {
        window.alert(error);
      });
  }

  // Set user
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    // console.log(this.afs.doc(`users/${user.uid}`))
    const userData: User = {
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL || 'src/favicon.ico',
      emailVerified: user.emailVerified,
    };
    userRef
      .delete()
      .then(function () {})
      .catch(function (error) {});
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    return this.afAuth.signOut().then(() => {
      this.showLoader = false;
      // localStorage.clear();
      localStorage.removeItem('App/auth');
      this.cookieService.deleteAll('user', '/auth/login');
      this.router.navigate(['/auth/login']);
    });
  }

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(this.cookieService.get('user')|| '{}');
  //   return (user != null && user.emailVerified != false) ? true : false;
  // }
}
