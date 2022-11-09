export class Member {
  public id: number;
  public name: string;
  public position: string;
  public bandId: number;
  static readonly POS_VOCAL = 'vocal';
  static readonly POS_GUITARIST = 'guitarist';
  static readonly POS_BASSIST = 'bassist';
  static readonly DRUMMER = 'drummer';
  constructor(name: string, position: string) {
    this.id = Math.round(Math.random() * 1000);
    this.name = name;
    this.position = position;
  }
}
