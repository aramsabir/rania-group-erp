import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { Path } from '../structs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    const isLoggedIn = this.authService.isLoggedIn$;

    if (isLoggedIn) {
      return true;
    }

    // if not logged in redirects to sign-in page with the return url
    this.router.navigate([`/${Path.SignIn}`], {
      queryParams: { returnUrl: state.url },
    });

    return false;
  }
}
