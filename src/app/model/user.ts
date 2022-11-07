import { Playlist } from "./playlist";

export class User {
  id!: string;
  name?: string;
  username: string;
  password: string;
  cpf?: string;
  birthday?: Date;
  isAdmin: boolean;
  playlist: Playlist;
  constructor(username: string, password: string, isAdmin: boolean = false) {
    this.id = String(Math.round(Math.random() * 1000));
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
    this.playlist = new Playlist('');
  }

  public static clone(user: User) {
    let u: User = new User(user.username, user.password, user.isAdmin);
    u.name = user.name;
    u.cpf = user.cpf;
    u.birthday = user.birthday;
    return u;
  }

  /**
   * Transforma um objeto pego da API para a versão salva no WebStorage
   * @param user
   * @returns
   */
  public static toWS(user: User) {
    let u: User = new User(user.username, user.password, user.isAdmin);
    u.name = user.name;
    u.cpf = user.cpf;
    u.birthday = user.birthday;
    return u;
  }
}
