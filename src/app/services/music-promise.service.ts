import { Constants } from 'src/app/util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Music } from './../model/music';
import {firstValueFrom} from 'rxjs';
import { MusicDTO } from './../model/music';

@Injectable({
  providedIn: 'root',
})
export class MusicPromiseService {
  URL = Constants.HOST + '/musics';
  URL_PT = Constants.HOST + '/musicas';
  URL_EXPAND_STYLES = Constants.HOST + '/musics?_expand=band';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': Constants.CONTENT_TYPE_JSON }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Promise<Music[]> {
    return firstValueFrom(this.httpClient.get<Music[]>(`${this.URL}`));
  }

  listAllWithBand(): Promise<MusicDTO[]> {
    return firstValueFrom(this.httpClient.get<MusicDTO[]>(`${this.URL_EXPAND_STYLES}`));
  }

  getById(id: number): Promise<Music> {
    return firstValueFrom(this.httpClient.get<Music>(`${this.URL}/${id}`));
  }

  getByName(name: string): Promise<Music[]> {
    return firstValueFrom(this.httpClient.get<Music[]>(`${this.URL}?name=${name}`));
  }

  findIdByName(name: string): Promise<number> {
    const id = new Promise<number>((resolve, reject) => {
      this.getByName(name)
      .then((b: Music[]) => {
        resolve(b !== undefined && b.length > 0 ? b[0].id : -1);
      })
      .catch((e) => {
        reject('Falha ao verificar se música com o nome ' + name + ' existe!');
      });
    });

    return id;
  }

  save(music: Music): Promise<Music> {
    //TODO: AQUI IMPLEMENTAR A VERIFICAÇÃO SE O ID É REPETIDO
    return firstValueFrom (
      this.httpClient
      .post<Music>(
        this.URL,
        JSON.stringify(music),
        this.httpOptions
      )
    );
  }

  update(music: Music): Promise<Music> {
    return firstValueFrom (
      this.httpClient
      .put<Music>(
        `${this.URL}/${music.id}`,
        JSON.stringify(music),
         this.httpOptions
      )
    );
  }

  delete(id: number): Promise<boolean> {
    const deletou = new Promise<boolean>((resolve, reject) => {
      firstValueFrom (
        this.httpClient
        .delete<Music>(
          `${this.URL}/${id}`)
      )
      .then( () => {
          resolve(true);
      })
      .catch((e) => {
        reject('Falha ao deletar música de ID ' + id + '!');
      });
    });

    return deletou;
  }

  deleteByName(name: string): Promise<boolean> {
    const deletou = new Promise<boolean>((resolve, reject) => {
        this.getByName(name)
        .then((m: Music[]) => {
            let music = m[0];

            this.delete(music.id)
            .then((d: boolean) => {
                resolve(d);
            })
            .catch((e) => {
              reject('Falha ao deletar música com nome ' + music.name + ' !');
            });
        })
        .catch((e) => {
          reject('Nenhuma música com o nome ' + name + ' encontrada para remoção!');
        });
    });

    return deletou;
  }
}
