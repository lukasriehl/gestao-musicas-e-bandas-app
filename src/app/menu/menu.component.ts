import * as M from 'materialize-css';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Constants } from 'src/app/util/constants';
import { LoginService } from './../services/login.service';
import { Subscription } from 'rxjs';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { User } from '../model/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  loggedIn = false;
  user!: User;
  subscription!: Subscription;

  @ViewChild('mobile') sideNav?: ElementRef;

  constructor(private loginService: LoginService) {
    this.subscription = loginService.asObservable().subscribe((data) => {
      this.loggedIn = data;
      console.log('observer - menu');
    });
  }

  ngOnInit(): void {
    this.loggedIn = WebStorageUtil.get(Constants.LOGGED_IN_KEY) as boolean;
    this.user = WebStorageUtil.get(Constants.USERNAME_KEY);
    console.log('init - menu');
  }

  ngAfterViewInit(): void {
    M.Sidenav.init(this.sideNav?.nativeElement);
  }

  onLogout() {
    this.loggedIn = false;
    this.loginService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
