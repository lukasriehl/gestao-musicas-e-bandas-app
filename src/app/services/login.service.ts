import { User } from './../model/user';
import { Observable, Subject } from 'rxjs';

import { Constants } from './../util/constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginSource = new Subject<boolean>();

  constructor(private router: Router, private userService: UserService) {}

  login(user:User) {
    WebStorageUtil.set(Constants.LOGGED_IN_KEY, true);
    WebStorageUtil.set(Constants.USERNAME_KEY, user);
    console.log(WebStorageUtil.get(Constants.USERNAME_KEY));

    this.userService.getIdByUsername(user.username).subscribe(
      (data) => {
        WebStorageUtil.set(Constants.SESSION_USER_ID, data);
      },
      (error) => {
        alert(error);
        this.logout();
      }
    );

    this.loginSource.next(true);
    this.router.navigate(['home']);
  }

  logout() {
    WebStorageUtil.set(Constants.LOGGED_IN_KEY, false);
    WebStorageUtil.remove(Constants.SESSION_USER_ID);
    this.loginSource.next(false);
    this.router.navigate(['']);
  }

  asObservable(): Observable<boolean> {
    return this.loginSource;
  }
}
