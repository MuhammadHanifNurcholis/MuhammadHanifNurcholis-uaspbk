import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Login from "../pages/auth/Login.vue";
import Home from "../pages/home/Home.vue";
import MovieList from "../pages/movie/MovieList.vue";
import MovieDetail from "../pages/movie/MovieDetail.vue";
import AddMovie from "../pages/movie/AddMovie.vue";
import Watchlist from "../pages/movie/Watchlist.vue";
import { useUserStore } from "../stores/userStore";

const routes = [
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true }, // 💡 Semua halaman di bawah ini butuh login
    children: [
      { path: "", name: "Home", component: Home },
      { path: "movies", name: "MovieList", component: MovieList },
      { path: "movies/add", name: "AddMovie", component: AddMovie },
      { path: "movies/:id", name: "MovieDetail", component: MovieDetail },
      { path: "watchlist", name: "Watchlist", component: Watchlist },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 💡 Global route guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next("/login"); // 🚫 Belum login → redirect ke login
  } else {
    next(); // ✅ Lanjut ke halaman
  }
});

export default router;
