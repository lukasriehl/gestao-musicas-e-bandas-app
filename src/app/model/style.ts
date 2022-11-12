export class Style{
  public id?: number;
  public name?: string;

  constructor(s: Style = {} as Style) {
    let { id = undefined, name = undefined} = s;

    this.id = id;
    this.name = name;
  }
}
