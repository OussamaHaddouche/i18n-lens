# LocaleLens

LocaleLens scans your frontend source and translation catalogs for i18n problems: hardcoded strings, missing keys, unused messages, and coverage gaps.

> Under active development. APIs may change.

## The problem

i18n bugs slip through lint and typecheck. Typical misses:

- Hardcoded user-facing strings in components
- Keys missing from one or more locales
- Obsolete messages nothing references anymore
- Catalogs that drift apart across languages
- Incomplete coverage

You usually find these by hand, or in production. LocaleLens turns that into automated checks you can run in CI.

## Features

### Static code analysis

TypeScript and TSX source:

- [ ] Hardcoded JSX text
- [ ] Hardcoded strings in JSX expressions
- [ ] Hardcoded user-facing attributes (`placeholder`, `title`, `aria-label`, etc.)
- [ ] Translation references from FormatJS APIs
- [ ] Dynamically generated or unresolved translation references

### Translation catalog analysis

Across configured locales:

- [ ] Missing keys
- [ ] Unused keys
- [ ] Inconsistent catalogs
- [ ] Interpolation variable validation
- [ ] Configurable source locales

### Translation coverage

- [ ] Coverage per locale
- [ ] Untranslated messages
- [ ] Coverage summaries
- [ ] Configurable thresholds

### Reporting

- [ ] Terminal output
- [ ] JSON reports
- [ ] HTML reports
- [ ] Configurable rule severity
- [ ] CI-friendly exit codes

### Later

- [ ] Automatic translation descriptor generation
- [ ] GitHub Actions + PR annotations
- [ ] More i18n adapters (i18next, next-intl, etc.)
- [ ] Visual localization testing with Playwright
- [ ] RTL layout validation
- [ ] Runtime translation diagnostics

## How it works

LocaleLens pairs static source analysis with catalog inspection.

```text
       Frontend Source Code
              |
              v
       Source Analyzer
              |
              v
      Extracted Message IDs
              |
              +-------------------+
              |                   |
              v                   v
       Translation Catalogs   Source References
              |                   |
              +--------+----------+
                       |
                       v
                Analysis Engine
                       |
             +---------+---------+
             |         |         |
             v         v         v
          Missing   Unused    Coverage
        Translations Messages  Analysis
             |
             v
         Findings
             |
      +------+------+------+
      |      |      |      |
      v      v      v      v
    CLI    JSON   HTML   CI/CD
```

The analysis engine stays framework-agnostic. React, FormatJS, and other specifics live in adapters.

## Technology stack

| Technology              | Purpose                            |
| ----------------------- | ---------------------------------- |
| TypeScript              | Core implementation                |
| TypeScript Compiler API | Source and AST analysis            |
| FormatJS                | First i18n adapter                 |
| Node.js                 | Runtime                            |
| pnpm                    | Monorepo and packages              |
| Vitest                  | Unit and integration tests         |
| Commander               | CLI                                |
| Zod                     | Config validation                  |
| Playwright              | Planned visual localization tests  |

## Planned architecture

```text
localelens/
├── packages/
│   ├── core/
│   │   ├── analyzer/
│   │   ├── rules/
│   │   ├── catalog/
│   │   ├── resolver/
│   │   └── types/
│   │
│   ├── parser/
│   │   └── typescript/
│   │
│   ├── adapter-formatjs/
│   │
│   ├── cli/
│   │
│   └── reporter/
│       ├── terminal/
│       ├── json/
│       └── html/
│
├── examples/
│   └── react-formatjs/
│
├── tests/
├── docs/
├── package.json
└── pnpm-workspace.yaml
```

**Core** — Framework-independent engine, types, rules, and findings.

**Parser** — Parses source files and pulls out AST details the engine needs.

**Adapters** — Map framework/i18n patterns into the core model. FormatJS first.

**CLI** — How you configure and run analysis.

**Reporters** — Turn findings into terminal, JSON, or HTML output.

## Planned developer experience

Rough shape of the intended API (not all of this exists yet):

### Install

```bash
npm install -D localelens
```

### Config

```ts
// localelens.config.ts

import { defineConfig } from "localelens";

export default defineConfig({
  framework: "react",

  i18n: {
    adapter: "formatjs",
    sourceLocale: "en",
    locales: ["en", "fr", "ar"],
    translations: "./src/locales/{{locale}}.json",
  },

  include: ["src/**/*.{ts,tsx}"],

  rules: {
    "hardcoded-text": "warn",
    "missing-translation": "error",
    "unused-translation": "warn",
  },

  coverage: {
    enabled: true,
    minimum: 90,
  },
});
```

### Run

```bash
npx localelens analyze
```

### Example output

```text
LocaleLens

Analyzing source files...
Loading translation catalogs...

Source locale: en
Detected locales: en, fr, ar

ANALYSIS SUMMARY

Hardcoded strings       12
Missing translations    8
Unused translations    5

TRANSLATION COVERAGE

en    100.0%
fr     94.2%
ar     86.1%

ISSUES

ERROR  src/pages/Login.tsx:24
       Hardcoded text: "Forgot password?"

ERROR  fr.json
       Missing key: checkout.confirm

WARNING ar.json
        Unused key: dashboard.old_title

Analysis completed.
```

## Roadmap

| Milestone | Scope                                | Status      |
| --------- | ------------------------------------ | ----------- |
| 0.1       | Project foundation and configuration | In progress |
| 0.1       | Translation catalog analysis         | Planned     |
| 0.1       | FormatJS source analysis             | Planned     |
| 0.1       | Hardcoded string detection           | Planned     |
| 0.1       | Translation coverage                 | Planned     |
| 0.1       | Terminal and JSON reporting          | Planned     |
| 0.2       | HTML reports and autofix suggestions | Planned     |
| 0.2       | CI/CD integration                    | Planned     |
| 0.3       | Additional i18n adapters             | Planned     |
| 0.4       | Visual localization testing          | Planned     |
| 0.5       | Runtime diagnostics                  | Planned     |

## Design principles

1. **Framework independence** — Core should not depend on React or any one frontend stack.
2. **Extensibility** — New rules, parsers, adapters, and reporters should plug in without rewriting the engine.
3. **Actionable findings** — Say what broke, where, and how to dig in.
4. **Configurable analysis** — Projects differ; rules, severity, and exclusions should be tunable.
5. **Developer experience** — Predictable, reasonably fast, easy to drop into an existing workflow.

## Contributing

Early days. Issues and ideas are welcome — especially new rules, i18n library support, or DX improvements.

## License

MIT
