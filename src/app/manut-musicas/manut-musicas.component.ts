import { MusicPromiseService } from './../services/music-promise.service';
import { BandPromiseService } from '../services/band-promise.service';
import { Music } from '../model/music';
import { Band} from '../model/band';
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
  selBand: Band;
  isUpdate: boolean;

  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private route: ActivatedRoute, private musicPromiseService: MusicPromiseService,
    private bandPromiseService: BandPromiseService) {
      this.music = new Music('', '', '');
      this.bands = [];
      this.selBand = JSON.parse('{}');
      this.isUpdate = false;
  }

  ngOnInit(): void {
    this.listBands()
    .then(() => {
      const routeParams = this.route.snapshot.paramMap;
      const musicId = Number(routeParams.get('musicId'));

      this.isUpdate = musicId !== undefined && musicId > 0;

      console.log("Id da música para alteração: " + musicId);

      if(this.isUpdate){
        this.musicPromiseService.getById(musicId)
        .then((m: Music) => {
          this.music = Music.clone(m);

          if(this.music.bandId !== undefined){
            this.bandPromiseService.getById(Number(this.music.bandId))
            .then((b: Band) => {
                this.selBand = b;
            });
          }

          setTimeout(() => {
            M.FormSelect.init(this.bandSelect.nativeElement);
          }, 100);
        });
      }
    });
  }

  ngAfterViewInit() {}

  onSubmit() {
    this.music.bandId = String(this.selBand.id);

    this.musicPromiseService.findIdByName(this.music.name)
    .then((i: number) => {
      if(i >= 0){
        if(!this.isUpdate){
          this.music.id = i;
        }

        this.musicPromiseService.update(this.music)
        .then(() => {
          this.message = 'Alteração realizada com sucesso!';
        })
      } else{
        this.musicPromiseService.save(this.music)
        .then(() => {
          this.message = 'Cadastro realizado com sucesso!';
        })
      }

      this.isSuccess = true;
    })
    .catch((e) => {
      this.isSuccess = false;
      this.message = 'Falha ao cadastrar/alterar música!';
    })
    .finally(() => {
      this.isShowMessage = true;
    })
    .then((() => {
      setTimeout(() => {
        this.isShowMessage = false;
        this.form.reset();
        this.music = new Music('', '', '');
        this.selBand = JSON.parse('{}');
      }, 700)
    }))
    .then(() => {
      setTimeout(() => {
        this.listBands();
      }, 700);
    })
  }

  listBands(){
    const b = this.bandPromiseService.getAll()
    .then((b: Band[]) => {
      this.bands = b;

      setTimeout(() => {
        M.FormSelect.init(this.bandSelect.nativeElement);
      }, 100);
    });

    return b;
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
