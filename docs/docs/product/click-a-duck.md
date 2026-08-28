---
sidebar_position: 2
title: How to play
description: Score duck and swan clicks, climb the ranks, and handle a growing flock.
---

# How to play

Click-a-Duck starts with three birds crossing the pond. Click any moving bird to score. That bird leaves and a replacement immediately joins from a random side.

Most birds are ducks, worth one point. About one in ten is a swan, worth five.

The game has no timer, lives, or final score. Your only opponent is the flock.

## Controls

- Click a duck for one point, or a swan for five.
- Choose Pause to freeze every bird and stop new arrivals from joining.
- Choose Resume to continue from the same score and pond.
- Choose Reset to return to zero points, three birds, and active play.

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

The game begins with room for four active birds. Every five points opens one more place until the pond reaches its twelve-bird limit.

New birds arrive every 1.5 seconds at zero points. The wait drops by 25 milliseconds for each point and stops shrinking at half a second. Clicking a bird always replaces it immediately, even when the pond has reached its current limit.

| Score | Largest flock | Time between automatic arrivals |
| ---: | ---: | ---: |
| 0 | 4 birds | 1.5 seconds |
| 5 | 5 birds | 1.375 seconds |
| 20 | 8 birds | 1 second |
| 40 and above | 12 birds | 0.5 seconds |

Birds cross from either side at different heights, sizes, speeds, and angles. A bird that reaches the other edge remains part of the flock and loops through its animation until you click it.
