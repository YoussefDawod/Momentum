/**
 * Momentum — streak utilities
 *
 * A "streak day" is a calendar day (local time) on which at least one session
 * was completed. The current streak is the number of consecutive calendar days
 * ending with today (or yesterday, if no session was completed today yet).
 */

const toDayKey = (timestamp) => {
  const d = new Date(timestamp);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

const addDays = (date, days) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

/**
 * @param {Array<{completedAt: number|string}>} sessions
 * @returns {{ current: number, longest: number, activeDays: number }}
 */
export const calculateStreak = (sessions) => {
  if (!Array.isArray(sessions) || sessions.length === 0) {
    return { current: 0, longest: 0, activeDays: 0 };
  }

  const days = new Set(
    sessions
      .map((s) => s.completedAt ?? s.date)
      .filter((t) => t !== undefined && t !== null)
      .map(toDayKey)
  );

  if (days.size === 0) {
    return { current: 0, longest: 0, activeDays: 0 };
  }

  // Current streak: walk back from today until a gap is found.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let current = 0;
  let cursor = today;
  if (!days.has(toDayKey(cursor))) {
    // If today has no session, start counting from yesterday instead.
    cursor = addDays(cursor, -1);
  }
  while (days.has(toDayKey(cursor))) {
    current += 1;
    cursor = addDays(cursor, -1);
  }

  // Longest streak: scan sorted unique day list.
  const sorted = Array.from(days)
    .map((key) => new Date(key))
    .sort((a, b) => a - b);

  let longest = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i += 1) {
    const diff = Math.round((sorted[i] - sorted[i - 1]) / 86_400_000);
    if (diff === 1) {
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 1;
    }
  }

  return {
    current,
    longest: Math.max(longest, current),
    activeDays: days.size,
  };
};
