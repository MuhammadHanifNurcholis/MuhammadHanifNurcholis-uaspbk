import { setActivePinia, createPinia } from "pinia";
import { useCartStore } from "@/stores/cartStore";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("cartStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should add movie to watchlist", async () => {
    const store = useCartStore();
    const mockMovie = { id: 1, title: "Test Movie" };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMovie),
      })
    );

    await store.addToWatchlist(mockMovie);

    expect(store.watchlist).toContainEqual(mockMovie);
    expect(localStorage.getItem("watchlist")).toBe(JSON.stringify([mockMovie]));
  });

  it("should handle API error when loading watchlist", async () => {
    const store = useCartStore();

    global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

    localStorage.setItem(
      "watchlist",
      JSON.stringify([{ id: 1, title: "Local Movie" }])
    );

    await store.loadWatchlist();

    expect(store.watchlist).toEqual([{ id: 1, title: "Local Movie" }]);
  });
});
