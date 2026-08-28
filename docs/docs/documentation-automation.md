---
sidebar_position: 3
title: Documentation automation
description: Maintainer guidance for keeping the Click-a-Duck handbook aligned with pull requests.
---

# Documentation automation

This page is for maintainers of Click-a-Duck. The public overview and player guide stay focused on the game; repository review and publishing details live here.

The workflow uses six small layers. Each one has a narrow job.

| Layer | File | Job |
| --- | --- | --- |
| Documentation contract | `AGENTS.md` | Tells every coding agent what changes require a docs check. |
| Claude entry point | `CLAUDE.md` | Imports the shared contract into Claude Code. |
| Autodoc skill | `.claude/skills/autodoc/SKILL.md` | Reviews pull-request changes, updates reader docs, and validates the handbook. |
| Writing skill | `.claude/skills/docs-humanizer/SKILL.md` | Keeps player pages product-first and removes mechanical, generic prose. |
| Pull-request workflow | `.github/workflows/claude-autodoc.yml` | Runs the skill through the official Claude Code Action. |
| Pages workflow | `.github/workflows/deploy-docs.yml` | Builds and publishes the handbook after documentation reaches `main`. |

CI remains the deterministic backstop: it compiles the app, runs the test, type-checks the documentation code, and makes Docusaurus reject broken builds.

## What happens on a pull request

1. A developer opens, updates, reopens, or marks a pull request ready for review.
2. GitHub checks out the pull-request branch with its history.
3. `anthropics/claude-code-action@v1` starts in automation mode and invokes `/autodoc` through its `prompt` input.
4. The autodoc skill invokes `/docs-humanizer`, reads `CLAUDE.md` and `AGENTS.md`, reviews the complete pull-request diff, and checks the pages named by the path map.
5. If a reader-facing fact changed, Claude edits only the README, handbook pages, or handbook landing page.
6. The skill installs the locked Docusaurus dependencies, runs the type check and production build, then commits the validated documentation to the pull-request branch.
7. If the documentation already matches the implementation, Claude leaves the branch unchanged.

The workflow ignores commits attributed to `claude[bot]` and `github-actions[bot]`, which prevents a documentation commit from starting another Claude run.

## Why the workflow uses the GitHub Action

The official action already knows the pull-request context, authenticates repository operations through the Claude GitHub App, and provides guarded commit tools for the current branch. The repository doesn't need custom range resolution, change detection, or write-back shell steps.

The workflow checks out the branch before invoking Claude, which makes `.claude/skills/autodoc/SKILL.md` available on the runner. Supplying `/autodoc` as the prompt starts automation mode, so no `@claude` comment is required.

## Skills and plugins are different inputs

Project skills are discovered from `.claude/skills` after checkout. The workflow invokes `/autodoc` through the action's `prompt` input, and that skill calls `/docs-humanizer` before it edits prose. This keeps documentation review rules separate from the handbook voice.

This example uses project skills rather than Anthropic's code-review plugin because the job is documentation maintenance, not general code review.

## Repository setup

1. Install the official Claude GitHub App for this repository.
2. Sign in to Claude Code with a Pro, Max, Team, or Enterprise subscription and run `claude setup-token`.
3. Save the generated value as the repository Actions secret `CLAUDE_CODE_OAUTH_TOKEN`.
4. Open a pull request from a branch in this repository to exercise the workflow.
5. Require the `build-and-docs` CI job in branch protection if deterministic failures must block merges.

The OAuth token uses the linked Claude subscription instead of API billing. It is tied to the person who generated it, so rotate or remove the repository secret when that ownership changes.

Repository secrets aren't sent to fork pull requests. The job also requires the pull-request branch to belong to this repository because it may push a documentation commit. Fork pull requests still run the read-only CI workflow.

## Publishing

When a push to `main` changes `docs/**`, the Pages workflow installs the locked Node dependencies and builds Docusaurus. The build generates the site, `llms.txt`, `llms-full.txt`, and Markdown versions of each handbook page in `docs/build`. GitHub uploads that directory as a Pages artifact and deploys it to the `github-pages` environment.

The deploy job uses GitHub's short-lived OpenID Connect token with `pages: write` and `id-token: write`. It doesn't use a personal token, custom domain, or `gh-pages` branch. The published site is [bart6114.github.io/auto-docs-mini-example](https://bart6114.github.io/auto-docs-mini-example/).

## Review policy

Claude should change a page only when the code changes a fact that readers rely on. Pure refactors can legitimately produce no documentation diff. The workflow limits writes to `README.md`, `docs/docs/**`, and `docs/src/pages/**`; application code, tests, repository instructions, workflow files, and documentation configuration are off limits.

The generated documentation commit remains visible in the pull request and normal Git history. Branch protection still applies to pushes made through the Claude GitHub App.
