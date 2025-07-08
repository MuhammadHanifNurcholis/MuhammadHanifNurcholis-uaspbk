import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useMovieStore } from "../../src/stores/movieStore";
import axios from "axios";

// Mock axios
vi.mock("axios");

describe("Movie Store", () => {
  beforeEach(() => {
    // 🔧 Aktifkan Pinia sebelum tiap test
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it("handles fetch error", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    const store = useMovieStore();
    await store.fetchMovies();

    expect(store.movies).toEqual([]); // Movies harus kosong
    expect(store.error).toBe("Network Error"); // Error harus tertangkap
  });
});
