import { PlaylistPanelComponent } from './../playlist-panel/playlist-panel.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../model/user';
import { Shared } from '../util/shared';
import { WebStorageUtil } from '../util/web-storage-util';
import { Constants } from '../util/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user!: User;
  imageURL: string = 'assets/resources/images/background_home.jpg';

  @ViewChild(PlaylistPanelComponent)
  playlistPanelComponent!: PlaylistPanelComponent;

  modal = {
    show: false,
    title: '',
    text: '',
    extraLink: '',
  };

  constructor() { }

  getBackgroundImage() {
    return {
      'background-image':
        'linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .9)), url(' +
        this.imageURL +
        ')',
    };
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.user = WebStorageUtil.get(Constants.USERNAME_KEY);
    console.log('init - land-page');
  }

  onPlaylistWarnEvent(event: boolean) {
    this.modal.show = event;
    this.modal.title = 'Aviso!';
    this.modal.text = `Você ainda não possui músicas cadastradas em sua Playlist! Faça o cadastro!`;
    this.modal.extraLink = 'manutMusicas';
  }

  onCloseModal() {
    this.modal.show = false;
  }

}
