import { Member } from "./member";

export class Band {
  public id: number;
  public name: string;
  public foundationYear: number;
  public style: string;
  public members: Member[];
  constructor(name: string, gender: string, foundationYear: number, style: string, members: Member[]) {
    this.id = Math.round(Math.random() * 1000);
    this.name = name;
    this.foundationYear = foundationYear;
    this.style = style;
    this.members = [];
  }
}
