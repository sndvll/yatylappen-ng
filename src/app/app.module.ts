import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import {SharedModule} from './shared/shared.module';
import {GameProtocolModule} from './game-protocol/game-protocol.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LanguageModule} from './core';
import {SideNavModule} from './side-nav/side-nav.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    GameProtocolModule,
    SideNavModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictStateSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    LanguageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
