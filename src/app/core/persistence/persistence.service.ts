import {Injectable} from '@angular/core';
import {DexieService} from './dexie.service';
import Dexie from 'dexie';
import {GameState} from '../model';
import {from, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PersistenceService{

  private table: Dexie.Table<GameState, string>;

  constructor(private dexie: DexieService) {
    this.table = this.dexie.table('yatzy');
  }

  public loadLastGame(): Observable<GameState | undefined> {
    return from(this.table.orderBy('lastChanged')
      .filter(game => !!game && !game.completed).last());
  }

  public set state(value: GameState) {
    this._exists(value.id)
      .subscribe(exists => {
        if (exists) {
          this.table.put(value, value.id);
          return;
        }
        this.table.add(value, value.id);
      });
  }

  public set darkMode(value: boolean) {
    localStorage.setItem('dark-mode', `${value}`);
  }

  public get darkMode(): boolean {
    return JSON.parse(`${localStorage.getItem('dark-mode')}`);
  }

  public set language(value: string) {
    localStorage.setItem('language', value);
  }

  public get language(): string {
    return localStorage.getItem('language') || 'sv';
  }

  public set autoLoadSetting(value: boolean) {
    localStorage.setItem('auto-load', `${value}`);
  }

  public get autoLoadSetting(): boolean {
    return JSON.parse(`${localStorage.getItem('auto-load')}`);
  }

  private _exists(id: string): Observable<boolean> {
    return from(this.table.get(id)).pipe(
      take(1),
      map(state => !!state)
    );
  }
}

