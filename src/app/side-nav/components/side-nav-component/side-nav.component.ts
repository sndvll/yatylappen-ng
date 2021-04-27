import {Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output} from '@angular/core';
import {GameUtils, LanguageService} from '../../../core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {ThemeService} from '../../../core/theme/theme.service';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  private _onDestroy$ = new Subject<void>();

  public langControl = new FormControl();
  public darkModeControl = new FormControl();

  constructor(private language: LanguageService,
              private theme: ThemeService) {
    this.langControl.patchValue(language.currentLang);
    this.darkModeControl.patchValue(GameUtils.DarkMode);
    this.theme.set(GameUtils.DarkMode);
  }

  ngOnInit(): void {
    this.langControl
      .valueChanges
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(language => this.language.setLanguage(language));
    this.darkModeControl
      .valueChanges
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(dark => {
        this.theme.set(dark);
      });

  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }
}
