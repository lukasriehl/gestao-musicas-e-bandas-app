import { Band } from './band';

export class Music {
  public id: number;
  public name: string;
  public releaseYear!: number;
  public cdName: string;
  public link: string;
  public bandId!: string;

  constructor(name: string, cdName: string, link: string) {
    this.id = Math.round(Math.random() * 1000);
    this.name = name;
    this.cdName = cdName;
    this.link = link;
  }

  public static clone(music: Music) {
    let m: Music = new Music(music.name, music.cdName, music.link);
    m.id = music.id;
    m.releaseYear = music.releaseYear;
    m.bandId = music.bandId;
    return m;
  }
}
export interface MusicDTO {
  id: number;
  name: string;
  releaseYear: number;
  cdName: string;
  link: string;
  band: Band;
}
