import Dexie from 'dexie';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DexieService extends Dexie {
  constructor() {
    super('yatzy-db');
    this.version(1).stores({
      yatzy: 'id,created,lastChanged,completed'
    });
  }
}

