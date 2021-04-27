import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {SideNavComponent} from './components/side-nav-component/side-nav.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    SideNavComponent
  ],
  exports: [
    SideNavComponent
  ]
})
export class SideNavModule {}
