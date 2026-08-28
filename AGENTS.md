# Repository guide for coding agents

## Purpose

Click-a-Duck is a minimal .NET 10 Blazor Web App paired with a Docusaurus handbook. The repository exists to demonstrate a living-documentation workflow, so a change is complete only when code, tests, and reader-facing documentation agree.

Keep the product small. Prefer a clear example over extra production infrastructure.

## Repository map

- `src/ClickADuck`: Blazor app.
- `tests/ClickADuck.Tests`: domain tests.
- `docs/docs`: handbook content.
- `docs/src`: handbook presentation.
- `.claude/skills/autodoc`: pull-request documentation maintenance used by Claude Code Action.
- `.claude/skills/docs-humanizer`: product-first voice and editing guidance used by the autodoc skill.
- `.github/workflows`: deterministic CI and pull-request documentation automation.

## Commands

Run from the repository root unless noted otherwise.

```bash
dotnet test ClickADuck.sln --configuration Release
npm --prefix docs ci
npm --prefix docs run typecheck
npm --prefix docs run build
```

Use `dotnet run --project src/ClickADuck` for the app and `npm --prefix docs start` for the handbook.

## Documentation definition of done

Review the complete diff before finishing. Use this map to decide which pages may need an update:

| Changed path | Documentation to check |
| --- | --- |
| `src/ClickADuck/Components/Pages/**` | `docs/docs/product/**` and screenshots or examples that describe the UI |
| `src/ClickADuck/Services/**` | `docs/docs/product/**` and `docs/docs/architecture.md` |
| `src/ClickADuck/Program.cs`, `*.csproj`, `global.json` | `docs/docs/architecture.md` and `docs/docs/development.md` |
| `tests/**` | `docs/docs/development.md` if commands, coverage, or examples changed |
| `.github/workflows/**`, `.claude/**`, `AGENTS.md`, `CLAUDE.md` | `docs/docs/documentation-automation.md` and the root `README.md` |
| `docs/docusaurus.config.ts`, `docs/sidebars.ts` | root `README.md` if navigation, URLs, or publishing behavior changed |

A documentation edit is required when a reader-visible behavior, architecture boundary, prerequisite, command, configuration value, automation step, or ownership rule changed. Pure implementation refactors can require no docs edit, but verify that conclusion against the diff.

When documentation changes:

- Treat code and tests as the source of truth. Don't invent planned behavior.
- Update existing pages instead of creating near-duplicates.
- Keep commands runnable from the location stated above them.
- Keep links relative inside `docs/docs` when possible.
- Run the Docusaurus type check and production build.
- Follow `.claude/skills/autodoc/SKILL.md` for documentation review and `.claude/skills/docs-humanizer/SKILL.md` for prose.

## Code conventions

- Keep `DuckGameService` deterministic and UI-independent.
- Keep page interaction in Razor components.
- Add or adjust tests when domain behavior changes.
- Avoid new packages unless they materially improve the example.
