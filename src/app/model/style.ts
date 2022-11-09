export class Style{
  public id: number;
  public name: string;

  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }
}

export const styles = [
  {
   id: 1,
   name: 'Rock\'n\'Roll'
  },
  {
    id: 2,
    name: 'Hip Hop'
  },
  {
    id: 3,
    name: 'Rap'
  },
  {
    id: 4,
    name: 'Reggae'
  },
  {
    id: 5,
    name: 'Samba'
  },
  {
    id: 6,
    name: 'Pagode'
  },
  {
    id: 7,
    name: 'Clássica'
  },
  {
    id: 8,
    name: 'Outro'
  }
]
