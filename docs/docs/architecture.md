---
sidebar_position: 1
title: Game architecture
description: How the Blazor page, game rules, and server-side interaction fit together.
---

# Game architecture

Click-a-Duck uses a Blazor Web App on .NET 10 with interactive server rendering. There is no database, API, authentication layer, or client-side state store.

```text
Browser
  │  bird and control clicks over the Blazor connection
  ▼
Home.razor
  ├── random bird kind, position, and CSS movement
  └── current score
  ▼
DuckGameService
  │  deterministic score, rank, flock limit, and spawn delay
  ▼
Rendered pond and scoreboard
```

## Code map

| Path | Responsibility |
| --- | --- |
| `src/ClickADuck/Components/Pages/Home.razor` | Pond state, random bird appearance, spawn loop, pause, reset, and clicks |
| `src/ClickADuck/Services/DuckGameService.cs` | Score increments, ranks, flock limits, and spawn delays |
| `src/ClickADuck/Program.cs` | Service registration and the HTTP pipeline |
| `tests/ClickADuck.Tests/DuckGameServiceTests.cs` | Executable examples for every deterministic game rule |

## Why put game rules in a service?

It gives the example one clear boundary to document and test. The page handles the timer, random placement, and interaction. `DuckGameService` handles score-based rules without depending on Blazor, CSS, or random values.

`Home.razor` starts an asynchronous spawn loop when the component initializes and cancels it on disposal. The loop asks the service how long to wait and how large the flock may become. This keeps timer lifecycle code in the UI while leaving the progression rules easy to test.

## Interaction and state

The page uses interactive server rendering, so clicks travel over the Blazor connection and update component state on the server. The score and active birds live only in the current component. Refreshing or leaving the page starts a new game; there is no saved progress.

Each visible bird has a generated identifier, a kind (duck or swan), and random movement values. Clicking removes the matching identifier, asks `DuckGameService` for the next score based on that kind, and adds a replacement. The service rejects negative scores so its rules never need to define an invalid game state.
