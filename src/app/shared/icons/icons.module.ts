import {NgModule} from '@angular/core';
import {FaConfig, FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import {faUndo} from '@fortawesome/free-solid-svg-icons/faUndo';
import {faDice} from '@fortawesome/free-solid-svg-icons/faDice';
import {faDiceOne} from '@fortawesome/free-solid-svg-icons/faDiceOne';
import {faDiceTwo} from '@fortawesome/free-solid-svg-icons/faDiceTwo';
import {faDiceThree} from '@fortawesome/free-solid-svg-icons/faDiceThree';
import {faDiceFour} from '@fortawesome/free-solid-svg-icons/faDiceFour';
import {faDiceFive} from '@fortawesome/free-solid-svg-icons/faDiceFive';
import {faDiceSix} from '@fortawesome/free-solid-svg-icons/faDiceSix';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule]
})
export class IconsModule {
  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    faConfig.defaultPrefix = 'fas';
    library.addIcons(faDice, faDiceOne, faDiceTwo, faDiceThree,
      faDiceFour, faDiceFive, faDiceSix);
  }
}
