import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useTimer } from "../hooks/useTimer";
import { STATUS, PHASE } from "../utils/constants";

const baseConfig = {
  workMinutes: 1,
  breakMinutes: 1,
  cycles: 2,
};

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-19T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initialises in IDLE with configured work seconds", () => {
    const { result } = renderHook(() => useTimer(baseConfig));
    expect(result.current.status).toBe(STATUS.IDLE);
    expect(result.current.timeLeft).toBe(60);
    expect(result.current.totalCycles).toBe(2);
  });

  it("transitions to RUNNING / WORK on start", () => {
    const { result } = renderHook(() => useTimer(baseConfig));
    act(() => result.current.start());
    expect(result.current.status).toBe(STATUS.RUNNING);
    expect(result.current.phase).toBe(PHASE.WORK);
  });

  it("counts down based on wall-clock time", () => {
    const { result } = renderHook(() => useTimer(baseConfig));
    act(() => result.current.start());

    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(result.current.timeLeft).toBe(50);

    act(() => {
      vi.advanceTimersByTime(30_000);
    });
    expect(result.current.timeLeft).toBe(20);
  });

  it("fires onPhaseChange and advances WORK → BREAK", () => {
    const onPhaseChange = vi.fn();
    const { result } = renderHook(() =>
      useTimer({ ...baseConfig, onPhaseChange })
    );
    act(() => result.current.start());

    // Advance past the work phase (1min + buffer).
    act(() => {
      vi.advanceTimersByTime(61_000);
    });

    expect(onPhaseChange).toHaveBeenCalledTimes(1);
    expect(onPhaseChange).toHaveBeenCalledWith(
      expect.objectContaining({ finishedPhase: PHASE.WORK, finishedCycle: 0 })
    );
    expect(result.current.phase).toBe(PHASE.BREAK);
    expect(result.current.timeLeft).toBe(60);
  });

  it("completes after all cycles and fires onComplete once", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useTimer({ ...baseConfig, onComplete })
    );
    act(() => result.current.start());

    // 2 cycles × (60s work + 60s break) = 240s. Advance in 1-second steps so
    // React can flush the ADVANCE_PHASE effect between each phase boundary.
    for (let i = 0; i < 260; i += 1) {
      act(() => {
        vi.advanceTimersByTime(1_000);
      });
    }

    expect(result.current.status).toBe(STATUS.COMPLETED);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("pause freezes timeLeft and resume continues", () => {
    const { result } = renderHook(() => useTimer(baseConfig));
    act(() => result.current.start());

    act(() => {
      vi.advanceTimersByTime(15_000);
    });
    const leftBeforePause = result.current.timeLeft;

    act(() => result.current.pause());
    expect(result.current.status).toBe(STATUS.PAUSED);

    // Time passes, but paused timer must not advance.
    act(() => {
      vi.advanceTimersByTime(30_000);
    });
    expect(result.current.timeLeft).toBe(leftBeforePause);

    act(() => result.current.resume());
    act(() => {
      vi.advanceTimersByTime(5_000);
    });
    expect(result.current.timeLeft).toBe(leftBeforePause - 5);
  });

  it("reset returns the timer to a fresh IDLE state", () => {
    const { result } = renderHook(() => useTimer(baseConfig));
    act(() => result.current.start());
    act(() => {
      vi.advanceTimersByTime(20_000);
    });
    act(() => result.current.reset());
    expect(result.current.status).toBe(STATUS.IDLE);
    expect(result.current.timeLeft).toBe(60);
    expect(result.current.cycle).toBe(0);
  });

  it("exposes a monotonically increasing progress value", () => {
    const { result } = renderHook(() => useTimer(baseConfig));
    act(() => result.current.start());

    expect(result.current.progress).toBeCloseTo(0, 2);
    act(() => {
      vi.advanceTimersByTime(30_000);
    });
    expect(result.current.progress).toBeGreaterThan(0.4);
    expect(result.current.progress).toBeLessThan(0.6);
  });
});
