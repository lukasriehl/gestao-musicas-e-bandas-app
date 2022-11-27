import { Playlist } from './../model/playlist';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/util/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistPromiseService {
  URL = Constants.HOST + '/playlists';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': Constants.CONTENT_TYPE_JSON }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Promise<Playlist[]> {
    return firstValueFrom(this.httpClient.get<Playlist[]>(`${this.URL}`));
  }

  getById(id: number): Promise<Playlist> {
    return firstValueFrom(this.httpClient.get<Playlist>(`${this.URL}/${id}`));
  }

  getByName(name: string): Promise<Playlist[]> {
    return firstValueFrom(this.httpClient.get<Playlist[]>(`${this.URL}?name=${name}`));
  }

  findIdByName(name: string): Promise<number> {
    const id = new Promise<number>((resolve, reject) => {
      this.getByName(name)
      .then((b: Playlist[]) => {
        resolve(b !== undefined && b.length > 0 ? b[0].id : -1);
      })
      .catch((e) => {
        reject('Falha ao verificar se playlist com o nome ' + name + ' existe!');
      });
    });

    return id;
  }

  save(playlist: Playlist): Promise<Playlist> {
    //TODO: AQUI IMPLEMENTAR A VERIFICAÇÃO SE O ID É REPETIDO
    return firstValueFrom (
      this.httpClient
      .post<Playlist>(
        this.URL,
        JSON.stringify(playlist),
        this.httpOptions
      )
    );
  }

  update(playlist: Playlist): Promise<Playlist> {
    return firstValueFrom (
      this.httpClient
      .put<Playlist>(
        `${this.URL}/${playlist.id}`,
        JSON.stringify(playlist),
         this.httpOptions
      )
    );
  }

}
