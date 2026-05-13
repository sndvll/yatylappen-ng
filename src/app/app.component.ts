import {Component, HostBinding, OnDestroy, OnInit, inject} from '@angular/core';
import { nanoid as generate } from 'nanoid';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {AddPlayerDialogComponent} from './shared';
import {filter, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {GameStore, ThemeService, PersistenceService} from './core';
import {DeleteGameDialogComponent} from './shared/components/delete-game-dialog/delete-game-dialog.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {IconsModule} from './shared/icons';
import {SideNavComponent} from './side-nav';
import {GameProtocolComponent} from './yatzy';
import {TranslateModule} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatDialogModule,
      IconsModule,
      SideNavComponent,
      GameProtocolComponent,
      TranslateModule,
    ]
})
export class AppComponent implements OnInit, OnDestroy {

  readonly store = inject(GameStore);
  readonly dialog = inject(MatDialog);
  readonly theme = inject(ThemeService);
  readonly persistence = inject(PersistenceService);

  public openSideNav = false;

  private _onDestroy = new Subject<void>();

  @HostBinding('class') className = '';

  ngOnInit(): void {
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
    this.store.restartGame();
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
        this.store.restartGame();
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
