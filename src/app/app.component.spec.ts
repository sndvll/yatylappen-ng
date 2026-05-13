import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameStore, ThemeService, PersistenceService } from './core';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MatDialogModule, NoopAnimationsModule],
      providers: [
        GameStore,
        ThemeService,
        PersistenceService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have theme service injected', () => {
    expect(component.theme).toBeTruthy();
  });

  it('should set initial className on html element', () => {
    const html = document.documentElement;
    expect(html.className).toMatch(/^(dark|light)$/);
  });
});
