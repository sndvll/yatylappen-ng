import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {GameStore} from './core/store/game.store';
import { generate } from 'shortid';
import {MatDialog} from '@angular/material/dialog';
import {AddPlayerDialogComponent} from './shared/components';
import {filter, map, take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {ThemeService} from './core/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public openSideNav = false;

  private _onDestroy = new Subject<void>();

  @HostBinding('class') className = '';

  constructor(private gameStore: GameStore,
              public dialog: MatDialog,
              public theme: ThemeService) {
  }

  ngOnInit(): void {
    this.theme.dark$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(dark => {
        this.className = dark ? 'dark' : 'light';
      });
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

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
