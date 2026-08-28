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

## Reusing this repository as an autodoc example

If you are studying Click-a-Duck to introduce living documentation in another repository, take away the pattern rather than the duck-specific paths:

- Put the documentation contract in the repository. Define the source of truth, the documentation audiences, the path-to-page impact map, and the checks that make a change complete.
- Keep the handbook beside the code and give it deterministic CI checks. The agent judges whether facts drifted; the type check and production build judge whether the site is valid.
- Give the pull-request agent a focused maintenance skill. It must review the complete change against the base branch, edit only approved documentation paths, validate its edits, and leave an already-accurate branch unchanged.
- Keep factual review separate from writing style. Here, `autodoc` decides what must change and `docs-humanizer` defines the product-first voice. Replace that writing reference with the terminology, examples, and tone required by the target product.
- Let the pull-request workflow commit fixes to the development branch so the documentation diff remains visible and reviewable. Keep fork handling, bot-loop prevention, credentials, and branch protection explicit.

Before enabling incremental pull-request maintenance in an existing codebase, perform a one-time documentation baseline. Ask the coding agent to read the repository instructions and analyze the complete codebase: user and operator workflows, architecture boundaries, configuration, commands, tests, and current documentation. Have it propose the information architecture and impact map, then work in bounded review, edit, validate, and gap-analysis loops until every reader-visible fact has an appropriate home and the full documentation suite passes its checks.

With Claude Code, make `CLAUDE.md` import the shared `AGENTS.md` contract as this repository does. Explicitly ask Claude to read those instructions and perform the baseline audit. The pull-request workflow maintains that baseline; it is not a substitute for creating it.

## Code conventions

- Keep `DuckGameService` deterministic and UI-independent.
- Keep page interaction in Razor components.
- Add or adjust tests when domain behavior changes.
- Avoid new packages unless they materially improve the example.
