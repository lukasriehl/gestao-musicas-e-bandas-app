import { BandService } from './../services/band.service';
import { Music } from '../model/music';
import { Band, newBand } from '../model/band';
import { MusicService } from './../services/music.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manut-musicas',
  templateUrl: './manut-musicas.component.html',
  styleUrls: ['./manut-musicas.component.css']
})
export class ManutMusicasComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  @ViewChild('bandSelect') bandSelect!: ElementRef;

  music!: Music;
  bands: Band[];
  isUpdate: boolean;

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private route: ActivatedRoute, private musicService: MusicService,
    private bandService: BandService) {
      this.music = new Music('', '', '', JSON.parse('{}'));
      this.bands = [];
      this.isUpdate = false;
  }

  ngOnInit(): void {
    this.listBands();

    const routeParams = this.route.snapshot.paramMap;
    const musicId = Number(routeParams.get('musicId'));

    this.isUpdate = musicId !== undefined && musicId > 0;

    if(this.isUpdate){
      let musicToEdit = this.musicService.findById(musicId);
      this.music = Music.clone(musicToEdit);

      setTimeout(() => {
        M.FormSelect.init(this.bandSelect.nativeElement);
      }, 100);
    }
  }

  ngAfterViewInit() {}

  onSubmit() {
    this.isSubmitted = true;
    if (!this.musicService.isExists(this.music.name)) {
      this.musicService.save(this.music);
    } else {
      this.musicService.update(this.music);
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = this.isUpdate ? 'Alteração realizada com sucesso!' : 'Cadastro realizado com sucesso!';
    this.form.reset();
    this.music = new Music('', '', '', JSON.parse('{}'));
    this.listBands();
  }

  listBands(){
    this.bands = this.bandService.getBands();

    setTimeout(() => {
      M.FormSelect.init(this.bandSelect.nativeElement);
    }, 100);
  }

  /**
   * Função usada com o select para comparar dois objetos Band.
   * @param b1
   * @param b2
   * @returns
   */
   compareBands(b1: Band, b2: Band) {
    if (b1 != null && b2 != null) {
      return b1.id == b2.id;
    }
    return false;
  }

}
