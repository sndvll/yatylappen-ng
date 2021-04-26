import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GameState, IGameStore, Player, Point} from '../model';
import {Store} from '@ngrx/store';
import {GameActions} from './game.actions';

@Injectable({ providedIn: 'root'})
export class GameStore {

  public state$: Observable<GameState>;

  constructor(public store: Store<IGameStore>) {
    this.state$ = this.store.select(state => state.game);
  }

  public addPlayer(player: Player): void {
    this.store.dispatch(GameActions.addPlayer({player}));
  }

  public addPoint(point: Point): void {
    this.store.dispatch(GameActions.addPoint({point}));
  }

  public undo(): void {
    this.store.dispatch(GameActions.undoLatestDispatch());
  }

}
