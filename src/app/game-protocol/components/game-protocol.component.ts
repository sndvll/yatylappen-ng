import {Component, ViewEncapsulation} from '@angular/core';
import {GameState, Point, GameStore} from '../../core';
import {Observable} from 'rxjs';


@Component({
  selector: 'game-protocol',
  templateUrl: 'game-protocol.component.html',
  encapsulation: ViewEncapsulation.None
})
export class GameProtocolComponent {

  get state$(): Observable<GameState> {
    return this.store.state$;
  }

  constructor(private store: GameStore) {
  }

  public savePoint(point: Point): void {
    this.store.addPoint(point);
  }
}
