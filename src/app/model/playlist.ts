import { Music } from './music';

export class Playlist {
  public id: number;
  public name: string;
  public userId!: string;
  public musics: Music[];
  constructor(name: string) {
    this.id = Math.round(Math.random() * 1000);
    this.name = name;
    this.musics = [];
  }

  public static clone(playlist: Playlist) {
    let p: Playlist = new Playlist(playlist.name);
    p.id = playlist.id;
    p.userId = playlist.userId;
    p.musics = playlist.musics;
    return p;
  }
}
export interface PlaylistDTO {
  id: number;
  name: string;
  musics: Music[];
}
