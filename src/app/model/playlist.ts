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
}
