import {NgModule} from '@angular/core';
import {GameProtocolComponent} from './components/game-protocol.component';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../core/store/game.reducer';
import {EffectsModule} from '@ngrx/effects';
import {GameEffects} from '../core/store/game.effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('game', reducers),
    EffectsModule.forFeature([GameEffects]),
  ],
  declarations: [GameProtocolComponent],
  exports: [GameProtocolComponent]
})
export class GameProtocolModule {

}
