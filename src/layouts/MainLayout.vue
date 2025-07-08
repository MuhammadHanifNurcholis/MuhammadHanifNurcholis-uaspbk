<template>
  <div>
    <Navbar />
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
</script>
