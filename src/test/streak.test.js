import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { calculateStreak } from "../utils/streak";

const ONE_DAY = 86_400_000;

const mkSession = (dateOrMs) => ({
  completedAt: dateOrMs instanceof Date ? dateOrMs.getTime() : dateOrMs,
});

describe("calculateStreak", () => {
  beforeEach(() => {
    // Freeze "today" at a fixed wall-clock moment to make assertions deterministic.
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-19T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns zeros for empty input", () => {
    expect(calculateStreak([])).toEqual({ current: 0, longest: 0, activeDays: 0 });
    expect(calculateStreak(null)).toEqual({ current: 0, longest: 0, activeDays: 0 });
  });

  it("counts a single day as streak of 1 when today has a session", () => {
    const today = new Date("2026-04-19T10:00:00");
    const result = calculateStreak([mkSession(today)]);
    expect(result.current).toBe(1);
    expect(result.longest).toBe(1);
    expect(result.activeDays).toBe(1);
  });

  it("counts yesterday as current streak when today has nothing", () => {
    const yesterday = new Date("2026-04-18T10:00:00");
    const result = calculateStreak([mkSession(yesterday)]);
    expect(result.current).toBe(1);
  });

  it("breaks the streak when there is a gap before today", () => {
    const twoDaysAgo = new Date("2026-04-17T10:00:00");
    const result = calculateStreak([mkSession(twoDaysAgo)]);
    expect(result.current).toBe(0);
  });

  it("counts consecutive days ending today", () => {
    const today = new Date("2026-04-19T10:00:00");
    const sessions = [
      mkSession(today),
      mkSession(new Date(today.getTime() - ONE_DAY)),
      mkSession(new Date(today.getTime() - 2 * ONE_DAY)),
    ];
    expect(calculateStreak(sessions).current).toBe(3);
  });

  it("deduplicates multiple sessions on the same day", () => {
    const today = new Date("2026-04-19T09:00:00");
    const later = new Date("2026-04-19T15:00:00");
    const result = calculateStreak([mkSession(today), mkSession(later)]);
    expect(result.activeDays).toBe(1);
    expect(result.current).toBe(1);
  });

  it("computes the longest historical streak independent of current", () => {
    const base = new Date("2026-01-01T12:00:00").getTime();
    const sessions = [
      mkSession(base),
      mkSession(base + ONE_DAY),
      mkSession(base + 2 * ONE_DAY),
      mkSession(base + 3 * ONE_DAY),
      // gap
      mkSession(base + 10 * ONE_DAY),
    ];
    const result = calculateStreak(sessions);
    expect(result.longest).toBe(4);
    expect(result.current).toBe(0);
  });

  it("falls back to the `date` field when `completedAt` is missing", () => {
    const today = new Date("2026-04-19T10:00:00");
    const result = calculateStreak([{ date: today.toISOString() }]);
    expect(result.current).toBe(1);
  });
});
