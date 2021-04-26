import {NgModule} from '@angular/core';
import {COMPONENTS, IconsModule, PIPES} from '../shared';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';
import {MatSidenavModule} from '@angular/material/sidenav';

const MATERIAL_MODULES = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatSidenavModule
];


@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    ReactiveFormsModule,
    TranslateModule,
    ...MATERIAL_MODULES
  ],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [IconsModule, ...COMPONENTS, ...MATERIAL_MODULES, ...PIPES, TranslateModule]
})
export class SharedModule {

}
