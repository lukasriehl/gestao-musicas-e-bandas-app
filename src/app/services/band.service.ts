import { Band } from './../model/band';

import { Constants } from './../util/constants';
import { Injectable } from '@angular/core';
import { WebStorageUtil } from 'src/app/util/web-storage-util';

@Injectable({
  providedIn: 'root',
})
export class BandService {
  bands!: Band[];

  constructor(){
    this.bands = WebStorageUtil.get(Constants.BANDS_KEY);

    if(this.bands === null || this.bands === undefined){
      this.bands = [];

      WebStorageUtil.set(Constants.BANDS_KEY, this.bands);
    }
  }

  save(band: Band){
    this.bands = WebStorageUtil.get(Constants.BANDS_KEY);
    this.bands.push(band);
    WebStorageUtil.set(Constants.BANDS_KEY, this.bands);
  }

  update(band: Band) {
    this.bands = WebStorageUtil.get(Constants.BANDS_KEY);
    this.delete(band.name);
    this.save(band);
  }

  delete(name: string): boolean {
    this.bands = WebStorageUtil.get(Constants.BANDS_KEY);
    this.bands = this.bands.filter((b) => {
      return b.name?.valueOf() != name?.valueOf();
    });

    WebStorageUtil.set(Constants.BANDS_KEY, this.bands);
    return true;
  }

  isExists(value: string): boolean {
    this.bands = WebStorageUtil.get(Constants.BANDS_KEY);

    for (let b of this.bands) {
      if (b.name?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  findById(id: number): Band {
    this.bands = WebStorageUtil.get(Constants.BANDS_KEY);

    for (let b of this.bands) {
      if (b.id?.valueOf() == id?.valueOf()) {
        return b;
      }
    }

    return new Band('');
  }

  getBands(): Band[] {
    this.bands = WebStorageUtil.get(Constants.BANDS_KEY);
    return this.bands;
  }
}
