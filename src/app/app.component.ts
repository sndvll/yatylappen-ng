import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import { nanoid as generate } from 'nanoid';
import {MatDialog} from '@angular/material/dialog';
import {AddPlayerDialogComponent} from './shared';
import {filter, take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {GameState, GameStore, ThemeService, PersistenceService} from './core';
import {DeleteGameDialogComponent} from './shared/components/delete-game-dialog/delete-game-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
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
    if (this.persistence.autoLoadSetting) {
      this.store.loadLastGame();
    }
    this.theme.dark$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(dark => {
        this.className = dark ? 'dark' : 'light';
      });

  }

  public onAddPlayer(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);
    dialogRef.afterClosed()
      .pipe(
        take(1),
        filter(name => !!name)
      )
      .subscribe((names: string) => {
        const players = names.split(',');
        players.forEach((name: string) => {
          this.store.addPlayer({name, id: generate(), completed: false});
        });
      });
  }

  public onRestartGame(): void {
    this.store.restart();
  }

  public onLoadGame(id: string): void {
    this.store.loadGameById(id);
  }

  public onDeleteSavedGame(id: string): void {
    console.log('delete', id);
    const dialogRef = this.dialog.open(DeleteGameDialogComponent, {
      data: { id }
    });
    dialogRef.afterClosed()
      .pipe(
        take(1),
        filter(gameId => !!gameId)
      )
      .subscribe(gameId => {
        this.persistence.deleteGame(gameId);
        this.store.restart();
    });

  }

  public undo(): void {
    this.store.undo();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
