import {Component, HostBinding, OnDestroy, OnInit, inject} from '@angular/core';
import {GameStore, Point} from '../../core';
import {Subject} from 'rxjs';
import {ThemeService} from '../../core';
import {takeUntil} from 'rxjs/operators';
import {PlayerComponent} from '../../shared';
import {TranslateModule} from '@ngx-translate/core';

@Component({
    selector: 'game-protocol',
    templateUrl: './game-protocol.component.html',
    styleUrls: [
        './game-protocol.component.scss'
    ],
    standalone: true,
    imports: [
      PlayerComponent,
      TranslateModule,
    ]
})
export class GameProtocolComponent implements OnInit, OnDestroy{

  readonly store = inject(GameStore);
  readonly theme = inject(ThemeService);

  @HostBinding('class') className = '';

  private _onDestroy = new Subject<void>();

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
