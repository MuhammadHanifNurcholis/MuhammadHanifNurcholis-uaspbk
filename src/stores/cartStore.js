import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cartStore", () => {
  const API_URL = "https://686c963814219674dcc86c57.mockapi.io/watchlist";
  const watchlist = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Helper function
  const saveToLocalStorage = () => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist.value));
  };

  // Load initial data
  const loadWatchlist = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(API_URL);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      watchlist.value = await response.json();
    } catch (err) {
      error.value = err.message;
      console.error("Error loading watchlist:", err);
      // Fallback to localStorage
      const localData = localStorage.getItem("watchlist");
      if (localData) watchlist.value = JSON.parse(localData);
    } finally {
      isLoading.value = false;
    }
  };

  // Add to watchlist
  const addToWatchlist = async (movie) => {
    if (!movie.id) movie.id = Date.now(); // Ensure ID exists
    if (watchlist.value.some((item) => item.id === movie.id)) {
      alert("Movie already in watchlist!");
      return false;
    }

    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok)
        throw new Error(`Failed to add movie. Status: ${response.status}`);

      const addedMovie = await response.json();
      watchlist.value.push(addedMovie);
      saveToLocalStorage();
      return true;
    } catch (err) {
      error.value = err.message;
      console.error("Error adding to watchlist:", err);
      // Fallback
      watchlist.value.push(movie);
      saveToLocalStorage();
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // Remove from watchlist
  const removeFromWatchlist = async (movieId) => {
    isLoading.value = true;
    error.value = null;
    try {
      // Delete from server
      const response = await fetch(`${API_URL}/${movieId}`, {
        method: "DELETE",
      });

      if (!response.ok)
        throw new Error(`Failed to delete. Status: ${response.status}`);

      // Update local state
      watchlist.value = watchlist.value.filter((movie) => movie.id !== movieId);
      saveToLocalStorage();
      return true;
    } catch (err) {
      error.value = err.message;
      console.error("Error removing from watchlist:", err);
      // Fallback
      watchlist.value = watchlist.value.filter((movie) => movie.id !== movieId);
      saveToLocalStorage();
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // Clear entire watchlist
  const clearWatchlist = async () => {
    isLoading.value = true;
    try {
      // Delete all items one by one (json-server limitation)
      await Promise.all(
        watchlist.value.map((movie) =>
          fetch(`${API_URL}/${movie.id}`, {
            method: "DELETE",
          })
        )
      );
      watchlist.value = [];
      localStorage.removeItem("watchlist");
    } catch (err) {
      console.error("Error clearing watchlist:", err);
      watchlist.value = [];
      localStorage.removeItem("watchlist");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    watchlist,
    isLoading,
    error,
    loadWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    clearWatchlist,
  };
});
