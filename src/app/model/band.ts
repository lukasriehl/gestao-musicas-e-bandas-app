import { Style } from './style';
import { Music } from './music';

export class Band {
  public id: number;
  public foundationYear?: number;
  public musics: Music[];
  constructor(public name: string, public style?: Style) {
    this.id = Math.round(Math.random() * 1000);

    if (style == undefined) {
      this.style = new Style({});
    }

    this.musics = [];
  }

  public static clone(band: Band) {
    let b: Band = new Band(band.name, new Style(band.style))
    b.id = band.id;
    b.foundationYear = band.foundationYear;
    b.musics = band.musics;
    return b;
  }
}

export const newBand = new Band('', {});
