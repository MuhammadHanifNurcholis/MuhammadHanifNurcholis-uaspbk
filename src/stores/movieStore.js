// src/stores/movieStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    movies: [],
    selectedMovie: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchMovies() {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await axios.get(
          "https://686c963814219674dcc86c57.mockapi.io/movies"
        );
        this.movies = res.data;
        return res.data;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err.message ||
          "Failed to fetch movies";
        this.error = message;
        this.movies = []; // Tambahan: reset data jika gagal
        return [];
      } finally {
        this.isLoading = false;
      }
    },

    async fetchMovieById(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await axios.get(
          `https://686c963814219674dcc86c57.mockapi.io/movies/${id}`
        );
        this.selectedMovie = res.data;
        return res.data;
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err.message ||
          "Failed to fetch movie";
        this.error = message;
        this.selectedMovie = null;
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    async createMovie(movieData) {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await axios.post(
          "https://686c963814219674dcc86c57.mockapi.io/movies",
          movieData
        );
        this.movies.push(res.data);
        return res.data;
      } catch (err) {
        this.error =
          err?.response?.data?.message ||
          err.message ||
          "Failed to create movie";
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    async updateMovie(id, updateData) {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await axios.put(
          `https://686c963814219674dcc86c57.mockapi.io/movies/${id}`,
          updateData
        );

        const index = this.movies.findIndex((movie) => movie.id === id);
        if (index !== -1) this.movies[index] = res.data;

        if (this.selectedMovie?.id === id) this.selectedMovie = res.data;

        return res.data;
      } catch (err) {
        this.error =
          err?.response?.data?.message ||
          err.message ||
          "Failed to update movie";
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteMovie(id) {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.delete(
          `https://686c963814219674dcc86c57.mockapi.io/movies/${id}`
        );

        this.movies = this.movies.filter((movie) => movie.id !== id);
        if (this.selectedMovie?.id === id) this.selectedMovie = null;

        return true;
      } catch (err) {
        this.error =
          err?.response?.data?.message ||
          err.message ||
          "Failed to delete movie";
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    clearSelectedMovie() {
      this.selectedMovie = null;
    },
  },

  getters: {
    getMovieById: (state) => (id) => {
      return state.movies.find((movie) => movie.id === id);
    },
    popularMovies: (state) => {
      return [...state.movies]
        .filter((movie) => movie.rating !== undefined)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
    },
    latestMovies: (state) => {
      return [...state.movies]
        .filter((movie) => movie.releaseDate)
        .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        .slice(0, 5);
    },
  },
});
