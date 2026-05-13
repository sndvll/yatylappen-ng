# YatzyLappen NG

Ett Yatzy-poängräkningsspel byggt i Angular. Håller koll på spelare, poäng och rundor med stöd för flera språk och dark mode.

## Tech Stack

- **Angular 20** (migrerar från 11)
- **@ngrx/signals** (migrerat från @ngrx/store + @ngrx/effects)
- **Angular Material** CDK
- **@ngx-translate/core** för i18n
- **lucide-angular** för ikoner
- **Dexie** (IndexedDB wrapper) för persistence
- **nanoid** (migrerar från shortid)

## Projektstruktur

```
src/
├── app/
│   ├── core/
│   │   ├── language/          # LanguageService, i18n
│   │   ├── model.ts           # Interfaces: GameState, Player, Point, PointName
│   │   ├── persistence/       # DexieService, PersistenceService
│   │   ├── store/             # GameStore (signalStore), game actions/reducer/effects
│   │   ├── theme/             # ThemeService (dark mode)
│   │   └── utils/             # GameUtils (poängberäkning)
│   ├── i18n/
│   │   ├── en.ts
│   │   └── sv.ts
│   ├── shared/
│   │   ├── components/        # PlayerComponent, PointComponent, dialogar
│   │   └── icons/             # FontAwesome-konfiguration
│   ├── side-nav/
│   │   └── components/        # Sidonavigation med inställningar
│   ├── yatzy/
│   │   ├── components/        # GameProtocolComponent
│   │   └── pages/             # YatzyPageComponent
│   ├── app.component.*
│   ├── app.config.ts          # Standalone providers
│   └── app.routes.ts          # Router-konfiguration
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── main.ts                    # Bootstrap
```

## Components

| Komponent | Typ | Status |
|-----------|-----|--------|
| AppComponent | Root | Standalone |
| GameProtocolComponent | Game board | Standalone |
| YatzyPageComponent | Page wrapper | Standalone |
| PlayerComponent | Per-player view | Standalone |
| PointComponent | Single point cell | Standalone |
| AddPlayerDialogComponent | Dialog | Standalone |
| AddPointDialogComponent | Dialog | Standalone |
| DeleteGameDialogComponent | Dialog | Standalone |
| SideNavComponent | Settings nav | Standalone |

## Commands

```bash
npm start          # ng serve
npm run build      # ng build
npm run test       # ng test (Karma)
npm run lint       # ng lint (eslint)
npm run deploy     # ng build && deploy till GitHub Pages
```

## Framtida arbete

- [x] AGENTS.md
- [x] Uppgradera Angular 11 → 19
- [x] Uppgradera Angular 19 → 20
- [x] Migrera @ngrx/store → @ngrx/signals signalStore
- [x] Konvertera alla NgModules → standalone components
- [x] Byt Firebase → GitHub Pages deployment
- [x] Ta bort service worker
- [x] Byt ut FontAwesome → Lucide-icons

## Konventioner

- **Imports**: Exportera från barrel-filer (`index.ts`) i varje feature-katalog
- **Prefix**: app (AppComponent), yatzy (YatzyPage), game-protocol, player, point, side-nav, add-player-dialog, add-point-dialog, delete-game-dialog
- **State**: Centraliserad via signalStore
- **Icons**: Lucide via `<lucide-icon name="...">`, registrera i app.config.ts med `LucideAngularModule.pick()`
- **i18n**: Svenska som default-språk, keys i SCREAMING_SNAKE_CASE
- **Namngivning**: Components i `feature/components/`, pages i `feature/pages/`
- **Filändelser**: `.ts`, `.html`, `.scss` per komponent

## Migration Notes

### För Angular-uppgradering
- Uppgradera en major-version i taget
- Efter varje steg: `ng build` och `ng test` för att verifiera
- Beroenden som kräver uppmärksamhet: @ngrx, @ngx-translate, Dexie, nanoid, @fortawesome

### För signalStore-migrering
- GameStore blir en signalStore: `withState`, `withMethods`, `withComputed`
- Persistence-anrop i methods istället för effects
- GameActions, reducer och effects tas bort när migreringen är klar

### För standalone-migrering
- Börja med leaf-komponenterna (längst in), jobba utåt
- Spara AppModule-split till sist
- Använd `provideRouter`, `provideHttpClient`, etc i app.config.ts
