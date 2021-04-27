import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import { generate } from 'shortid';
import {MatDialog} from '@angular/material/dialog';
import {AddPlayerDialogComponent} from './shared';
import {filter, take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {GameState, GameStore, ThemeService, PersistenceService} from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public openSideNav = false;

  private _onDestroy = new Subject<void>();

  @HostBinding('class') className = '';

  get state$(): Observable<GameState> {
    return this.store.state$;
  }

  constructor(private store: GameStore,
              public dialog: MatDialog,
              public theme: ThemeService,
              public persistence: PersistenceService) {
  }

  ngOnInit(): void {
    this.theme.dark$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(dark => {
        this.className = dark ? 'dark' : 'light';
      });
    if (this.persistence.autoLoadSetting) {
      this.store.loadLastGame();
    }
  }

  public onAddPlayer(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);
    dialogRef.afterClosed()
      .pipe(
        take(1),
        filter(name => !!name)
      )
      .subscribe(name =>
        this.store.addPlayer({name, id: generate(), completed: false}));
  }

  public onRestartGame(): void {
    this.store.restart();
  }

  public onLoadLastGame(): void {
    console.log('here');
    this.store.loadLastGame();
  }

  public undo(): void {
    this.store.undo();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
