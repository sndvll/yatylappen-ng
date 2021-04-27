import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ThemeService {

  private _dark = new BehaviorSubject<boolean>(false);
  public dark$ = this._dark.asObservable();

  public set(dark: boolean): void {
    localStorage.setItem('dark-mode', `${dark}`);
    this._dark.next(dark);
  }
}
