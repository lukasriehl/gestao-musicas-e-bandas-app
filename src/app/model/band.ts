import { Style } from './style';
import { Member } from "./member";

export class Band {
  public id: number;
  public name: string;
  public foundationYear: number;
  public style?: Style;
  public members: Member[];
  constructor(name: string, foundationYear: number) {
    this.id = Math.round(Math.random() * 1000);
    this.name = name;
    this.foundationYear = foundationYear;
    this.members = [];
  }

  public static clone(band: Band) {
    let b: Band = new Band(band.name, band.foundationYear)
    b.style = band.style;
    b.members = band.members;
    return b;
  }
}
