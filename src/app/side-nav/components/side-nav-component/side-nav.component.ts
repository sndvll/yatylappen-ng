import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LanguageService, ThemeService, PersistenceService, GameState} from '../../../core';
import {UntypedFormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import { takeUntil} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {TranslateModule} from '@ngx-translate/core';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatSelectModule,
      MatButtonModule,
      MatSlideToggleModule,
      TranslateModule,
    ]
})
export class SideNavComponent implements OnInit, OnDestroy {

  private _onDestroy$ = new Subject<void>();

  public langControl = new UntypedFormControl();
  public darkModeControl = new UntypedFormControl();
  public autoLoadSettingControl = new UntypedFormControl();
  public loadSavedGamesControl = new UntypedFormControl(null, [Validators.required]);
  public deleteSavedGamesControl = new UntypedFormControl(null, [Validators.required]);

  public savedGames: GameState[] = [];

  readonly version = environment.version;
  readonly commitHash = environment.commitHash;

  @Output() restartGame = new EventEmitter<void>();
  @Output() loadGame = new EventEmitter<string>();
  @Output() deleteLastSavedGame = new EventEmitter<string>();
  @Output() addPlayer = new EventEmitter<void>();
  @Output() undo = new EventEmitter<void>();

  constructor(private language: LanguageService,
              private theme: ThemeService,
              private persistence: PersistenceService) {

    this.langControl.patchValue(language.currentLang);
    this.darkModeControl.patchValue(persistence.darkMode);
    this.autoLoadSettingControl.patchValue(persistence.autoLoadSetting);

    this.theme.set(persistence.darkMode || false);
    this.persistence.allNotCompleted()
      .subscribe(savedGames => this.savedGames = savedGames);
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

  public load(): void {
    this.loadGame.emit(this.loadSavedGamesControl.value);
  }

  public delete(): void {
    this.deleteLastSavedGame.emit(this.deleteSavedGamesControl.value);
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
