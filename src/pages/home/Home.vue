<template>
  <div class="cinema-hero">
    <!-- Particle background -->
    <div class="particles">
      <div v-for="i in 30" :key="i" class="particle"></div>
    </div>

    <!-- Glowing orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <div class="hero-content">
      <!-- Modern glass card -->
      <div class="hero-card">
        <div class="card-glow"></div>

        <h1 class="hero-title">
          <span class="title-gradient">Welcome to</span>
          <span class="app-name">StreamFlix<span class="plus">+</span></span>
        </h1>

        <p class="hero-subtitle">
          Discover & manage your ultimate movie collection
        </p>

        <div class="hero-buttons">
          <RouterLink to="/movies" class="cta-button">
            <span class="button-icon">🎬</span>
            <span class="button-text">Explore Movies</span>
            <div class="button-glow"></div>
          </RouterLink>

          <RouterLink to="/movies/add" class="cta-button secondary">
            <span class="button-icon">➕</span>
            <span class="button-text">Add New</span>
            <div class="button-glow"></div>
          </RouterLink>
        </div>
      </div>

      <!-- Floating movie elements -->
      <div class="floating-elements">
        <div class="film-card"></div>
        <div class="film-card"></div>
        <div class="film-card"></div>
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

<script setup></script>

<style scoped>
.cinema-hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: white;
  overflow: hidden;
  padding: 4rem 0;
  isolation: isolate;
}

/* Particles background */
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
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  animation: float-up linear infinite;
}

/* Glowing orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
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

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 900px;
  padding: 0 2rem;
}

.hero-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 24px;
  padding: 3rem;
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

.hero-title {
  display: flex;
  flex-direction: column;
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.title-gradient {
  background: linear-gradient(90deg, #fff, #c9d6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.app-name {
  background: linear-gradient(90deg, #ff0080, #7928ca);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
}

.plus {
  color: #ff0080;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
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

.cta-button .button-text {
  position: relative;
  z-index: 2;
}

.cta-button .button-icon {
  position: relative;
  z-index: 2;
  font-size: 1.3rem;
  transition: transform 0.3s ease;
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

.cta-button:hover .button-icon {
  transform: scale(1.2);
}

.cta-button.secondary {
  background: transparent;
  border: 2px solid #7928ca;
  box-shadow: none;
}

.cta-button.secondary:hover {
  background: rgba(121, 40, 202, 0.1);
}

/* Floating movie cards */
.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 5;
}

.film-card {
  position: absolute;
  width: 120px;
  height: 180px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  animation: float 12s infinite ease-in-out;
}

.film-card:nth-child(1) {
  top: 15%;
  left: 10%;
  animation-delay: 0s;
  background: linear-gradient(
    45deg,
    rgba(255, 0, 128, 0.1),
    rgba(121, 40, 202, 0.1)
  );
}

.film-card:nth-child(2) {
  top: 60%;
  left: 80%;
  animation-delay: 3s;
  background: linear-gradient(
    45deg,
    rgba(121, 40, 202, 0.1),
    rgba(0, 112, 243, 0.1)
  );
}

.film-card:nth-child(3) {
  top: 30%;
  left: 70%;
  animation-delay: 6s;
  background: linear-gradient(
    45deg,
    rgba(0, 112, 243, 0.1),
    rgba(255, 0, 128, 0.1)
  );
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

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(5deg);
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

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .title-gradient {
    font-size: 1.4rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .hero-card {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }

  .film-card {
    width: 80px;
    height: 120px;
  }
}

/* Generate random particles */
</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const particlesContainer = document.querySelector(".particles");
  const particleCount = 30;

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
