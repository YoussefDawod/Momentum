import { describe, it, expect } from "vitest";
import {
  formatTime,
  formatDuration,
  formatDate,
  formatClock,
} from "../utils/formatters";

describe("formatTime", () => {
  it("pads minutes and seconds", () => {
    expect(formatTime(0)).toBe("00:00");
    expect(formatTime(5)).toBe("00:05");
    expect(formatTime(65)).toBe("01:05");
    expect(formatTime(1500)).toBe("25:00");
  });

  it("clamps negative values to zero", () => {
    expect(formatTime(-10)).toBe("00:00");
  });

  it("floors fractional seconds", () => {
    expect(formatTime(59.9)).toBe("00:59");
  });
});

describe("formatDuration", () => {
  it("handles zero / invalid input", () => {
    expect(formatDuration(0)).toBe("0 min");
    expect(formatDuration(null)).toBe("0 min");
    expect(formatDuration(undefined)).toBe("0 min");
  });

  it("formats minutes under an hour", () => {
    expect(formatDuration(45)).toBe("45 min");
  });

  it("formats whole hours", () => {
    expect(formatDuration(120)).toBe("2 Std");
  });

  it("formats hours and minutes", () => {
    expect(formatDuration(135)).toBe("2 Std 15 min");
  });
});

describe("formatDate / formatClock", () => {
  it("renders a German date", () => {
    const iso = "2026-01-15T10:30:00.000Z";
    const result = formatDate(iso);
    expect(result).toMatch(/2026/);
    expect(result).toMatch(/Jan/i);
  });

  it("renders a two-digit time", () => {
    const iso = "2026-01-15T08:05:00.000Z";
    const result = formatClock(iso);
    // Format is HH:MM — regardless of local tz it has the expected shape.
    expect(result).toMatch(/^\d{2}:\d{2}$/);
  });
});
