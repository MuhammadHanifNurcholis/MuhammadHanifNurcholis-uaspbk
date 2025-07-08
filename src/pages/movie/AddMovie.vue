<template>
  <div class="movie-form-container">
    <!-- Background elements -->
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle"></div>
    </div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <!-- Main form card -->
    <div class="movie-form-card">
      <div class="card-glow"></div>

      <h2 class="form-title">
        <span class="title-icon">🎬</span>
        <span class="title-text">Tambah Film Baru</span>
      </h2>

      <form @submit.prevent="submitMovie" class="movie-form">
        <!-- Judul -->
        <div class="form-group floating">
          <input
            id="title"
            v-model="title"
            type="text"
            class="form-input"
            placeholder=" "
            required
          />
          <label for="title">Judul Film</label>
        </div>

        <!-- Deskripsi -->
        <div class="form-group floating">
          <textarea
            id="description"
            v-model="description"
            class="form-textarea"
            placeholder=" "
            rows="3"
            required
          ></textarea>
          <label for="description">Deskripsi</label>
        </div>

        <!-- Tahun, Genre, Rating -->
        <div class="form-row-3">
          <div class="form-group floating">
            <input
              id="year"
              v-model="year"
              type="number"
              class="form-input"
              placeholder=" "
              min="1900"
              :max="new Date().getFullYear()"
            />
            <label for="year">Tahun Rilis</label>
          </div>

          <div class="form-group floating">
            <select id="genre" v-model="genre" class="form-select" required>
              <option value="" disabled selected>Pilih genre</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
            </select>
            <label for="genre">Genre</label>
          </div>

          <div class="form-group floating">
            <input
              id="rating"
              v-model="rating"
              type="number"
              class="form-input"
              placeholder=" "
              min="1"
              max="10"
              step="0.1"
              required
            />
            <label for="rating">Rating (1–10)</label>
          </div>
        </div>

        <!-- Poster -->
        <div class="form-group floating">
          <input
            id="poster"
            v-model="poster"
            type="url"
            class="form-input"
            placeholder=" "
          />
          <label for="poster">Poster URL</label>
        </div>

        <!-- Tombol -->
        <div class="form-actions">
          <button
            type="button"
            class="cancel-button"
            @click="router.push('/movies')"
          >
            <span class="button-icon">✕</span>
            <span class="button-text">Batal</span>
          </button>
          <button type="submit" class="submit-button">
            <span class="button-icon">🎬</span>
            <span class="button-text">Simpan Film</span>
            <div class="button-glow"></div>
          </button>
        </div>
      </form>
    </div>

    <!-- Floating film cards -->
    <div class="floating-film-cards">
      <div class="film-card"></div>
      <div class="film-card"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMovieStore } from "@/stores/movieStore";

const router = useRouter();
const store = useMovieStore();

const title = ref("");
const description = ref("");
const year = ref("");
const genre = ref("");
const rating = ref("");
const poster = ref("");

async function submitMovie() {
  if (title.value && description.value && genre.value && rating.value) {
    const newMovie = {
      title: title.value,
      description: description.value,
      year: year.value || undefined,
      genre: genre.value,
      rating: rating.value,
      poster: poster.value || undefined,
    };

    try {
      await store.createMovie(newMovie);
      router.push("/movies");
    } catch (error) {
      console.error("Gagal menambahkan film:", error);
      alert("Gagal menyimpan film. Silakan coba lagi.");
    }
  } else {
    alert("Mohon lengkapi semua data yang wajib diisi.");
  }
}
</script>

<style scoped>
/* --- Container & Card --- */
.movie-form-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  overflow: hidden;
}

.movie-form-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 700px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, #ff0080, #7928ca, #0070f3);
}

/* --- Title --- */
.form-title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: white;
}

.title-text {
  background: linear-gradient(90deg, #fff, #c9d6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* --- Form --- */
.movie-form {
  display: grid;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  position: relative;
}

.floating label {
  position: absolute;
  top: 18px;
  left: 15px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
  transform-origin: left;
}

/* ✅ Trigger floating label */
.floating input:focus + label,
.floating input:not(:placeholder-shown) + label,
.floating textarea:focus + label,
.floating textarea:not(:placeholder-shown) + label,
.floating select:focus + label,
.floating select:valid + label,
.floating select:not([value=""]) + label {
  transform: translateY(-28px) scale(0.85);
  color: #fff;
}

/* --- Input Styles --- */
.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 18px 15px 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg fill='white' viewBox='0 0 16 16'%3E%3Cpath d='M1.5 5.5l6.5 6.5 6.5-6.5H1.5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
}

.form-select option {
  background-color: #1e1e2f;
  color: white;
}

/* --- Buttons --- */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.submit-button,
.cancel-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button {
  background: linear-gradient(90deg, #7928ca, #ff0080);
  color: white;
  border: none;
  position: relative;
  overflow: hidden;
}

.submit-button .button-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.1)
  );
  top: 0;
  left: -100%;
  transition: all 0.7s ease;
  z-index: 1;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(121, 40, 202, 0.3);
}

.submit-button:hover .button-glow {
  left: 100%;
}

.cancel-button {
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cancel-button:hover {
  color: white;
  border-color: rgba(255, 255, 255, 0.4);
}
.form-row-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .form-row-3 {
    grid-template-columns: 1fr;
  }
}
</style>
