import { User } from './../model/user';
import { Observable, Observer, Subject } from 'rxjs';

import { Constants } from './../util/constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginSource = new Subject<boolean>();

  constructor(private router: Router) {}

  login(user:User) {
    WebStorageUtil.set(Constants.LOGGED_IN_KEY, true);
    //WebStorageUtil.set(Constants.USERNAME_KEY, user);
    console.log(WebStorageUtil.get(Constants.USERNAME_KEY));
    this.loginSource.next(true);
    this.router.navigate(['home']);
  }

  logout() {
    WebStorageUtil.set(Constants.LOGGED_IN_KEY, false);
    this.loginSource.next(false);
    this.router.navigate(['']);
  }

  asObservable(): Observable<boolean> {
    return this.loginSource;
  }
}
