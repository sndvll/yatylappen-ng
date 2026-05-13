import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {GameState, GameStore, Point} from '../../core';
import {Observable, Subject} from 'rxjs';
import {ThemeService} from '../../core';
import {takeUntil} from 'rxjs/operators';


@Component({
    selector: 'game-protocol',
    templateUrl: './game-protocol.component.html',
    styleUrls: [
        './game-protocol.component.scss'
    ],
    standalone: false
})
export class GameProtocolComponent implements OnInit, OnDestroy{

  @HostBinding('class') className = '';

  private _onDestroy = new Subject<void>();

  get state$(): Observable<GameState> {
    return this.store.state$;
  }

  constructor(private store: GameStore,
              public theme: ThemeService) {
  }

  ngOnInit(): void {
    this.theme.dark$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(dark => {
        this.className = dark ? 'dark' : 'light';
      });
  }

  public savePoint(point: Point): void {
    this.store.addPoint(point);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
