using ClickADuck.Services;
using Xunit;

namespace ClickADuck.Tests;

public sealed class DuckGameServiceTests
{
    private readonly DuckGameService service = new();

    [Theory]
    [InlineData(BirdKind.Duck, 1)]
    [InlineData(BirdKind.Swan, 5)]
    public void CountBirdAddsThePointsForTheBird(BirdKind bird, int expectedPoints)
    {
        Assert.Equal(7 + expectedPoints, service.CountBird(7, bird));
    }

    [Fact]
    public void CountBirdRejectsUnknownBirdKinds()
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => service.CountBird(0, (BirdKind)999));
    }

    [Theory]
    [InlineData(0, "Pond paddler")]
    [InlineData(5, "Quack collector")]
    [InlineData(15, "Duck magnet")]
    [InlineData(30, "Flock star")]
    [InlineData(50, "Lord of the wings")]
    [InlineData(500, "Lord of the wings")]
    public void RankForReturnsTheHighestEarnedRank(int score, string expectedName)
    {
        Assert.Equal(expectedName, service.RankFor(score).Name);
    }

    [Theory]
    [InlineData(0, 4)]
    [InlineData(5, 5)]
    [InlineData(40, 12)]
    [InlineData(500, 12)]
    public void FlockLimitGrowsWithTheScoreAndStopsAtTwelve(int score, int expectedLimit)
    {
        Assert.Equal(expectedLimit, service.FlockLimitFor(score));
    }

    [Theory]
    [InlineData(0, 1500)]
    [InlineData(20, 1000)]
    [InlineData(40, 500)]
    [InlineData(500, 500)]
    [InlineData(int.MaxValue, 500)]
    public void SpawnDelayGetsShorterAndStopsAtHalfASecond(int score, int expectedMilliseconds)
    {
        Assert.Equal(expectedMilliseconds, service.SpawnDelayFor(score).TotalMilliseconds);
    }

    [Theory]
    [InlineData(nameof(DuckGameService.CountBird))]
    [InlineData(nameof(DuckGameService.RankFor))]
    [InlineData(nameof(DuckGameService.FlockLimitFor))]
    [InlineData(nameof(DuckGameService.SpawnDelayFor))]
    public void GameRulesRejectNegativeScores(string rule)
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => rule switch
        {
            nameof(DuckGameService.CountBird) => service.CountBird(-1, BirdKind.Duck),
            nameof(DuckGameService.RankFor) => service.RankFor(-1).MinimumScore,
            nameof(DuckGameService.FlockLimitFor) => service.FlockLimitFor(-1),
            _ => (int)service.SpawnDelayFor(-1).TotalMilliseconds,
        });
    }
}
