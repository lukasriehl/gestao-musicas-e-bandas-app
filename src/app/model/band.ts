import { Style } from './style';
import { Member } from "./member";

export class Band {
  public id?: number;
  public foundationYear?: number;
  public members: Member[];
  constructor(public name: string, public style?: Style) {
    this.id = Math.round(Math.random() * 1000);

    if (style == undefined) {
      this.style = new Style({});
    }

    this.members = [];
  }

  public static clone(band: Band) {
    let b: Band = new Band(band.name, new Style(band.style))
    b.foundationYear = band.foundationYear;
    b.members = band.members;
    return b;
  }
}
