import { Style } from './../model/style';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BandPromiseService } from './../services/band-promise.service';
import { StylesService } from '../services/styles.service';
import { Band } from '../model/band';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manut-bandas',
  templateUrl: './manut-bandas.component.html',
  styleUrls: ['./manut-bandas.component.css']
})
export class ManutBandasComponent implements OnInit, AfterViewInit {
  @ViewChild('form') form!: NgForm;
  @ViewChild('styleSelect') styleSelect!: ElementRef;

  band: Band;
  styles: Style[];
  isUpdate: boolean;

  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private route: ActivatedRoute, private bandPromiseService: BandPromiseService,
    private stylesService: StylesService) {
      this.band = new Band('', JSON.parse('{}'));
      this.styles = [];
      this.isUpdate = false;
  }

  ngOnInit(): void {
    this.listStyles()
    .then(() => {
      const routeParams = this.route.snapshot.paramMap;
      const bandId = Number(routeParams.get('bandId'));

      this.isUpdate = bandId !== undefined && bandId > 0;

      console.log("Id da banda para alteração: " + bandId);

      if(this.isUpdate){
        this.bandPromiseService.getById(bandId)
        .then((b: Band) => {
          this.band = Band.clone(b);

          setTimeout(() => {
            M.FormSelect.init(this.styleSelect.nativeElement);
          }, 100);
        });
      }
    });
  }

  ngAfterViewInit() { }

  onSubmit() {
    this.bandPromiseService.isExists(this.band.name)
    .then((e: boolean) => {
      if(e){
        this.bandPromiseService.update(this.band)
        .then(() => {
          this.message = 'Alteração realizada com sucesso!';
        })
      } else{
        this.bandPromiseService.save(this.band)
        .then(() => {
          this.message = 'Cadastro realizado com sucesso!';
        })
      }

      this.isSuccess = true;
    })
    .catch((e) => {
      this.isSuccess = false;
      this.message = 'Falha ao cadastrar/alterar banda!';
    })
    .finally(() => {
      this.isShowMessage = true;
    })
    .then((() => {
      setTimeout(() => {
        this.isShowMessage = false;
        this.form.reset();
        this.band = new Band('', JSON.parse('{}'));
      }, 700)
    }))
    .then(() => {
      setTimeout(() => {
        this.listStyles();
      }, 700);
    })
  }

  listStyles(): Promise<void> {
    const p = this.stylesService.getAll()
    .then((s: Style[]) => {
      this.styles = s;

      setTimeout(() => {
        M.FormSelect.init(this.styleSelect.nativeElement);
      }, 100);
    });

    return p;
  }

  /**
   * Função usada com o select para comparar dois objetos Style.
   * @param s1
   * @param s2
   * @returns
   */
   compareStyles(s1: Style, s2: Style) {
    if (s1 != null && s2 != null) {
      return s1.id == s2.id;
    }
    return false;
  }

}
