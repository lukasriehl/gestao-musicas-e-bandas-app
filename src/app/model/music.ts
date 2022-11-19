import { Band } from './band';

export class Music {
  public id: number;
  public name: string;
  public releaseYear!: number;
  public cdName: string;
  public link: string;
  public bandId!: string;
  //TODO: REMOVER O ATRIBUTO BAND, APÓS INCLUSÃO DO bandId
  constructor(name: string, cdName: string, link: string, public band?: Band) {
    this.id = Math.round(Math.random() * 1000);
    this.name = name;
    this.cdName = cdName;
    this.link = link;

    if (band == undefined) {
      this.band = JSON.parse('{}');
    }
  }

  public static clone(music: Music) {
    let musicBandName = music.band?.name;
    let m: Music = new Music(music.name, music.cdName, music.link,
      new Band(musicBandName == undefined ? '' : musicBandName, music.band?.style));
    m.id = music.id;
    m.releaseYear = music.releaseYear;
    m.band = music.band;
    return m;
  }
}
