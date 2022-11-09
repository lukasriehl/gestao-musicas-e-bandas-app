import { Injectable } from '@angular/core';
import { Music } from '../model/music';
import { Constants } from '../util/constants';
import { WebStorageUtil } from '../util/web-storage-util';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  musics!: Music[];

  constructor(){
    this.musics = WebStorageUtil.get(Constants.MUSICS_KEY);
  }

  save(music: Music){
    this.musics = WebStorageUtil.get(Constants.MUSICS_KEY);
    this.musics.push(music);
    WebStorageUtil.set(Constants.MUSICS_KEY, this.musics);
  }

  update(music: Music) {
    this.musics = WebStorageUtil.get(Constants.MUSICS_KEY);
    this.delete(music.name);
    this.save(music);
  }

  delete(name: string): boolean {
    this.musics = WebStorageUtil.get(Constants.MUSICS_KEY);
    this.musics = this.musics.filter((m) => {
      return m.name?.valueOf() != name?.valueOf();
    });

    WebStorageUtil.set(Constants.MUSICS_KEY, this.musics);
    return true;
  }

  isExists(value: string): boolean {
    this.musics = WebStorageUtil.get(Constants.MUSICS_KEY);
    for (let m of this.musics) {
      if (m.name?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  findById(id: number): Music {
    this.musics = WebStorageUtil.get(Constants.MUSICS_KEY);
    for (let m of this.musics) {
      if (m.id?.valueOf() == id?.valueOf()) {
        return m;
      }
    }

    return new Music('', '', '');
  }

  getMusics(): Music[] {
    this.musics = WebStorageUtil.get(Constants.MUSICS_KEY);
    return this.musics;
  }


}
