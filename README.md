
# 🎬 StreamFlix+ - Aplikasi Manajemen Film (Vue 3)

**StreamFlix+** adalah aplikasi manajemen film berbasis **Vue 3**. Aplikasi ini menyediakan fitur autentikasi login, penambahan dan penampilan detail film, penyimpanan ke watchlist, hingga pengujian unit. Data film dikelola melalui **JSON Server**, dan state aplikasi dikendalikan menggunakan **Pinia**.

---

## 📚 Studi Kasus

Aplikasi ini memungkinkan pengguna untuk:

* Login ke sistem
* Melihat daftar film yang tersedia
* Menambahkan film baru
* Melihat detail informasi film
* Menyimpan film favorit ke Watchlist
* Menjalankan unit test untuk memastikan fungsionalitas berjalan dengan baik

---

## 🔥 Fitur dan Menu

| Menu          | Fitur                                 |
| ------------- | ------------------------------------- |
| `/login`      | Halaman autentikasi                   |
| `/`           | Halaman beranda setelah login         |
| `/movies`     | Menampilkan daftar film               |
| `/movies/:id` | Melihat detail film                   |
| `/add`        | Menambahkan film baru                 |
| `/watchlist`  | Menampilkan daftar film yang disimpan |

---

## ⚙️ Struktur Routing (`vue-router`)

Aplikasi menggunakan **Vue Router** dengan `createWebHistory()`. Routing telah mencakup halaman dinamis seperti detail film dan proteksi terhadap halaman yang membutuhkan autentikasi.

---

## 💾 Manajemen State (Pinia)

Menggunakan **Pinia** untuk:

* Menyimpan data pengguna (`userStore`)
* Menyimpan daftar film (`movieStore`)
* Menyimpan watchlist pengguna (`watchlistStore`)

Semua state disinkronkan dengan `localStorage` untuk menjaga persistensi data.

---

## 🌐 Backend API dengan JSON Server

Aplikasi menggunakan `json-server` sebagai backend lokal.

### 📡 Contoh Endpoint:

* `GET /movies` – Mendapatkan daftar film
* `GET /movies/:id` – Mendapatkan detail film
* `POST /movies` – Menambahkan film baru
* `PATCH /movies/:id` – Memperbarui film
* `DELETE /movies/:id` – Menghapus film

> Jalankan JSON Server:

```bash
json-server --watch db.json --port 3000
```

---

## 🧪 Unit Testing (Vitest)

Unit test ditulis menggunakan `Vitest` dan `@vue/test-utils`, fokus pada:

* Validasi alur login
* Manipulasi data film di store
* Fungsi penambahan dan penghapusan film dari watchlist

---

## 🗂️ Struktur Direktori

```
src/
├── assets/              # Gambar & ikon
├── components/          # Komponen global (Navbar, dll)
├── layouts/             # Template utama
├── pages/               # Halaman (auth, home, movie)
│   ├── auth/            # Login.vue
│   ├── home/            # Home.vue
│   └── movie/           # List, Add, Detail, Watchlist
├── router/              # Konfigurasi Vue Router
├── stores/              # State management (Pinia)
├── test/unit/           # Unit test
├── App.vue              # Root component
├── main.js              # Entry point
├── style.css            # Global style
└── db.json              # JSON Server
```

---

## 🛠️ Teknologi yang Digunakan

* [Vue 3](https://vuejs.org/)
* [Pinia](https://pinia.vuejs.org/)
* [Vue Router](https://router.vuejs.org/)
* [JSON Server](https://github.com/typicode/json-server)
* [Vitest](https://vitest.dev/)
* CSS modern dengan dekorasi animatif

---

## ▶️ Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/username/streamflix-plus.git
cd streamflix-plus
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan JSON Server

```bash
json-server --watch db.json --port 3000
```

### 4. Jalankan Aplikasi Vue

```bash
npm run dev
```

### 5. Jalankan Unit Test

```bash
npm run test
```

---

## 🔐 Login Default

Gunakan kredensial berikut untuk masuk:

```bash
Username: admin
Password: admin
```