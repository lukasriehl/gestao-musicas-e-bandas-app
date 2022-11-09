import { BandService } from './../services/band.service';
import { Music } from '../model/music';
import { Band } from '../model/band';
import { MusicService } from './../services/music.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Shared } from '../util/shared';

@Component({
  selector: 'app-manut-musicas',
  templateUrl: './manut-musicas.component.html',
  styleUrls: ['./manut-musicas.component.css']
})
export class ManutMusicasComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  music!: Music;
  bands: Band[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private route: ActivatedRoute, private musicService: MusicService,
    private bandService: BandService) {
    this.bands = bandService.getBands();
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.music = new Music('', '', '');

    const routeParams = this.route.snapshot.paramMap;
    const musicId = Number(routeParams.get('musicId'));

    if(musicId !== undefined && musicId > 0){
      let musicToEdit = this.musicService.findById(musicId);
      this.music = Music.clone(musicToEdit);
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.musicService.isExists(this.music.name)) {
      this.musicService.save(this.music);
    } else {
      this.musicService.update(this.music);
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';
    this.form.reset();
    this.music = new Music('', '', '');
  }

}
