<template>
  <nav class="cinema-nav">
    <div class="nav-container">
      <div class="brand">
        <span class="logo">🎬</span>
        <span class="brand-name">StreamFlix</span>
        <span class="brand-plus">+</span>
      </div>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link" exact>
          <span class="link-icon">🏠</span>
          <span class="link-text">Home</span>
        </RouterLink>
        <RouterLink to="/movies" class="nav-link">
          <span class="link-icon">🎥</span>
          <span class="link-text">Movies</span>
        </RouterLink>
        <RouterLink to="/movies/add" class="nav-link">
          <span class="link-icon">➕</span>
          <span class="link-text">Add</span>
        </RouterLink>
        <RouterLink to="/watchlist" class="nav-link">
          <span class="link-icon">📝</span>
          <span class="link-text">Watchlist</span>
        </RouterLink>
        <RouterLink to="/login" class="nav-link logout">
          <span class="link-icon">🚪</span>
          <span class="link-text">Logout</span>
        </RouterLink>
      </div>
    </div>
    <div class="nav-light-effect"></div>
  </nav>
</template>

<script setup></script>

<style scoped>
.cinema-nav {
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 100%);
  color: white;
  padding: 0;
  margin-bottom: 2rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  position: relative;
  z-index: 2;
}

.brand {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.logo {
  margin-right: 0.5rem;
  font-size: 1.8rem;
  animation: flicker 3s infinite alternate;
}

.brand-name {
  background: linear-gradient(90deg, #ff0080, #7928ca);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.brand-plus {
  color: #ff0080;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: white;
  transform: translateY(-2px);
}

.nav-link:hover .link-icon {
  transform: scale(1.2);
}

.link-icon {
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.link-text {
  position: relative;
}

/* Garis bawah animasi hanya saat aktif */
.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff0080, #7928ca);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.router-link-exact-active::after {
  width: 100%;
}

.nav-link.router-link-exact-active {
  color: white;
  font-weight: 600;
}

.logout {
  margin-left: 1rem;
  padding-left: 1.5rem;
  position: relative;
}

.logout::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 60%;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.nav-light-effect {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(121, 40, 202, 0.5) 20%,
    rgba(255, 0, 128, 0.8) 50%,
    rgba(121, 40, 202, 0.5) 80%,
    transparent 100%
  );
  box-shadow: 0 0 10px rgba(255, 0, 128, 0.5);
  animation: lightSweep 8s infinite linear;
}

@keyframes flicker {
  0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    opacity: 1;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }
  20%,
  22%,
  24%,
  55% {
    opacity: 0.6;
    text-shadow: none;
  }
}

@keyframes lightSweep {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    padding: 1rem;
  }

  .brand {
    margin-bottom: 1rem;
  }

  .nav-links {
    width: 100%;
    justify-content: space-around;
    gap: 0.5rem;
  }

  .link-text {
    display: none;
  }

  .logout::before {
    display: none;
  }
}
</style>
