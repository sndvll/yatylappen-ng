import {NgModule} from '@angular/core';
import {GameProtocolComponent} from './components/game-protocol.component';
import {SharedModule} from '../shared';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {reducers, GameEffects} from '../core';
import {EffectsModule} from '@ngrx/effects';
import {YatzyPageComponent} from './pages/yatzy.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('game', reducers),
    EffectsModule.forFeature([GameEffects]),
  ],
  declarations: [
    YatzyPageComponent,
    GameProtocolComponent
  ],
  exports: [
    YatzyPageComponent,
    GameProtocolComponent
  ]
})
export class YatzyModule {

}
