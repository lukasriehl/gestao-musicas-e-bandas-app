import { Style, styles } from './../model/style';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BandService } from '../services/band.service';
import { Band } from '../model/band';
import { Shared } from '../util/shared';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manut-bandas',
  templateUrl: './manut-bandas.component.html',
  styleUrls: ['./manut-bandas.component.css']
})
export class ManutBandasComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  band!: Band;
  styles: Style[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private route: ActivatedRoute, private bandService: BandService) {
    this.styles = styles;
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.band = new Band('', 1900);

    const routeParams = this.route.snapshot.paramMap;
    const bandId = Number(routeParams.get('bandId'));

    if(bandId !== undefined && bandId > 0){
      let bandToEdit = this.bandService.findById(bandId);
      this.band = Band.clone(bandToEdit);
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.bandService.isExists(this.band.name)) {
      this.bandService.save(this.band);
    } else {
      this.bandService.update(this.band);
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';
    this.form.reset();
    this.band = new Band('', 1900);
  }

}
