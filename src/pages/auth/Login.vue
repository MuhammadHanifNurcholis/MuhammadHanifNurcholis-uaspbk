<template>
  <div class="login-container">
    <!-- Animated background particles -->
    <div class="particles">
      <div v-for="i in 30" :key="i" class="particle"></div>
    </div>

    <!-- Glowing orb decoration -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>

    <div class="login-card">
      <div class="cinema-header">
        <div class="logo-container">
          <span class="logo">🎬</span>
          <div class="logo-glow"></div>
        </div>
        <h1 class="app-name">CineVerse+</h1>
        <p class="app-tagline">Your Ultimate Cinema Experience</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group floating">
          <input
            v-model="username"
            type="text"
            placeholder=" "
            class="form-input"
            required
          />
          <label>Username</label>
          <div class="input-highlight"></div>
        </div>

        <div class="form-group floating">
          <input
            v-model="password"
            type="password"
            placeholder=" "
            class="form-input"
            required
          />
          <label>Password</label>
          <div class="input-highlight"></div>
        </div>

        <button type="submit" class="login-button">
          <span class="button-text">Sign In</span>
          <div class="button-loader">
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
            <div class="loader-dot"></div>
          </div>
          <div class="button-glow"></div>
        </button>

        <div v-if="errorMessage" class="error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
            />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
      </form>

      <div class="login-footer">
        <p>
          Don't have an account?
          <RouterLink to="/register" class="register-link"
            >Create one</RouterLink
          >
        </p>
        <RouterLink to="/forgot-password" class="forgot-link"
          >Forgot password?</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/userStore";

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const userStore = useUserStore();
const isLoading = ref(false);

function handleLogin() {
  isLoading.value = true;
  errorMessage.value = "";

  setTimeout(() => {
    if (username.value === "admin" && password.value === "admin") {
      userStore.login(username.value);
      router.push("/");
    } else {
      errorMessage.value = "Invalid username or password";
    }
    isLoading.value = false;
  }, 1500);
}
</script>

<style scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  overflow: hidden;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: float-up linear infinite;
}

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

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
  z-index: 0;
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

.login-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 1rem;
  overflow: hidden;
}

.login-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #ff0080, #7928ca, #0070f3);
}

.cinema-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
  text-align: center;
}

.logo-container {
  position: relative;
  margin-bottom: 1rem;
}

.logo {
  font-size: 3.5rem;
  display: inline-block;
  transition: transform 0.3s ease;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 0, 128, 0.4);
  border-radius: 50%;
  filter: blur(20px);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.logo-container:hover .logo {
  transform: scale(1.1);
}

.logo-container:hover .logo-glow {
  opacity: 1;
}

.app-name {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #fff, #c9d6ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 1px;
}

.app-tagline {
  margin: 0.5rem 0 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 300;
}

.login-form {
  display: grid;
  gap: 1.8rem;
}

.form-group {
  position: relative;
}

.form-group.floating label {
  position: absolute;
  top: 18px;
  left: 15px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
  transform-origin: left;
}

.form-group.floating input:focus + label,
.form-group.floating input:not(:placeholder-shown) + label {
  transform: translateY(-28px) scale(0.85);
  color: #fff;
}

.form-input {
  width: 100%;
  padding: 18px 15px 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
}

.input-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff0080, #7928ca);
  transition: width 0.4s ease;
}

.form-input:focus ~ .input-highlight {
  width: 100%;
}

.login-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(90deg, #7928ca, #ff0080);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  overflow: hidden;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(121, 40, 202, 0.3);
}

.button-text {
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.button-loader {
  position: absolute;
  display: flex;
  gap: 6px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.loader-dot {
  width: 8px;
  height: 8px;
  background: white;
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
    transform: translateY(-10px);
  }
}

.button-glow {
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
}

.login-button:hover .button-glow {
  left: 100%;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ff4757;
  font-size: 0.9rem;
  padding: 0.8rem 1rem;
  background: rgba(255, 71, 87, 0.1);
  border-radius: 8px;
  margin-top: 1rem;
  animation: fadeIn 0.3s ease;
}

.error-message svg {
  width: 18px;
  height: 18px;
  fill: #ff4757;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-footer {
  text-align: center;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.register-link {
  color: #c9d6ff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.register-link:hover {
  color: #fff;
  text-decoration: underline;
}

.forgot-link {
  display: block;
  margin-top: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.forgot-link:hover {
  color: #fff;
}

/* Generate particles with random positions and sizes */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: float-up linear infinite;
}

@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }

  .app-name {
    font-size: 1.8rem;
  }

  .logo {
    font-size: 3rem;
  }

  .login-form {
    gap: 1.5rem;
  }
}

/* Generate random particles */
</style>

<script>
// Generate random particles
document.addEventListener("DOMContentLoaded", function () {
  const particlesContainer = document.querySelector(".particles");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random size between 1px and 3px
    const size = Math.random() * 2 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.left = `${Math.random() * 100}%`;

    // Random animation duration between 10s and 20s
    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = `${duration}s`;

    // Random delay
    particle.style.animationDelay = `${Math.random() * 5}s`;

    particlesContainer.appendChild(particle);
  }
});
</script>
