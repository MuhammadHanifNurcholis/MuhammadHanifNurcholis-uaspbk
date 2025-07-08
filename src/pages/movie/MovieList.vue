<template>
  <div class="movie-list-container">
    <!-- Background elements -->
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle"></div>
    </div>

    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <!-- Main content -->
    <div class="movie-list-content">
      <div class="movie-list-header">
        <h2 class="section-title">
          <span class="title-gradient">Film Collection</span>
          <span class="app-name">StreamFlix<span class="plus">+</span></span>
        </h2>

        <RouterLink to="/movies/add" class="add-movie-button">
          <span class="button-icon">➕</span>
          <span class="button-text">Tambah Film</span>
          <div class="button-glow"></div>
        </RouterLink>
      </div>

      <div class="movie-grid">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
          <div class="card-glow"></div>

          <RouterLink :to="`/movies/${movie.id}`" class="movie-link">
            <div class="movie-poster">
              <!-- Placeholder for movie poster image -->
              <div class="poster-placeholder" v-if="!movie.poster">
                {{ movie.title.charAt(0).toUpperCase() }}
              </div>
              <img
                v-else
                :src="movie.poster"
                :alt="movie.title"
                class="poster-image"
              />

              <!-- Rating badge -->
              <div class="rating-badge" v-if="movie.rating">
                ⭐ {{ movie.rating.toFixed(1) }}
              </div>

              <!-- Hover overlay -->
              <div class="poster-overlay">
                <span class="view-details">View Details</span>
              </div>
            </div>

            <div class="movie-info">
              <h3 class="movie-title">{{ movie.title }}</h3>
              <div class="movie-meta">
                <span class="movie-year" v-if="movie.year">{{
                  movie.year
                }}</span>
                <span class="movie-genre" v-if="movie.genre">{{
                  movie.genre
                }}</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Empty state -->
      <div class="empty-state" v-if="movies.length === 0">
        <div class="empty-icon">🎬</div>
        <h3>Belum Ada Film</h3>
        <p>Tambahkan film pertama Anda untuk memulai koleksi</p>
        <RouterLink to="/movies/add" class="cta-button">
          <span class="button-icon">➕</span>
          <span class="button-text">Tambah Film</span>
          <div class="button-glow"></div>
        </RouterLink>
      </div>
    </div>

    <!-- Scrolling film strip -->
    <div class="film-strip">
      <div class="film-frames">
        <div v-for="i in 12" :key="i" class="film-frame"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useMovieStore } from "../../stores/movieStore";

const store = useMovieStore();
const movies = store.movies;

onMounted(() => {
  store.fetchMovies();
});
</script>

<style scoped>
.movie-list-container {
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

.movie-list-content {
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
}

/* Header styles */
.movie-list-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.section-title {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin: 0;
}

.title-gradient {
  background: linear-gradient(90deg, #fff, #c9d6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1.4rem;
  font-weight: 600;
}

.app-name {
  background: linear-gradient(90deg, #ff0080, #7928ca);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1;
}

.plus {
  color: #ff0080;
}

/* Add movie button */
.add-movie-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.9rem 1.8rem;
  background: linear-gradient(90deg, #7928ca, #ff0080);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
}

.add-movie-button .button-text {
  position: relative;
  z-index: 2;
}

.add-movie-button .button-icon {
  position: relative;
  z-index: 2;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.add-movie-button .button-glow {
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

.add-movie-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(121, 40, 202, 0.4);
}

.add-movie-button:hover .button-glow {
  left: 100%;
}

.add-movie-button:hover .button-icon {
  transform: scale(1.2);
}

/* Movie grid */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.8rem;
}

.movie-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 3;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #ff0080, #7928ca, #0070f3);
}

.movie-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.movie-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* Movie poster */
.movie-poster {
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  overflow: hidden;
}

.poster-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.8),
    rgba(30, 41, 59, 0.8)
  );
}

.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.movie-card:hover .poster-image {
  transform: scale(1.1);
}

.poster-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-card:hover .poster-overlay {
  opacity: 1;
}

.view-details {
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border: 2px solid white;
  border-radius: 50px;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.movie-card:hover .view-details {
  transform: translateY(0);
}

.rating-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: #ffd700;
  padding: 0.3rem 0.7rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  z-index: 2;
}

/* Movie info */
.movie-info {
  padding: 1.2rem;
}

.movie-title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
}

.movie-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.movie-year {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.movie-genre {
  font-size: 0.8rem;
  color: #ff0080;
  margin: 0;
  font-weight: 600;
  background: rgba(255, 0, 128, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin-top: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.8;
  display: inline-block;
  animation: pulse 2s infinite ease-in-out;
}

.empty-state h3 {
  color: white;
  margin-bottom: 0.8rem;
  font-size: 1.5rem;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.9rem 2rem;
  background: linear-gradient(90deg, #7928ca, #ff0080);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
}

.cta-button .button-text {
  position: relative;
  z-index: 2;
}

.cta-button .button-glow {
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

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(121, 40, 202, 0.4);
}

.cta-button:hover .button-glow {
  left: 100%;
}

/* Film strip */
.film-strip {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #0f0c29;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;
  overflow: hidden;
}

.film-frames {
  display: flex;
  height: 100%;
  animation: scroll-film 30s linear infinite;
}

.film-frame {
  flex: 0 0 80px;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.film-frame::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 2px;
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

@keyframes scroll-film {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Responsive styles */
@media (max-width: 1024px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
}

@media (max-width: 768px) {
  .movie-list-container {
    padding: 1.5rem;
  }

  .movie-list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .section-title {
    gap: 0.2rem;
  }

  .title-gradient {
    font-size: 1.2rem;
  }

  .app-name {
    font-size: 1.8rem;
  }

  .add-movie-button {
    width: 100%;
    justify-content: center;
  }

  .movie-grid {
    gap: 1.2rem;
  }
}

@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }

  .empty-state {
    padding: 2.5rem 1.5rem;
  }

  .empty-icon {
    font-size: 3rem;
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
