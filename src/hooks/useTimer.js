import { useCallback, useEffect, useReducer, useRef } from "react";
import { PHASE, STATUS } from "../utils/constants";

/**
 * Timer engine based on wall-clock time (drift-free).
 *
 * State shape:
 *   status: idle | running | paused | completed
 *   phase: work | break | idle
 *   cycle: current cycle index (0-based)
 *   totalCycles: how many cycles in this method
 *   workSeconds / breakSeconds: phase durations
 *   phaseEndsAt: timestamp (ms) when current phase ends
 *   pausedRemaining: seconds remaining at pause time
 *   timeLeft: live countdown seconds
 */

const initialState = {
  status: STATUS.IDLE,
  phase: PHASE.IDLE,
  cycle: 0,
  totalCycles: 4,
  workSeconds: 25 * 60,
  breakSeconds: 5 * 60,
  phaseEndsAt: null,
  pausedRemaining: null,
  timeLeft: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CONFIGURE": {
      // Only allow config changes while idle or completed.
      if (state.status === STATUS.RUNNING || state.status === STATUS.PAUSED) {
        return state;
      }
      const { workMinutes, breakMinutes, cycles } = action.payload;
      return {
        ...initialState,
        workSeconds: workMinutes * 60,
        breakSeconds: breakMinutes * 60,
        totalCycles: cycles,
        timeLeft: workMinutes * 60,
      };
    }
    case "START": {
      const now = action.payload.now;
      return {
        ...state,
        status: STATUS.RUNNING,
        phase: PHASE.WORK,
        cycle: 0,
        phaseEndsAt: now + state.workSeconds * 1000,
        pausedRemaining: null,
        timeLeft: state.workSeconds,
      };
    }
    case "PAUSE": {
      if (state.status !== STATUS.RUNNING) return state;
      return {
        ...state,
        status: STATUS.PAUSED,
        pausedRemaining: state.timeLeft,
        phaseEndsAt: null,
      };
    }
    case "RESUME": {
      if (state.status !== STATUS.PAUSED) return state;
      const now = action.payload.now;
      return {
        ...state,
        status: STATUS.RUNNING,
        phaseEndsAt: now + state.pausedRemaining * 1000,
        pausedRemaining: null,
      };
    }
    case "RESET": {
      return {
        ...initialState,
        workSeconds: state.workSeconds,
        breakSeconds: state.breakSeconds,
        totalCycles: state.totalCycles,
        timeLeft: state.workSeconds,
      };
    }
    case "TICK": {
      if (state.status !== STATUS.RUNNING || !state.phaseEndsAt) return state;
      const secondsLeft = Math.max(
        0,
        Math.ceil((state.phaseEndsAt - action.payload.now) / 1000)
      );
      if (secondsLeft === state.timeLeft) return state;
      return { ...state, timeLeft: secondsLeft };
    }
    case "ADVANCE_PHASE": {
      const now = action.payload.now;
      if (state.phase === PHASE.WORK) {
        return {
          ...state,
          phase: PHASE.BREAK,
          phaseEndsAt: now + state.breakSeconds * 1000,
          timeLeft: state.breakSeconds,
        };
      }
      // Finishing a break means one cycle completed.
      const nextCycle = state.cycle + 1;
      if (nextCycle >= state.totalCycles) {
        return {
          ...state,
          status: STATUS.COMPLETED,
          phase: PHASE.IDLE,
          cycle: nextCycle,
          phaseEndsAt: null,
          timeLeft: 0,
        };
      }
      return {
        ...state,
        phase: PHASE.WORK,
        cycle: nextCycle,
        phaseEndsAt: now + state.workSeconds * 1000,
        timeLeft: state.workSeconds,
      };
    }
    default:
      return state;
  }
};

export const useTimer = ({ workMinutes, breakMinutes, cycles, onPhaseChange, onComplete }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => ({
    ...init,
    workSeconds: workMinutes * 60,
    breakSeconds: breakMinutes * 60,
    totalCycles: cycles,
    timeLeft: workMinutes * 60,
  }));

  const intervalRef = useRef(null);
  const onPhaseChangeRef = useRef(onPhaseChange);
  const onCompleteRef = useRef(onComplete);
  onPhaseChangeRef.current = onPhaseChange;
  onCompleteRef.current = onComplete;

  // Re-configure when method/custom values change (only allowed when idle).
  useEffect(() => {
    dispatch({
      type: "CONFIGURE",
      payload: { workMinutes, breakMinutes, cycles },
    });
  }, [workMinutes, breakMinutes, cycles]);

  // Tick loop.
  useEffect(() => {
    if (state.status !== STATUS.RUNNING) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return undefined;
    }
    intervalRef.current = setInterval(() => {
      dispatch({ type: "TICK", payload: { now: Date.now() } });
    }, 250);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.status]);

  // Handle phase boundary.
  useEffect(() => {
    if (state.status !== STATUS.RUNNING || state.timeLeft > 0) return;
    if (!state.phaseEndsAt) return;
    const finishedPhase = state.phase;
    const finishedCycle = state.cycle;
    dispatch({ type: "ADVANCE_PHASE", payload: { now: Date.now() } });
    onPhaseChangeRef.current?.({
      finishedPhase,
      finishedCycle,
    });
  }, [state.status, state.timeLeft, state.phaseEndsAt, state.phase, state.cycle]);

  // Fire completion callback once when entering COMPLETED state.
  const completedFiredRef = useRef(false);
  useEffect(() => {
    if (state.status === STATUS.COMPLETED && !completedFiredRef.current) {
      completedFiredRef.current = true;
      onCompleteRef.current?.({
        totalCycles: state.totalCycles,
        workSeconds: state.workSeconds,
        breakSeconds: state.breakSeconds,
      });
    }
    if (state.status === STATUS.IDLE || state.status === STATUS.RUNNING) {
      completedFiredRef.current = false;
    }
  }, [state.status, state.totalCycles, state.workSeconds, state.breakSeconds]);

  const start = useCallback(() => {
    dispatch({ type: "START", payload: { now: Date.now() } });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: "PAUSE" });
  }, []);

  const resume = useCallback(() => {
    dispatch({ type: "RESUME", payload: { now: Date.now() } });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const currentPhaseSeconds =
    state.phase === PHASE.WORK ? state.workSeconds : state.breakSeconds;
  const progress =
    currentPhaseSeconds > 0
      ? Math.max(0, Math.min(1, 1 - state.timeLeft / currentPhaseSeconds))
      : 0;

  return {
    ...state,
    progress,
    start,
    pause,
    resume,
    reset,
  };
};
