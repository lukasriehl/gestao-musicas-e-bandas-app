import { Style } from './../model/style';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BandService } from '../services/band.service';
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

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private route: ActivatedRoute, private bandService: BandService,
    private stylesService: StylesService) {
      this.band = new Band('');
      this.styles = [];
      this.isUpdate = false;
  }

  ngOnInit(): void {
    this.listStyles();

    const routeParams = this.route.snapshot.paramMap;
    const bandId = Number(routeParams.get('bandId'));

    this.isUpdate = bandId !== undefined && bandId > 0;

    if(this.isUpdate){
      let bandToEdit = this.bandService.findById(bandId);
      this.band = Band.clone(bandToEdit);

      setTimeout(() => {
        M.FormSelect.init(this.styleSelect.nativeElement);
      }, 100);
    }
  }

  ngAfterViewInit() { }

  onSubmit() {
    this.isSubmitted = true;

    if (!this.bandService.isExists(this.band.name)) {
      this.bandService.save(this.band);
    } else {
      this.bandService.update(this.band);
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = this.isUpdate ? 'Alteração realizada com sucesso!' : 'Cadastro realizado com sucesso!';
    this.form.reset();
    this.band = new Band('', new Style({}));
    this.listStyles();
  }

  listStyles(){
    this.styles = this.stylesService.getDefaultStyles();

    setTimeout(() => {
      M.FormSelect.init(this.styleSelect.nativeElement);
    }, 100);
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
