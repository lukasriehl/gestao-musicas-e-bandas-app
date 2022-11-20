import { Style } from './style';
import { Music } from './music';

export class Band {
  public id: number;
  public foundationYear?: number;
  public musics: Music[];
  public styleId!: string;
  constructor(public name: string) {
    this.id = Math.round(Math.random() * 1000);

    this.musics = [];
  }

  public static clone(band: Band) {
    let b: Band = new Band(band.name);
    b.id = band.id;
    b.foundationYear = band.foundationYear;
    b.musics = band.musics;
    b.styleId = band.styleId;
    return b;
  }
}

export interface BandDTO {
  id: number;
  name: string;
  foundationYear: number;
  style: Style
}
