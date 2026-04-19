import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "../hooks/useLocalStorage";

describe("useLocalStorage", () => {
  it("returns the initial value when nothing is stored", () => {
    const { result } = renderHook(() => useLocalStorage("k1", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });

  it("reads previously persisted values", () => {
    window.localStorage.setItem("k2", JSON.stringify({ theme: "dark" }));
    const { result } = renderHook(() => useLocalStorage("k2", null));
    expect(result.current[0]).toEqual({ theme: "dark" });
  });

  it("persists updates to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("k3", 0));
    act(() => result.current[1](42));
    expect(result.current[0]).toBe(42);
    expect(JSON.parse(window.localStorage.getItem("k3"))).toBe(42);
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage("k4", 1));
    act(() => result.current[1]((prev) => prev + 10));
    expect(result.current[0]).toBe(11);
  });

  it("reacts to `storage` events from other tabs", () => {
    const { result } = renderHook(() => useLocalStorage("k5", "a"));
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "k5",
          newValue: JSON.stringify("b"),
        })
      );
    });
    expect(result.current[0]).toBe("b");
  });
});
