import {Component, HostBinding} from '@angular/core';
import {GameStore} from './core/store/game.store';
import { generate } from 'shortid';
import {MatDialog} from '@angular/material/dialog';
import {AddPlayerDialogComponent} from './shared/components';
import {filter, map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {LANG_SV} from './i18n/sv';
import {LanguageService} from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostBinding('class.app') appClass = true;

  constructor(private gameStore: GameStore,
              public dialog: MatDialog,
              private language: LanguageService) {
  }

  public onAddUser(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);
    dialogRef.afterClosed()
      .pipe(
        take(1),
        filter(name => !!name)
      )
      .subscribe(name =>
        this.gameStore.addPlayer({name, id: generate()}));
  }

  public undo(): void {
    this.gameStore.undo();
  }

  public get disableUndoButton(): Observable<boolean> {
    return this.gameStore.state$.pipe(map(state => state.disableUndoButton));
  }

  public get disableAddPlayerButton(): Observable<boolean> {
    return this.gameStore.state$.pipe(map(state => state.disableAddPlayerButton));
  }
}
