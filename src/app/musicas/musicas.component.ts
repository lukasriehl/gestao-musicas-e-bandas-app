import { Music } from './../model/music';
import { MusicService } from './../services/music.service';
import { Component, OnInit } from '@angular/core';
import { Music } from '../model/music';
import { Shared } from '../util/shared';

@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.component.html',
  styleUrls: ['./musicas.component.css']
})
export class MusicasComponent implements OnInit {
  musics?: Music[];

  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.musics = this.musicService.getMusics();
  }

  onDelete(name: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover a música ' + name + '?'
    );
    if (!confirmation) {
      return;
    }
    let response: boolean = this.musicService.delete(name);
    this.isShowMessage = true;
    this.isSuccess = response;
    if (response) {
      this.message = 'O item foi removido com sucesso!';
    } else {
      this.message = 'Opps! O item não pode ser removido!';
    }
    this.musics = this.musicService.getMusics();
  }

  onIncludeOnPlaylist(music: Music){

  }

}
