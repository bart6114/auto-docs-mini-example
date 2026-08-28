---
sidebar_position: 2
title: How to play
description: Score duck clicks, climb the ranks, and handle a growing flock.
---

# How to play

Click-a-Duck starts with three ducks crossing the pond. Click any moving duck to add one point. That duck leaves and a replacement immediately joins from a random side.

The game has no timer, lives, or final score. Your only opponent is the flock.

## Controls

- Click a duck to score one point.
- Choose Pause to freeze every duck and stop new ducks from joining.
- Choose Resume to continue from the same score and pond.
- Choose Reset to return to zero points, three ducks, and active play.

## Ranks

The scoreboard shows the highest rank earned at the current score.

| Score | Rank |
| ---: | --- |
| 0 | Pond paddler |
| 5 | Quack collector |
| 15 | Duck magnet |
| 30 | Flock star |
| 50 | Lord of the wings |

Your rank does not change after 50 points, but the score keeps rising.

## How the flock grows

The game begins with room for four active ducks. Every five points opens one more place until the pond reaches its twelve-duck limit.

New ducks arrive every 1.5 seconds at zero points. The wait drops by 25 milliseconds for each point and stops shrinking at half a second. Clicking a duck always replaces it immediately, even when the pond has reached its current limit.

| Score | Largest flock | Time between automatic arrivals |
| ---: | ---: | ---: |
| 0 | 4 ducks | 1.5 seconds |
| 5 | 5 ducks | 1.375 seconds |
| 20 | 8 ducks | 1 second |
| 40 and above | 12 ducks | 0.5 seconds |

Ducks cross from either side at different heights, sizes, speeds, and angles. A duck that reaches the other edge remains part of the flock and loops through its animation until you click it.
