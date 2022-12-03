import { MusicPromiseService } from './../services/music-promise.service';
import { Music } from './../model/music';
import { MusicDTO } from './../model/music';
import { Component, OnInit } from '@angular/core';
import { Shared } from '../util/shared';

@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.component.html',
  styleUrls: ['./musicas.component.css']
})
export class MusicasComponent implements OnInit {
  musics?: MusicDTO[];

  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private musicPromiseService: MusicPromiseService) { }

  ngOnInit(): void {
    Shared.initializeWebStorage();

    this.exibirMusicas();
  }

  onDelete(name: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover a música ' + name + '?'
    );
    if (!confirmation) {
      return;
    }
    this.musicPromiseService.deleteByName(name)
    .then((d: boolean) => {
      this.isSuccess = d;
      this.message = d ? 'O item foi removido com sucesso!' : 'Opps! O item não pode ser removido!';
    }).then( () => {
      this.musicPromiseService.listAllWithBand()
      .then((m: MusicDTO[]) => {
        this.musics = m;
      })
      .catch((e) => {
        this.isShowMessage = true;
        this.isSuccess = false;
        this.message = 'Falha ao exibir as músicas cadastradas!';
      })
    })
    .catch((e) => {
      this.isSuccess = false;
      this.message = 'Opps! O item não pode ser removido!';
    })
    .finally(() => {
      this.isShowMessage = true;
    })
    .then((() => {
      setTimeout(() => {
        this.isShowMessage = false;
      }, 700);
    }));
  }

  exibirMusicas(){
    this.musicPromiseService.listAllWithBand()
    .then((m: MusicDTO[]) => {
      this.musics = m;
    })
    .catch((e) => {
      this.isShowMessage = true;
      this.isSuccess = false;
      this.message = 'Falha ao exibir as músicas cadastradas!';
    });
  }

}
