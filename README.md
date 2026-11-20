# i18n-lens

CLI that finds i18n problems in React + FormatJS projects: hardcoded UI strings, missing translation keys, and unused messages.

> Early development. APIs will change.

## The problem

Lint and typecheck do not catch most i18n mistakes. Common ones:

- Hardcoded user-facing strings in components
- Keys present in one locale but missing in others
- Messages left in catalogs after the code stopped using them

Those usually show up in review or in production. i18n-lens is meant to catch them in CI.

## Features

Nothing here ships yet. This is the near-term target for a first usable release:

### Source analysis (React / TSX)

- [ ] Hardcoded JSX text
- [ ] Hardcoded strings in common UI attributes (`placeholder`, `title`, `aria-label`, …)
- [ ] Message ids from FormatJS APIs (`FormattedMessage`, `useIntl`, `defineMessages`, …)

### Catalog analysis

- [ ] Missing keys across locales
- [ ] Unused keys (in catalogs, never referenced from source)
- [ ] Configurable source locale

### Reporting

- [ ] Terminal output
- [ ] JSON report
- [ ] Rule severity in config (`warning` / `error`)
- [ ] Non-zero exit code when errors are found

Out of scope for now: coverage percentages, HTML reports, autofix, other i18n libraries, visual/RTL checks.

## How it works

```text
  Source files (TS/TSX)          Translation catalogs
           |                              |
           v                              v
    Parser + FormatJS adapter      Catalog loader
           |                              |
           +--------------+---------------+
                          |
                          v
                   Analysis (rules)
                          |
                          v
                       Findings
                          |
              +-----------+-----------+
              |                       |
              v                       v
           Terminal                  JSON
```

Core owns shared types, rules, and orchestration. Parsing and FormatJS-specific extraction live in separate packages so the engine stays small.

## Stack

| Technology              | Purpose                  |
| ----------------------- | ------------------------ |
| TypeScript              | Implementation           |
| TypeScript Compiler API | Source / AST analysis    |
| FormatJS                | First (and only) adapter |
| Node.js                 | Runtime                  |
| pnpm                    | Monorepo                 |
| Vitest                  | Tests                    |
| Commander               | CLI                      |
| Zod                     | Config validation        |

## Package layout

```text
i18n-lens/
├── packages/
│   ├── core/                 # types, rules, catalog logic, analyzer
│   ├── parser/               # TypeScript/TSX parsing helpers
│   ├── adapter-formatjs/     # FormatJS → core model
│   ├── cli/                  # config + `analyze` command
│   └── reporter/             # terminal + JSON
├── examples/
│   └── react-formatjs/
├── package.json
└── pnpm-workspace.yaml
```

## Planned usage

Shape of the API we are aiming for (not implemented yet):

### Install

```bash
npm install -D i18n-lens
```

### Config

```ts
// i18n-lens.config.ts

import { defineConfig } from "i18n-lens";

export default defineConfig({
	adapter: "formatjs",
	sourceLocale: "en",
	locales: ["en", "fr", "ar"],
	translations: "./src/locales/{{locale}}.json",
	include: ["src/**/*.{ts,tsx}"],
	rules: {
		"hardcoded-text": "warning",
		"missing-translation": "error",
		"unused-translation": "warning",
	},
});
```

### Run

```bash
npx i18n-lens analyze
```

### Example output

```text
i18n-lens

Source locale: en
Locales: en, fr, ar

SUMMARY
  hardcoded-text         12
  missing-translation     8
  unused-translation      5

ISSUES
  error  missing-translation  fr.json
         Missing key: checkout.confirm

  error  hardcoded-text  src/pages/Login.tsx:24
         Hardcoded text: "Forgot password?"

  warning  unused-translation  ar.json
           Unused key: dashboard.old_title

Finished with 2 error(s), 1 warning(s).
```

## Roadmap

| Version | Scope                                                                | Status      |
| ------- | -------------------------------------------------------------------- | ----------- |
| 0.1     | Monorepo, shared types, Zod config, defaults merged with user config | In progress |
| 0.1     | Catalog missing / unused keys                                        | Planned     |
| 0.1     | FormatJS message-id extraction + basic hardcoded JSX text            | Planned     |
| 0.1     | Terminal reporter + exit codes                                       | Planned     |
| 0.2     | JSON reporter, richer hardcoded-attribute checks                     | Planned     |
| 0.3     | CI examples, tighter DX (better errors, config docs)                 | Planned     |

Further adapters, HTML reports, and autofix are backlog only after 0.1 is useful on a real app.

## Design notes

1. **React + FormatJS first** — One stack until the core loop works end to end.
2. **Findings carry rule id + resolved severity** — Reporters should not need to re-read config.
3. **Config is flat** — Locales, paths, adapter, and rules at the top level.
4. **Keep packages thin** — Core stays free of TS compiler and FormatJS details.

## Contributing

Early days. Issues and ideas are welcome, especially once 0.1 exists and you can run it on a real project.

## License

MIT
