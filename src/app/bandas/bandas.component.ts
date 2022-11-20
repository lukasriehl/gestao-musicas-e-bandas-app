import { BandPromiseService } from './../services/band-promise.service';
import { Component, OnInit } from '@angular/core';
import { Shared } from '../util/shared';
import { BandDTO } from '../model/band';

@Component({
  selector: 'app-bandas',
  templateUrl: './bandas.component.html',
  styleUrls: ['./bandas.component.css']
})
export class BandasComponent implements OnInit {
  bands?: BandDTO[];

  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private bandPromiseService: BandPromiseService) { }

  ngOnInit(): void {
    Shared.initializeWebStorage();

    this.showBands();
  }

  onDelete(name: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover a banda ' + name + '?'
    );
    if (!confirmation) {
      return;
    }

    this.bandPromiseService.deleteByName(name)
    .then((d: boolean) => {
      this.isSuccess = d;
      this.message = d ? 'O item foi removido com sucesso!' : 'Opps! O item não pode ser removido!';
    }).then( () => {
      this.bandPromiseService.listAllWithStyle()
      .then((b: BandDTO[]) => {
        this.bands = b;
      })
      .catch((e) => {
        this.isShowMessage = true;
        this.isSuccess = false;
        this.message = 'Falha ao exibir as bandas cadastradas!';
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

  showBands(){
    this.bandPromiseService.listAllWithStyle()
    .then((b: BandDTO[]) => {
      this.bands = b;
    })
    .catch((e) => {
      this.isShowMessage = true;
      this.isSuccess = false;
      this.message = 'Falha ao exibir as bandas cadastradas!';
    });
  }

}
