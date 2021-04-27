import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LanguageService, ThemeService, PersistenceService} from '../../../core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  private _onDestroy$ = new Subject<void>();

  public langControl = new FormControl();
  public darkModeControl = new FormControl();
  public autoLoadSettingControl = new FormControl();
  @Output() restartGame = new EventEmitter<void>();
  @Output() loadLastGame = new EventEmitter<void>();

  constructor(private language: LanguageService,
              private theme: ThemeService,
              private persistence: PersistenceService) {
    this.langControl.patchValue(language.currentLang);
    this.darkModeControl.patchValue(persistence.darkMode);
    this.autoLoadSettingControl.patchValue(persistence.autoLoadSetting);

    this.theme.set(persistence.darkMode || false);
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
    this.autoLoadSettingControl
      .valueChanges
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(autoLoad => {
        this.persistence.autoLoadSetting = autoLoad;
    });

  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }
}
