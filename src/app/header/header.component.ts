import { Observable } from 'rxjs';
import { Component, OnInit, OnChanges } from '@angular/core';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { User } from '../model/user';
import { Constants } from './../util/constants';
import { Shared } from './../util/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  user!: User;
  loggedIn!: Observable<boolean>;

  constructor() {
  }

  public get isLoggedIn(): Observable<boolean> {
    return WebStorageUtil.get(Constants.LOGGED_IN_KEY);
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.user = WebStorageUtil.get(Constants.USERNAME_KEY);
    this.loggedIn = WebStorageUtil.get(Constants.LOGGED_IN_KEY);
    console.log('Header component. Logado: ' + this.loggedIn);
  }

  ngOnChanges(): void {
    this.loggedIn = WebStorageUtil.get(Constants.LOGGED_IN_KEY);
  }

}
