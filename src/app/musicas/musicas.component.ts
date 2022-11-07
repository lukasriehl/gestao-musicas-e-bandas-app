import { musics } from './../model/music';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.component.html',
  styleUrls: ['./musicas.component.css']
})
export class MusicasComponent implements OnInit {
  musics = musics;

  constructor() { }

  ngOnInit(): void {
  }

}
