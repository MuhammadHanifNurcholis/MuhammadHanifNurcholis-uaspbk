<template>
  <div class="watchlist-page">
    <!-- Background elements -->
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle"></div>
    </div>

    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div class="loader">
        <div class="loader-dot"></div>
        <div class="loader-dot"></div>
        <div class="loader-dot"></div>
      </div>
      <span>Loading your watchlist...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">⚠️</div>
      <h3>Error Loading Watchlist</h3>
      <p>{{ error }}</p>
      <button @click="loadWatchlist" class="retry-btn">
        <span class="button-icon">🔄</span>
        <span class="button-text">Try Again</span>
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="store.isEmpty" class="empty-state">
      <div class="empty-icon">🎬</div>
      <h3>Your Watchlist is Empty</h3>
      <p>Start adding movies you want to watch later</p>
      <RouterLink to="/movies" class="cta-button">
        <span class="button-icon">🔍</span>
        <span class="button-text">Browse Movies</span>
        <div class="button-glow"></div>
      </RouterLink>
    </div>

    <!-- Watchlist Content -->
    <div v-else class="watchlist-container">
      <div class="watchlist-header">
        <div class="header-content">
          <h1 class="watchlist-title">
            <span class="title-gradient">My Watchlist</span>
            <span class="count-badge">{{ store.totalMovies }}</span>
          </h1>
          <div class="header-actions">
            <RouterLink to="/movies" class="add-more-btn">
              <span class="button-icon">➕</span>
              <span class="button-text">Add More</span>
              <div class="button-glow"></div>
            </RouterLink>
            <button @click="confirmClear" class="clear-btn">
              <span class="button-icon">🗑️</span>
              <span class="button-text">Clear All</span>
              <div class="button-glow"></div>
            </button>
          </div>
        </div>
      </div>

      <div class="movie-grid">
        <div
          v-for="movie in store.watchlist"
          :key="movie.id"
          class="movie-card"
        >
          <div class="card-glow"></div>
          <div class="card-poster">
            <img
              v-if="movie.poster"
              :src="movie.poster"
              :alt="movie.title"
              class="poster-img"
            />
            <div v-else class="poster-placeholder">
              {{ movie.title.charAt(0).toUpperCase() }}
            </div>
            <div class="card-actions">
              <button
                class="delete-btn"
                @click.stop="removeFromWatchlist(movie.id)"
              >
                <span class="button-icon">🗑️</span>
                <span class="button-text">Remove</span>
              </button>
              <RouterLink :to="`/movies/${movie.id}`" class="detail-btn">
                <span class="button-icon">ℹ️</span>
                <span class="button-text">Details</span>
              </RouterLink>
            </div>
          </div>
          <div class="card-details">
            <h3 class="movie-title">{{ movie.title }}</h3>
            <div class="movie-meta">
              <span v-if="movie.year" class="movie-year">
                <span class="meta-icon">📅</span>
                <span class="meta-text">{{ movie.year }}</span>
              </span>
              <span v-if="movie.rating" class="movie-rating">
                <span class="meta-icon">⭐</span>
                <span class="meta-text">{{ movie.rating.toFixed(1) }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { RouterLink } from "vue-router";
import { onMounted } from "vue";

const store = useCartStore();

onMounted(async () => {
  await store.loadWatchlist();
});

const loadWatchlist = () => {
  store.loadWatchlist();
};

const removeFromWatchlist = async (movieId) => {
  if (
    confirm("Are you sure you want to remove this movie from your watchlist?")
  ) {
    await store.removeFromWatchlist(movieId);
  }
};

const confirmClear = () => {
  if (confirm("Are you sure you want to clear your entire watchlist?")) {
    store.clearWatchlist();
  }
};
</script>

<style scoped>
.watchlist-page {
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

/* Loading State */
.loading-state {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  gap: 1.5rem;
}

.loader {
  display: flex;
  gap: 0.8rem;
}

.loader-dot {
  width: 12px;
  height: 12px;
  background: linear-gradient(90deg, #ff0080, #7928ca);
  border-radius: 50%;
  animation: loader-bounce 1.4s infinite ease-in-out;
}

.loader-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.loader-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loader-bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-12px);
  }
}

/* Error State */
.error-state {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid rgba(255, 0, 0, 0.2);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-state h3 {
  color: white;
  margin-bottom: 0.8rem;
  font-size: 1.5rem;
}

.error-state p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.retry-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.8rem 1.8rem;
  background: linear-gradient(90deg, #ff0080, #e11d48);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.retry-btn .button-text {
  position: relative;
  z-index: 2;
}

.retry-btn .button-icon {
  position: relative;
  z-index: 2;
  font-size: 1.2rem;
}

.retry-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(255, 0, 128, 0.3);
}

/* Watchlist Header */
.watchlist-header {
  position: relative;
  z-index: 10;
  margin-bottom: 2.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.watchlist-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;
}

.title-gradient {
  background: linear-gradient(90deg, #fff, #c9d6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1.8rem;
  font-weight: 600;
}

.count-badge {
  background: linear-gradient(90deg, #ff0080, #7928ca);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

/* Common button styles */
.add-more-btn,
.clear-btn,
.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
}

.add-more-btn .button-text,
.clear-btn .button-text,
.cta-button .button-text {
  position: relative;
  z-index: 2;
}

.add-more-btn .button-icon,
.clear-btn .button-icon,
.cta-button .button-icon {
  position: relative;
  z-index: 2;
  font-size: 1.1rem;
}

.add-more-btn .button-glow,
.clear-btn .button-glow,
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

.add-more-btn:hover,
.clear-btn:hover,
.cta-button:hover {
  transform: translateY(-3px);
}

.add-more-btn:hover .button-glow,
.clear-btn:hover .button-glow,
.cta-button:hover .button-glow {
  left: 100%;
}

/* Specific button styles */
.add-more-btn {
  background: linear-gradient(90deg, #0070f3, #7928ca);
  color: white;
}

.clear-btn {
  background: linear-gradient(90deg, #e11d48, #ff0080);
  color: white;
}

.cta-button {
  background: linear-gradient(90deg, #7928ca, #ff0080);
  color: white;
}

/* Movie Grid */
.movie-grid {
  position: relative;
  z-index: 10;
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

.card-poster {
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  overflow: hidden;
}

.poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.movie-card:hover .poster-img {
  transform: scale(1.1);
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

.card-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.movie-card:hover .card-actions {
  opacity: 1;
}

.delete-btn,
.detail-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.delete-btn {
  background: rgba(255, 0, 0, 0.7);
  color: white;
}

.delete-btn:hover {
  background: rgba(255, 0, 0, 0.9);
}

.detail-btn {
  background: rgba(255, 255, 255, 0.9);
  color: #0f0c29;
  text-decoration: none;
}

.detail-btn:hover {
  background: white;
}

.card-details {
  padding: 1.2rem;
}

.movie-title {
  font-size: 1.1rem;
  margin: 0 0 0.8rem 0;
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

.movie-year,
.movie-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.movie-year {
  color: rgba(255, 255, 255, 0.7);
}

.movie-rating {
  color: #ffd700;
  font-weight: 600;
}

.meta-icon {
  font-size: 1rem;
}

/* Empty State */
.empty-state {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin: 2rem auto;
  max-width: 600px;
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .watchlist-page {
    padding: 1.5rem;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }

  .header-actions {
    width: 100%;
  }

  .add-more-btn,
  .clear-btn {
    flex-grow: 1;
    justify-content: center;
  }

  .title-gradient {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
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
