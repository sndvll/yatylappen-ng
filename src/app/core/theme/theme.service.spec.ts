import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { PersistenceService } from '../persistence';

describe('ThemeService', () => {
  let service: ThemeService;
  let persistence: PersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService, PersistenceService],
    });
    service = TestBed.inject(ThemeService);
    persistence = TestBed.inject(PersistenceService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize dark$ from persistence', () => {
    persistence.darkMode = true;
    const service2 = TestBed.inject(ThemeService);
    let value = false;
    service2.dark$.subscribe(v => value = v);
    expect(value).toBe(true);
  });

  it('should update persistence and BehaviorSubject on set', () => {
    service.set(true);
    expect(persistence.darkMode).toBe(true);

    let value = false;
    service.dark$.subscribe(v => value = v);
    expect(value).toBe(true);
  });

  it('should toggle from dark to light', () => {
    service.set(true);
    service.set(false);
    expect(persistence.darkMode).toBe(false);

    let value = true;
    service.dark$.subscribe(v => value = v);
    expect(value).toBe(false);
  });

  it('should expose darkMode getter', () => {
    service.set(true);
    expect(service.darkMode).toBe(true);
  });
});
