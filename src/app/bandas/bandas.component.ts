import { BandService } from './../services/band.service';
import { Component, OnInit } from '@angular/core';
import { Shared } from '../util/shared';
import { Band } from '../model/band';

@Component({
  selector: 'app-bandas',
  templateUrl: './bandas.component.html',
  styleUrls: ['./bandas.component.css']
})
export class BandasComponent implements OnInit {
  bands?: Band[];

  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private bandService: BandService) { }

  ngOnInit(): void {
    Shared.initializeWebStorage();
    this.bands = this.bandService.getBands();
  }

  onDelete(name: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover a banda ' + name + '?'
    );
    if (!confirmation) {
      return;
    }
    let response: boolean = this.bandService.delete(name);
    this.isShowMessage = true;
    this.isSuccess = response;
    if (response) {
      this.message = 'O item foi removido com sucesso!';
    } else {
      this.message = 'Opps! O item não pode ser removido!';
    }
    this.bands = this.bandService.getBands();
  }

}
