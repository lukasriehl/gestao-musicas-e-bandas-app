export class Music {
  public id: number;
  public name: string;
  public gender: string;
  public releaseYear!: number;
  public cdName: string;
  public link: string;
  public includeOnPlaylist: boolean;
  public bandId!: string;
  constructor(name: string, gender: string, cdName: string,
    link: string) {
    this.id = Math.round(Math.random() * 1000);
    this.name = name;
    this.gender = gender;
    this.cdName = cdName;
    this.link = link;
    this.includeOnPlaylist = false;
  }
}

export const musics = [
  {
    id: 1,
    name: 'Forever',
    gender: 'Rock\'n\'Roll',
    bandId: '1',
    releaseYear: 1989,
    cdName: 'Hot in the Shade',
    link: 'https://www.youtube.com/watch?v=d_RKO5ozLVo'
  },
  {
    id: 2,
    name: 'Buffalo Soldier',
    gender: 'Reggae',
    bandId: '2',
    releaseYear: 1983,
    cdName: 'Confrontation',
    link: 'https://www.youtube.com/watch?v=uMUQMSXLlHM'
  },
  {
    id: 3,
    name: 'Without me',
    gender: 'Rap',
    bandId: '3',
    releaseYear: 2002,
    cdName: 'The Eminem Show',
    link: 'https://www.youtube.com/watch?v=YVkUvmDQ3HY'
  }
];
