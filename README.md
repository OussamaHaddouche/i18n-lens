# LocaleLens 🌍

LocaleLens analyzes your frontend codebase and translation catalogs to detect internationalization issues before they reach production.

It helps developers identify hardcoded strings, missing translations, unused messages and translation coverage gaps through static analysis and automated reporting.

> 🚧 LocaleLens is currently under active development. Features and APIs are subject to change.

---

## The Problem

Internationalization issues are easy to introduce and surprisingly difficult to catch automatically.

Traditional linting and type checking don't necessarily identify:

- Hardcoded user-facing strings scattered throughout components.
- Translation keys missing from one or more locales.
- Obsolete translation messages that are no longer referenced.
- Inconsistent translation catalogs across languages.
- Incomplete translation coverage.

These problems often go unnoticed until someone manually reviews translation files or discovers an issue in production.

**LocaleLens aims to make internationalization quality measurable and enforceable through automated analysis.**

## Features

### Static Code Analysis

Analyze TypeScript and TSX source files to identify internationalization issues.

- [ ] Detect hardcoded JSX text.
- [ ] Detect hardcoded strings in JSX expressions.
- [ ] Detect hardcoded user-facing attributes (`placeholder`, `title`, `aria-label`, etc.).
- [ ] Extract translation references from FormatJS APIs.
- [ ] Identify dynamically generated or unresolved translation references.

### Translation Catalog Analysis

Compare translation catalogs across configured locales.

- [ ] Detect missing translation keys.
- [ ] Detect unused translation keys.
- [ ] Detect inconsistent translation catalogs.
- [ ] Validate interpolation variables.
- [ ] Support configurable source locales.

### Translation Coverage

Measure translation completeness across your application.

- [ ] Calculate coverage per locale.
- [ ] Identify untranslated messages.
- [ ] Generate coverage summaries.
- [ ] Support configurable coverage thresholds.

### Reporting

Provide actionable reports that can be integrated into development workflows.

- [ ] Terminal output.
- [ ] JSON reports.
- [ ] HTML reports.
- [ ] Configurable rule severity.
- [ ] CI-friendly exit codes.

### Future Features

- [ ] Automatic translation descriptor generation.
- [ ] GitHub Actions integration and pull request annotations.
- [ ] Additional i18n adapters (i18next, next-intl, etc.).
- [ ] Visual localization testing with Playwright.
- [ ] RTL layout validation.
- [ ] Runtime translation diagnostics.

---

## How It Works

LocaleLens combines static source-code analysis with translation catalog inspection.

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

The analysis engine is designed to remain independent of specific frontend frameworks and internationalization libraries.

Framework-specific and i18n-specific behavior is handled through adapters.

---

## Initial Technology Stack

| Technology | Purpose |
|---|---|
| TypeScript | Core implementation |
| TypeScript Compiler API | Source-code and AST analysis |
| FormatJS | Initial internationalization adapter |
| Node.js | Execution environment |
| pnpm | Monorepo and package management |
| Vitest | Unit and integration testing |
| Commander | CLI implementation |
| Zod | Configuration validation |
| Playwright | Future visual localization testing |

---

## Planned Architecture

LocaleLens is organized around a modular analysis engine.

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

### Core

Contains the framework-independent analysis engine, normalized types, rule execution and finding management.

### Parser

Responsible for parsing source files and extracting relevant AST information.

### Adapters

Translate framework-specific and i18n-specific patterns into a common representation understood by the core.

The initial adapter targets FormatJS.

### CLI

Provides the developer-facing interface for configuring and executing analysis.

### Reporters

Transform analysis results into different output formats.

---

## Planned Developer Experience

The intended usage will look something like this:

### Installation

```bash
npm install -D localelens
```

### Configuration

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

### Run Analysis

```bash
npx localelens analyze
```

### Example Output

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

*The configuration and output above illustrate the intended API and are not necessarily available in the current implementation.*

---

## Development Roadmap

| Milestone | Scope | Status |
|---|---|---|
| 0.1 | Project foundation and configuration | In progress |
| 0.1 | Translation catalog analysis | Planned |
| 0.1 | FormatJS source analysis | Planned |
| 0.1 | Hardcoded string detection | Planned |
| 0.1 | Translation coverage | Planned |
| 0.1 | Terminal and JSON reporting | Planned |
| 0.2 | HTML reports and autofix suggestions | Planned |
| 0.2 | CI/CD integration | Planned |
| 0.3 | Additional i18n adapters | Planned |
| 0.4 | Visual localization testing | Planned |
| 0.5 | Runtime diagnostics | Planned |

---

## Design Principles

LocaleLens follows a few core principles:

**Framework independence**

The core analysis engine should not depend on React or any specific frontend framework.

**Extensibility**

New analysis rules, parsers, adapters and reporters should be easy to introduce without changing the entire system.

**Actionable findings**

Reports should explain what went wrong, where it happened and how developers can investigate it.

**Configurable analysis**

Different projects have different internationalization conventions. Rules, severity and exclusions should be configurable.

**Developer experience**

Analysis should be predictable, reasonably fast and easy to integrate into existing development workflows.

---

## Contributing

LocaleLens is currently in its early development stage.

Contributions, suggestions and discussions are welcome as the project evolves.

If you have ideas for additional analysis rules, supported i18n libraries or improvements to the developer experience, feel free to open an issue.

---

## License

MIT
