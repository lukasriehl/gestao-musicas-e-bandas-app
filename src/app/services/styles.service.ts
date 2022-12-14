import { Injectable } from '@angular/core';
import { Style } from '../model/style';
import { Constants } from '../util/constants';
import { HttpClient } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StylesService {
  URL = Constants.HOST + '/styles';
  URL_PT = Constants.HOST + '/estilos';

  constructor(private httpClient: HttpClient) {}

  getDefaultStyles(): Style[]{
    let styles = [];

    let style = new Style({});
    style.id = 1;
    style.name = 'Rock\'n\'Roll';
    styles.push(style);

    style = new Style({});
    style.id = 2;
    style.name = 'Hip Hop';
    styles.push(style);

    style = new Style({});
    style.id = 3;
    style.name = 'Rap';
    styles.push(style);

    style = new Style({});
    style.id = 4;
    style.name = 'Reggae';
    styles.push(style);

    style = new Style({});
    style.id = 5;
    style.name = 'Samba';
    styles.push(style);

    style = new Style({});
    style.id = 6;
    style.name = 'Pagode';
    styles.push(style);

    style = new Style({});
    style.id = 7;
    style.name = 'Clássica';
    styles.push(style);

    style = new Style({});
    style.id = 8;
    style.name = 'Outro';
    styles.push(style);

    return styles;
  }

  getAll(): Promise<Style[]> {
    return firstValueFrom(this.httpClient.get<Style[]>(`${this.URL}`));
  }

  getById(id: number): Promise<Style> {
    return firstValueFrom(this.httpClient.get<Style>(`${this.URL}/${id}`));
  }

}
