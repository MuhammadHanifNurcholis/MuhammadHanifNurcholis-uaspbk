<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMovieStore } from "../../stores/movieStore";
import { useCartStore } from "../../stores/cartStore";

const route = useRoute();
const router = useRouter();
const movieStore = useMovieStore();
const cartStore = useCartStore();

const isEditing = ref(false);
const editedMovie = ref({});

onMounted(() => {
  movieStore.fetchMovieById(route.params.id);
});

const movie = computed(() => movieStore.selectedMovie);

function addToWatchlist() {
  if (!movie.value) return;
  const movieData = { ...movie.value };
  cartStore.addToWatchlist(movieData);
}

function startEditing() {
  editedMovie.value = { ...movie.value }; // Salin semua properti agar tidak ada yang hilang
  isEditing.value = true;
}

function cancelEditing() {
  isEditing.value = false;
}

async function saveChanges() {
  try {
    await movieStore.updateMovie(route.params.id, editedMovie.value);
    isEditing.value = false;
    movieStore.fetchMovieById(route.params.id); // refresh data
  } catch (error) {
    console.error("Gagal menyimpan perubahan:", error);
  }
}

async function deleteMovie() {
  if (confirm("Apakah Anda yakin ingin menghapus movie ini?")) {
    try {
      await movieStore.deleteMovie(route.params.id);
      router.push("/");
    } catch (error) {
      console.error("Gagal menghapus movie:", error);
    }
  }
}
</script>

<template>
  <div class="movie-detail-container" v-if="movie">
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle"></div>
    </div>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <div class="movie-detail-card">
      <div class="card-glow"></div>

      <div class="movie-header">
        <h2 class="movie-title">
          <span v-if="!isEditing" class="title-text">{{ movie.title }}</span>
          <input
            v-else
            v-model="editedMovie.title"
            type="text"
            class="edit-input title-input"
            placeholder="Judul Film"
          />
        </h2>

        <div class="action-buttons" v-if="!isEditing">
          <button class="btn watchlist-btn" @click="addToWatchlist">
            <span class="button-icon">📝</span>
            <span class="button-text">Tambah Watchlist</span>
            <div class="button-glow"></div>
          </button>
          <button class="btn edit-btn" @click="startEditing">
            <span class="button-icon">✏️</span>
            <span class="button-text">Edit</span>
            <div class="button-glow"></div>
          </button>
          <button class="btn delete-btn" @click="deleteMovie">
            <span class="button-icon">🗑️</span>
            <span class="button-text">Hapus</span>
            <div class="button-glow"></div>
          </button>
        </div>
      </div>

      <div class="movie-content">
        <div class="movie-poster-container">
          <div class="movie-poster" v-if="movie.poster">
            <img :src="movie.poster" :alt="movie.title" class="poster-image" />
          </div>
          <div class="movie-poster placeholder" v-else>
            {{ movie.title.charAt(0).toUpperCase() }}
          </div>

          <div class="movie-meta" v-if="!isEditing">
            <div class="meta-item" v-if="movie.year">
              <span class="meta-icon">📅</span>
              <span class="meta-text">{{ movie.year }}</span>
            </div>
            <div class="meta-item" v-if="movie.genre">
              <span class="meta-icon">🎭</span>
              <span class="meta-text">{{ movie.genre }}</span>
            </div>
            <div class="meta-item" v-if="movie.rating">
              <span class="meta-icon">⭐</span>
              <span class="meta-text">{{ movie.rating.toFixed(1) }}</span>
            </div>
          </div>

          <div class="movie-meta" v-else>
            <input
              v-model="editedMovie.poster"
              type="text"
              class="edit-input"
              placeholder="URL Poster"
            />
            <input
              v-model="editedMovie.year"
              type="text"
              class="edit-input"
              placeholder="Tahun Rilis"
            />
            <input
              v-model="editedMovie.genre"
              type="text"
              class="edit-input"
              placeholder="Genre"
            />
            <input
              v-model="editedMovie.rating"
              type="number"
              step="0.1"
              min="0"
              max="10"
              class="edit-input"
              placeholder="Rating"
            />
          </div>
        </div>

        <div class="movie-description-container">
          <h3 class="section-title">Deskripsi Film</h3>
          <div class="movie-description">
            <span v-if="!isEditing">{{ movie.description }}</span>
            <textarea
              v-else
              v-model="editedMovie.description"
              class="edit-textarea"
              placeholder="Deskripsi Film"
              rows="6"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="edit-actions" v-if="isEditing">
        <button class="btn save-btn" @click="saveChanges">
          <span class="button-icon">💾</span>
          <span class="button-text">Simpan</span>
          <div class="button-glow"></div>
        </button>
        <button class="btn cancel-btn" @click="cancelEditing">
          <span class="button-icon">✕</span>
          <span class="button-text">Batal</span>
          <div class="button-glow"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-detail-container {
  position: relative;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  overflow: hidden;
  isolation: isolate;
}

/* Background elements */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float-up linear infinite;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
  z-index: 2;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(180deg, #ff0080, #7928ca);
  top: -100px;
  left: -100px;
  animation: orb-move-1 15s ease infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(180deg, #7928ca, #0070f3);
  bottom: -150px;
  right: -100px;
  animation: orb-move-2 20s ease infinite;
}

/* Main content card */
.movie-detail-card {
  position: relative;
  z-index: 10;
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #ff0080, #7928ca, #0070f3);
}

.movie-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.movie-title {
  font-size: 2.2rem;
  margin: 0;
  color: white;
  font-weight: 700;
}

.title-text {
  background: linear-gradient(90deg, #fff, #c9d6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.movie-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 1.5rem;
}

.movie-poster-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.movie-poster {
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.movie-poster.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.8),
    rgba(30, 41, 59, 0.8)
  );
  color: rgba(255, 255, 255, 0.1);
  font-size: 5rem;
  font-weight: bold;
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movie-meta {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.meta-icon {
  font-size: 1.2rem;
}

.meta-text {
  color: white;
  font-size: 0.95rem;
}

.movie-description-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  color: white;
  font-size: 1.3rem;
  margin: 0;
}

.movie-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  font-size: 1.05rem;
}

/* Buttons */
.action-buttons,
.edit-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
}

.btn .button-text {
  position: relative;
  z-index: 2;
}

.btn .button-icon {
  position: relative;
  z-index: 2;
  font-size: 1.1rem;
}

.btn .button-glow {
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

.btn:hover {
  transform: translateY(-3px);
}

.btn:hover .button-glow {
  left: 100%;
}

.watchlist-btn {
  background: linear-gradient(90deg, #0070f3, #7928ca);
  color: white;
}

.edit-btn {
  background: linear-gradient(90deg, #7928ca, #ff0080);
  color: white;
}

.delete-btn {
  background: linear-gradient(90deg, #ff0080, #e11d48);
  color: white;
}

.save-btn {
  background: linear-gradient(90deg, #00c853, #0070f3);
  color: white;
}

.cancel-btn {
  background: linear-gradient(90deg, #ff3d00, #e11d48);
  color: white;
}

/* Edit inputs */
.edit-input,
.edit-textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.edit-input:focus,
.edit-textarea:focus {
  outline: none;
  border-color: #7928ca;
  background: rgba(255, 255, 255, 0.1);
}

.title-input {
  font-size: 2rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
}

.edit-textarea {
  resize: vertical;
  min-height: 150px;
  font-family: inherit;
}

/* Animations */
@keyframes float-up {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateY(-20vh) scale(1);
    opacity: 0;
  }
}

@keyframes orb-move-1 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(50px, 100px);
  }
}

@keyframes orb-move-2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-100px, -50px);
  }
}

/* Responsive styles */
@media (max-width: 900px) {
  .movie-content {
    grid-template-columns: 1fr;
  }

  .movie-poster {
    max-width: 300px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .movie-detail-container {
    padding: 1.5rem;
  }

  .movie-detail-card {
    padding: 1.8rem;
  }

  .movie-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }

  .action-buttons {
    width: 100%;
    justify-content: center;
  }

  .btn {
    flex-grow: 1;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .movie-title {
    font-size: 1.8rem;
  }

  .title-input {
    font-size: 1.6rem;
  }

  .action-buttons,
  .edit-actions {
    flex-direction: column;
    gap: 0.8rem;
  }

  .btn {
    width: 100%;
  }
}

/* Generate random particles */
</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const particlesContainer = document.querySelector(".particles");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = `${duration}s`;

    particle.style.animationDelay = `${Math.random() * 5}s`;

    particlesContainer.appendChild(particle);
  }
});
</script>
