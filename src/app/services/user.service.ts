import { Playlist } from './../model/playlist';
import { Constants } from 'src/app/util/constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesAPI } from '../util/routes-api';
import { catchError, map } from 'rxjs/operators';
import { ErrorUtil } from './../util/error-util';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': Constants.CONTENT_TYPE_JSON }),
  };

  constructor(private httpClient: HttpClient) {}

  getIdByUsername(username: string): Observable<string> {
    const query: HttpParams = new HttpParams().set('username', username);
    const options = username ? { params: query } : {};

    return this.httpClient.get<User[]>(`${RoutesAPI.USERS}?username=${username}`, options).pipe(
      map((users: User[])=>users[0].id),
      catchError(ErrorUtil.handleError)
    );
  }

  listPlaylistsByUser(id: string): Observable<Playlist[]> {
    return this.httpClient
      .get<Playlist[]>(`${RoutesAPI.PLAYLISTS}?userId=${id}`)
      .pipe(catchError(ErrorUtil.handleError));
  }
}
