import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PersistenceService} from '../persistence';

@Injectable({providedIn: 'root'})
export class ThemeService {

  private _dark = new BehaviorSubject<boolean>(this.persistence.darkMode || false);
  public dark$ = this._dark.asObservable();
  public get darkMode(): boolean { return this._dark.value; }

  constructor(private persistence: PersistenceService) {
  }

  public set(dark: boolean): void {
    this.persistence.darkMode = dark;
    this._dark.next(dark);
  }
}
