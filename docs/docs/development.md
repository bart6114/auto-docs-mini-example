---
sidebar_position: 2
title: Run Click-a-Duck locally
description: Prerequisites and commands for the game, tests, and handbook.
---

# Run Click-a-Duck locally

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js 20 or newer](https://nodejs.org/)

## Run the Blazor app

From the repository root:

```bash
dotnet restore
dotnet run --project src/ClickADuck
```

Open the URL printed in the terminal. The checked-in launch profile uses the
`Development` environment so local builds serve the app's CSS and Blazor
runtime assets correctly.

## Run the tests

```bash
dotnet test ClickADuck.sln
```

## Run the handbook

```bash
cd docs
npm ci
npm start
```

Docusaurus opens a local development server and reloads pages as you edit them.

## Run the same checks as CI

```bash
dotnet test ClickADuck.sln --configuration Release
npm --prefix docs ci
npm --prefix docs run typecheck
npm --prefix docs run build
```

The production documentation build checks links, compiles every page, and writes `llms.txt`, `llms-full.txt`, and per-page Markdown into `docs/build`. The local development server doesn't generate those files. Run the production build before pushing changes to navigation, cross-references, or machine-readable output.
