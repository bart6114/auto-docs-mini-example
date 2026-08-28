namespace ClickADuck.Services;

public sealed class DuckGameService
{
    private static readonly DuckRank[] Ranks =
    [
        new(0, "Pond paddler"),
        new(5, "Quack collector"),
        new(15, "Duck magnet"),
        new(30, "Flock star"),
        new(50, "Lord of the wings"),
    ];

    public int CountDuck(int score)
    {
        EnsureValidScore(score);
        return checked(score + 1);
    }

    public DuckRank RankFor(int score)
    {
        EnsureValidScore(score);
        return Ranks.Last(rank => score >= rank.MinimumScore);
    }

    public int FlockLimitFor(int score)
    {
        EnsureValidScore(score);
        return Math.Min(12, 4 + (score / 5));
    }

    public TimeSpan SpawnDelayFor(int score)
    {
        EnsureValidScore(score);
        return TimeSpan.FromMilliseconds(Math.Max(500L, 1_500L - ((long)score * 25L)));
    }

    private static void EnsureValidScore(int score)
    {
        if (score < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(score), "Score cannot be negative.");
        }
    }
}

public sealed record DuckRank(int MinimumScore, string Name);
