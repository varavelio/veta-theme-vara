# JavaScript Organization

All theme-owned JavaScript lives here (`public/_vara/js/`) so it never collides with user JavaScript. Alpine.js is installed and can be used to simplify the js and make it reactive.

## Directory structure

```
public/_vara/js/
├── build/          ← Bundled output (only folders with index.js produce a file here)
├── src/
│   ├── head/       ← High-priority scripts injected before </head> on every page
│   ├── theme/      ← Theme logic
│   └── docs/       ← JavaScript for documentation page templates
```

## How bundling works

- **Source (`src/`)** — Each subfolder is a logical module. If a folder contains an `index.js`, it is treated as an entry point and will be bundled into `build/` with the same name (e.g. `src/docs/index.js` → `build/docs.js`).
- **Support modules** — Folders without an `index.js` (e.g. `src/theme/`) are not entry points; their files are imported by the entry-point folders.
- **Build command** — Builds are defined in the root `Taskfile.yml`. Always refer to the current `Taskfile.yml` for the exact build invocations because they may change over time.

## Module overview

### `head/`

Scripts that must run as early as possible, injected via a `<script>` tag just before the closing `</head>`. Their primary purpose is to avoid a flash of unstyled content (FOUC) by applying the correct styles before the page renders.

### `theme/`

Theme logic split into two files:

- **`head.js`** — Loaded by the `head/` entry point. It exports `headInitTheme()`, which runs before render to prevent FOUC.
- **`runtime.js`** — Designed to be imported from other JavaScript modules at runtime.

### `docs/`

JavaScript specific to the documentation page templates (`docs.j2`).
