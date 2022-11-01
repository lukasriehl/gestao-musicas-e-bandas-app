import { Component, OnInit } from '@angular/core';
import { WebStorageUtil } from 'src/app/util/web-storage-util';
import { Constants } from './../util/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: string

  constructor() {
    //this.usuario = WebStorageUtil.get(Constants.USERNAME_KEY);
    this.usuario = 'Lukas';
  }

  ngOnInit(): void {
  }

}
