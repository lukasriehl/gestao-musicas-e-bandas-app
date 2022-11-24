import { Component, OnInit } from '@angular/core';

import { Constants } from '../util/constants';
import { LoginService } from './../services/login.service';
import { User } from '../model/user';
import { Subscription } from 'rxjs';
import { WebStorageUtil } from '../util/web-storage-util';
import { Shared } from './../util/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: User;
  loginUser!: User;
  loggedIn = false;
  subscription!: Subscription;

  constructor(private loginService: LoginService) {
    this.subscription = this.loginService.asObservable().subscribe((data) => {
      this.loggedIn = data;
      console.log('observer - land-page');
    });
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.loginUser = new User('', '');
    this.user = WebStorageUtil.get(Constants.USERNAME_KEY);
    this.loggedIn = WebStorageUtil.get(Constants.LOGGED_IN_KEY);
  }

  onLogin() {
    if (
      this.loginUser.username === this.user.username &&
      this.loginUser.password === this.user.password
    ) {
      this.loginService.login(this.loginUser);
    } else {
      alert(
        'Usuário e/ou senha incorreto(s)!'
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log('destroy - land-page');
  }

}
