import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
  const storedUser = localStorage.getItem("user");
  const user = ref(storedUser ? JSON.parse(storedUser) : null);

  const isAuthenticated = computed(() => !!user.value);

  function login(userData) {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    user.value = null;
    localStorage.removeItem("user");
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
});
