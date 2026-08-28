# Click-a-Duck

Click ducks, grow the flock, and collect increasingly grand titles. Click-a-Duck is a small .NET 10 Blazor game with a public [player and contributor handbook](https://bart6114.github.io/auto-docs-mini-example/).

The game starts with three moving birds. Clicking a duck scores a point, and clicking a rare swan scores five, with a replacement joining the pond either way. As the score rises, the pond admits more birds and awards ranks from Pond paddler to Lord of the wings.

The repository also demonstrates a living-documentation workflow: open a pull request, and Claude checks whether the handbook still tells the truth.

## What is in the example

```text
src/ClickADuck/                     Blazor Web App
tests/ClickADuck.Tests/             One focused domain test suite
docs/                               Docusaurus 3 handbook
AGENTS.md                           Documentation contract for coding agents
CLAUDE.md                           Claude Code entry point
.claude/skills/autodoc/             Repository-local documentation skill
.claude/skills/docs-humanizer/      Product-first handbook writing skill
.github/workflows/ci.yml            Deterministic app and docs checks
.github/workflows/claude-autodoc.yml Documentation maintenance on every pull request
.github/workflows/deploy-docs.yml    GitHub Pages publication from main
```

The handbook covers the [game](docs/docs/product/click-a-duck.md), [architecture](docs/docs/architecture.md), [local workflow](docs/docs/development.md), and the full [documentation automation loop](docs/docs/documentation-automation.md).

## Run it locally

You need the .NET 10 SDK and Node.js 20 or newer.

```bash
dotnet restore
dotnet run --project src/ClickADuck
```

In a second terminal:

```bash
npm --prefix docs ci
npm --prefix docs start
```

Run the production checks with:

```bash
dotnet test ClickADuck.sln --configuration Release
npm --prefix docs run typecheck
npm --prefix docs run build
```

## The documentation loop

The workflow combines deterministic checks with an agent judgment call:

```text
Developer opens or updates a pull request
                 │
                 ├── CI tests .NET and builds Docusaurus
                 │
                 └── Claude Code Action invokes /autodoc
                            │
                            ├── docs accurate → no commit
                            │
                            └── docs stale → validate and commit fixes to the PR
```

`AGENTS.md` is the contract. It maps source paths to the pages that may be affected and defines when a docs edit is part of "done." `CLAUDE.md` imports that contract for Claude Code. The workflow invokes `/autodoc` for each new or updated pull request; `/autodoc` invokes `/docs-humanizer` before editing so player pages stay focused on the game.

The workflow uses the official `anthropics/claude-code-action@v1` action in automation mode. It checks out the branch first so Claude can discover the project skill, then passes `/autodoc` through the action's `prompt` input. No code-review plugin is installed. See Anthropic's [GitHub Actions guide](https://code.claude.com/docs/en/github-actions) and [skills documentation](https://code.claude.com/docs/en/skills).

## Published handbook

Pushes to `main` that change `docs/**` build and deploy the handbook to [bart6114.github.io/auto-docs-mini-example](https://bart6114.github.io/auto-docs-mini-example/). The deployment uses GitHub Pages' artifact workflow; it doesn't need a `gh-pages` branch or stored deployment secret.

Each production build also generates machine-readable documentation:

- [`llms.txt`](https://bart6114.github.io/auto-docs-mini-example/llms.txt) is the compact index.
- [`llms-full.txt`](https://bart6114.github.io/auto-docs-mini-example/llms-full.txt) contains the complete handbook.
- Markdown versions of individual pages sit beside their HTML routes, such as `/docs/intro.md`.

These files are build artifacts. Edit the Markdown under `docs/docs`, not the generated copies.

## Enable the workflow on GitHub

1. Install the official [Claude GitHub App](https://github.com/apps/claude) for the repository.
2. Run `claude setup-token` while signed in to a Claude Pro, Max, Team, or Enterprise subscription.
3. Store that token as the repository Actions secret `CLAUDE_CODE_OAUTH_TOKEN`.
4. Open or update a pull request from a branch in this repository.

The workflow omits the `github_token` input, so the action authenticates repository operations through the installed Claude GitHub App. The OAuth secret authenticates Claude against the subscription. `/autodoc` reviews the complete pull-request diff and may change only `README.md`, `docs/docs/**`, and `docs/src/pages/**`. It installs the locked handbook dependencies, type-checks the site, and runs a production build before committing a correction to the pull-request branch.

GitHub doesn't expose repository secrets to workflows from forks, and the workflow doesn't grant outside contributors write access. The autodoc job therefore runs only for branches in this repository; deterministic CI still checks fork pull requests. A bot guard prevents Claude's documentation commit from starting an update loop.

## Copy the pattern

For a larger codebase, keep the same pieces and expand only the path map in `AGENTS.md`:

1. Put user, operator, and architecture pages in Docusaurus.
2. Map each source area to the pages it can invalidate.
3. Make Docusaurus build failures block merging.
4. Let the agent update writable development branches; keep protected-branch policy explicit.
5. Review agent edits like any other code change.

The useful automation isn't "generate a lot of text." It is "notice when an existing fact stopped being true, then fix it where reviewers can see the diff."
