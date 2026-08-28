---
name: autodoc
description: Review a Click-a-Duck pull request for documentation drift, update product or contributor documentation when facts changed, and validate the handbook before committing fixes.
allowed-tools: Read Grep Glob Edit Write Skill Bash(git diff *) Bash(git log *) Bash(git status *) Bash(git add *) Bash(git commit *) Bash(git push *) Bash(npm --prefix docs *)
---

# Keep the documentation true

Invoke `/docs-humanizer` before writing, then follow its product-first voice rules throughout the review.

Read `CLAUDE.md` and `AGENTS.md`, then review the complete pull-request diff against its base branch. In GitHub Actions, use the base and head named in the prompt and inspect both of these before deciding that no documentation changed:

```bash
git diff --stat origin/<base-branch>...HEAD
git diff origin/<base-branch>...HEAD --
```

Do not use an empty working-tree `git diff` as the pull-request diff. Use the path map in `AGENTS.md` to find pages that may be stale, but let the changed code, tests, configuration, and workflows determine what is true.

The GitHub workflow fetches `origin/<base-branch>` before invoking this skill. Do not run `git fetch` or ask for permission to fetch.

Change documentation only when the pull request changes a reader-visible behavior, architecture boundary, prerequisite, command, configuration value, automation step, or ownership rule. A refactor that preserves those facts needs no documentation edit.

You may edit only `README.md`, `docs/docs/**`, and `docs/src/pages/**`. Do not change application code, tests, workflow files, agent instructions, skills, or Docusaurus configuration. Update an existing page instead of creating a near-duplicate.

Keep the handbook's information hierarchy intact:

- `docs/src/pages/index.tsx`, `docs/docs/intro.md`, and `docs/docs/product/**` are for people using Click-a-Duck. Do not frame the game as a documentation demo on those pages.
- `docs/docs/architecture.md` and `docs/docs/development.md` are for contributors building the game.
- `docs/docs/documentation-automation.md` and the root `README.md` may explain repository automation and publishing.

Apply `/docs-humanizer` to every prose edit. Preserve the page's audience and move misplaced details to an existing page when needed.

If you changed documentation, run these commands from the repository root:

```bash
npm --prefix docs ci
npm --prefix docs run typecheck
npm --prefix docs run build
```

Fix documentation failures before finishing. Commit only the validated reader-documentation changes to the existing pull-request branch and never force-push. If the documentation is already accurate, leave the branch unchanged.
