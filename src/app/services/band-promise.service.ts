import { Constants } from 'src/app/util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Band } from '../model/band';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BandPromiseService {
  URL = Constants.HOST + '/bands';
  URL_PT = Constants.HOST + '/bandas';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': Constants.CONTENT_TYPE_JSON }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Promise<Band[]> {
    return firstValueFrom(this.httpClient.get<Band[]>(`${this.URL}`));
  }

  getById(id: number): Promise<Band> {
    return firstValueFrom(this.httpClient.get<Band>(`${this.URL}/${id}`));
  }


  getByName(name: string): Promise<Band[]> {
    return firstValueFrom(this.httpClient.get<Band[]>(`${this.URL}?name=${name}`));
  }

  isExists(name: string): Promise<boolean> {
    const ɵxiste = new Promise<boolean>((resolve, reject) => {
      this.getByName(name)
      .then((b: Band[]) => {
        resolve(b !== undefined && b.length > 0);
      })
      .catch((e) => {
        reject('Falha ao verificar se banda com o nome ' + name + ' existe!');
      });
    });

    return ɵxiste;
  }

  save(band: Band): Promise<Band> {
    return firstValueFrom (
      this.httpClient
      .post<Band>(
        this.URL,
        JSON.stringify(band),
        this.httpOptions
      )
    );
  }

  update(band: Band): Promise<Band> {
    console.log("id da banda upd: " + band.id);
    return firstValueFrom (
      this.httpClient
      .put<Band>(
        `${this.URL}/${band.id}`,
        JSON.stringify(band),
         this.httpOptions
      )
    );
  }

  delete(id: number): Promise<boolean> {
    const deletou = new Promise<boolean>((resolve, reject) => {
      firstValueFrom (
        this.httpClient
        .delete<Band>(
          `${this.URL}/${id}`)
      )
      .then( () => {
          resolve(true);
      })
      .catch((e) => {
        reject('Falha ao deletar banda de ID ' + id + '!');
      });
    });

    return deletou;
  }

  deleteByName(name: string): Promise<boolean> {
    const deletou = new Promise<boolean>((resolve, reject) => {
        this.getByName(name)
        .then((b: Band[]) => {
            let band = b[0];

            this.delete(band.id)
            .then((d: boolean) => {
                resolve(d);
            })
            .catch((e) => {
              reject('Falha ao deletar banda com nome ' + band.name + ' !');
            });
        })
        .catch((e) => {
          reject('Nenhuma banda com o nome ' + name + ' encontrada para remoção!');
        });
    });

    return deletou;
  }
}
