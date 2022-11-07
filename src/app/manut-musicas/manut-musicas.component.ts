import { Music } from '../model/music';
import { MusicService } from './../services/music.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manut-musicas',
  templateUrl: './manut-musicas.component.html',
  styleUrls: ['./manut-musicas.component.css']
})
export class ManutMusicasComponent implements OnInit {
  submitted = false;

  music: Music;

  constructor(private route: ActivatedRoute, private musicService: MusicService) {
    this.music = new Music('', '', '', '');
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const musicId = Number(routeParams.get('musicId'));

    if(musicId === 0 || musicId === undefined){
      this.newMusic();
    }else{
      this.music = new Music('Forever', 'Rock\'n\'Roll',
      'Hot in the Shade', 'https://www.youtube.com/watch?v=d_RKO5ozLVo');
      this.music.releaseYear = 1989;
    }
  }

  saveMusic(): void {

  }

  newMusic(): void {
    this.submitted = false;

    this.music = new Music('', '', '', '');
  }

}
