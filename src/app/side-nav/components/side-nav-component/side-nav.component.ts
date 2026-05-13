import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {LanguageService, ThemeService, PersistenceService, GameState, GameStore} from '../../../core';
import {UntypedFormControl, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import { takeUntil} from 'rxjs/operators';

@Component({
    selector: 'side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    standalone: false
})
export class SideNavComponent implements OnInit, OnDestroy {

  private _onDestroy$ = new Subject<void>();

  public langControl = new UntypedFormControl();
  public darkModeControl = new UntypedFormControl();
  public autoLoadSettingControl = new UntypedFormControl();
  public loadSavedGamesControl = new UntypedFormControl(null, [Validators.required]);
  public deleteSavedGamesControl = new UntypedFormControl(null, [Validators.required]);

  public savedGames: GameState[] = [];

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
