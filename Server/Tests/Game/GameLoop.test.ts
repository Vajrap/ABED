process.env.GAME_EPOCH_UTC = "2025-01-01T00:00:00.000Z";
process.env.GAME_MS_PER_PHASE = "1000";

const createNewsDistribution = () => ({
  worldScope: [] as any[],
  regionScope: new Map<string, any>(),
  subRegionScope: new Map<string, any>(),
  locationScope: new Map<string, any>(),
  partyScope: new Map<string, any>(),
  privateScope: new Map<string, any>(),
});

jest.mock("../../src/config/gameLoop", () => ({
  getGameLoopMode: jest.fn(() => "test"),
  getGameEpoch: jest.fn(() => new Date("2025-01-01T00:00:00.000Z")),
  getMsPerPhase: jest.fn(() => 1000),
}));

jest.mock("../../src/Entity/Location/Manager/LocationManager", () => ({
  locationManager: {
    processEncounters: jest.fn(async () => createNewsDistribution()),
    processActions: jest.fn(async () => createNewsDistribution()),
  },
}));

jest.mock("../../src/Game/TravelManager", () => ({
  travelManager: {
    allTravel: jest.fn(async () => createNewsDistribution()),
  },
}));

jest.mock("../../src/Entity/News/Postman", () => ({
  postman: {
    deliver: jest.fn(),
  },
}));

jest.mock("../../src/Entity/News/NewsArchive", () => ({
  newsArchiveService: {
    dailySpread: jest.fn(),
    dailyDecay: jest.fn(),
    saveToDatabase: jest.fn(),
  },
}));

jest.mock("../../src/Event/subRegionWeather.ts", () => ({
  drawSubRegionsWeatherCard: jest.fn(() => []),
}));

jest.mock("../../src/Event/drawGlobalEventCard.ts", () => ({
  drawGlobalEventCard: jest.fn(() => undefined),
}));

jest.mock("../../src/Event/drawRegionEventCard.ts", () => ({
  drawRegionEventCard: jest.fn(() => null),
}));

const persistLastProcessedPhaseMock = jest.fn(async () => {});
const persistGameStateSnapshotMock = jest.fn(async () => {});

jest.mock("../../src/Database/gameStateStore", () => ({
  persistLastProcessedPhase: persistLastProcessedPhaseMock,
  persistGameStateSnapshot: persistGameStateSnapshotMock,
}));

const saveDailyStateMock = jest.fn(async () => {});

jest.mock("../../src/Database/persistence", () => ({
  saveDailyState: saveDailyStateMock,
}));

import { runGameLoop, getGameLoopMetrics } from "../../src/Game/GameLoop";
import { GameTime } from "../../src/Game/GameTime/GameTime";
import { gameState } from "../../src/Game/GameState";
import { persistLastProcessedPhase } from "../../src/Database/gameStateStore";
import { saveDailyState } from "../../src/Database/persistence";
import { locationManager } from "../../src/Entity/Location/Manager/LocationManager";

describe("GameLoop", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    GameTime.setLastProcessedPhaseIndex(0);
    (gameState as any).lastProcessedPhaseIndex = 0;
  });

  it("replays missed phases and triggers daily persistence when hour is 1", async () => {
    const epoch = new Date("2025-01-01T00:00:00.000Z");
    const msPerPhase = 1000;

    GameTime.setLastProcessedPhaseIndex(6);
    (gameState as any).lastProcessedPhaseIndex = 6;

    const now = new Date(epoch.getTime() + 8 * msPerPhase);

    await runGameLoop({ now });

    const persistMock = persistLastProcessedPhase as jest.Mock;
    expect(persistMock).toHaveBeenCalledTimes(2);
    expect(persistMock.mock.calls[0][0]).toBe(7);
    expect(persistMock.mock.calls[1][0]).toBe(8);

    const saveDailyMock = saveDailyState as jest.Mock;
    expect(saveDailyMock).toHaveBeenCalledTimes(1);
  });

  it("tracks consecutive failures and resets after a success", async () => {
    const epoch = new Date("2025-01-01T00:00:00.000Z");
    const msPerPhase = 1000;
    GameTime.setLastProcessedPhaseIndex(0);
    (gameState as any).lastProcessedPhaseIndex = 0;

    const failure = new Error("encounter failure");
    (locationManager.processEncounters as jest.Mock).mockImplementationOnce(
      async () => {
        throw failure;
      },
    );

    await expect(
      runGameLoop({ now: new Date(epoch.getTime() + 1 * msPerPhase), label: "test-failure" }),
    ).rejects.toThrow(failure);

    const metricsAfterFailure = getGameLoopMetrics();
    expect(metricsAfterFailure.consecutiveFailedRuns).toBe(1);
    expect(metricsAfterFailure.lastError?.message).toBe("encounter failure");

    (locationManager.processEncounters as jest.Mock).mockResolvedValue(
      createNewsDistribution(),
    );

    await runGameLoop({
      now: new Date(epoch.getTime() + 2 * msPerPhase),
      label: "test-success",
    });

    const metricsAfterSuccess = getGameLoopMetrics();
    expect(metricsAfterSuccess.consecutiveFailedRuns).toBe(0);
    expect(metricsAfterSuccess.lastError).toBeNull();
  });
});

