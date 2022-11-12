import { Band } from './band';

export class Music {
  public id: number;
  public name: string;
  public releaseYear!: number;
  public cdName: string;
  public link: string;
  public includeOnPlaylist: boolean;
  constructor(name: string, cdName: string, link: string, public band?: Band) {
    this.id = Math.round(Math.random() * 1000);
    this.name = name;
    this.cdName = cdName;
    this.link = link;
    this.includeOnPlaylist = false;

    if (band == undefined) {
      this.band = JSON.parse('{}');
    }
  }

  public static clone(music: Music) {
    let musicBandName = music.band?.name;
    let m: Music = new Music(music.name, music.cdName, music.link,
      new Band(musicBandName == undefined ? '' : musicBandName, music.band?.style));
    m.releaseYear = music.releaseYear;
    m.includeOnPlaylist = music.includeOnPlaylist;
    m.band = music.band;
    return m;
  }
}
