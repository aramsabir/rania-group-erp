import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import { AuthService } from '../shared/services/firebase/auth.service';

interface Endpoints {
  api: any;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private endpoints = new BehaviorSubject<Endpoints | null>(null);
  readonly api$ = this.endpoints.asObservable().pipe(
    filter((endpoints) => !!endpoints),
    map((endpoints) => endpoints?.api)
  );

  get api() {
    return this.endpoints.getValue()?.api;
  }

  constructor(private http: AuthService) {}

  fetchEndpoints() {
    console.log("test");
    
    return this.http.getUserByToken().pipe(
      map((user: any) => {
        if (user) {
          console.log(user);
          
        } else {
        }
        return user;
      }))}

}
