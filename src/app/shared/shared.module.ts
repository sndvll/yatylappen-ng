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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ClipboardModule} from '@angular/cdk/clipboard';

const MATERIAL_MODULES = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSelectModule,
  MatSidenavModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatToolbarModule
];

const CDK_MODULES = [
  ClipboardModule
];

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    ReactiveFormsModule,
    TranslateModule,
    ...MATERIAL_MODULES,
    ...CDK_MODULES
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  exports: [
    IconsModule,
    ...COMPONENTS,
    ...MATERIAL_MODULES,
    ...CDK_MODULES,
    ...PIPES,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {

}
