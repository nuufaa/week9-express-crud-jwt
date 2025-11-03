# week9-express-crud-jwt
---
## Identitas
- **Nama**: Fitri Nufa dastana
- **NIM**: F1D02310052
---

## Deskripsi Singkat
Tugas ini adalah latihan penerapan autentikasi dengan JWT (JSON Web Token) menggunakan Express.js dan MySQL mata kuliah Pemrograman Web Lanjut. Fungsi utamanya adalah untuk melakukan registrasi user, login user, serta mengakses route yang dilindungi hanya jika memiliki token JWT yang valid.

## Tujuan Tugas
- Menerapkan autentikasi menggunakan JWT di aplikasi backend.
- Menggunakan bcrypt untuk mengamankan password user.
- Mengelola database user dengan MySQL.
- Membuat sistem login yang aman dan terstruktur menggunakan Express.js.

## Langkah Pengerjaan
1. Membuat folder proyek dengan nama 'week9-express-crud-jwt' dengan perintah
```
mkdir week9-express-crud-jwt
cd week9-express-crud-jwt
```

2. Inisialisasi npm:
```
npm init -y
```

3. Install dependency:

```
npm install jsonwebtoken bcrypt
```

5. Buat file .env berisi konfigurasi database dan secret key JWT:
```
PORT = 4000
DB_HOST = localhost
DB_USER = root
DB_PASSWORD =
DB_NAME = week6-express-db

JWT_SECRET=default_secret
```

6. Buat database MySQL dengan script pada seed.sql:
```
```CREATE DATABASE week6-express-crud;
USE week6-express-crud;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(110) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
);
```

7. Implementasikan koneksi database pada file src/config/db.js menggunakan mysql2 dan dotenv.
8. Buat controller authController.js untuk menangani register dan login user.
9. Tambahkan middleware authMiddleware.js untuk memverifikasi token JWT.
10. Buat route authRoutes.js untuk endpoint register & login.
11. Jalankan server menggunakan perintah:
```npm run dev```

## Database
Tabel: users
- id INT AUTO_INCREMENT PRIMARY KEY
- username VARCHAR(50)
- password VARCHAR(50)

## Penjelasan Bagian-Bagian Utama
Berikut adalah penjelasan singkat untuk setiap file berdasarkan struktur proyek:
1. src/config/db.js
Menghubungkan aplikasi ke database MySQL menggunakan konfigurasi dari .env.

2. src/controllers/authController.js
    a. register: Menyimpan user baru dengan password terenkripsi (bcrypt).
    b. login: Memverifikasi username dan password lalu mengembalikan token JWT.

3. src/middleware/authMiddleware.js
Memeriksa apakah request memiliki header Authorization dengan token JWT yang valid. Jika valid, user dapat mengakses route selanjutnya.

4. src/routes/authRoutes.js
Menyediakan endpoint:
    a. POST /auth/register --> Registrasi user baru
    b. POST /auth/login --> Login user

5. src/app.js
File utama server yang mengatur middleware global, menghubungkan semua route, serta menjalankan server pada port yang ditentukan.

## Hasil Uji API dengan Postman

1. Register User
Endpoint: POST http://localhost:4000/auth/register
Screenshot:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1765c186-af4e-4b92-b8c6-06ef3edcae5b" />


2. Login User
Endpoint: POST http://localhost:4000/auth/login
Screenshot:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b426e39a-f6a3-4721-8f01-735435fc6fc0" />


3. Akses Profil 
Endpoint: GET http://localhost:4000/pasien
Screenshot jika tidak memasukkan token:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c945a3d1-a62a-4be7-bbd9-517f1831ef71" />

Screenshot jika memasukkan token:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/85a4ce23-d467-4f66-b2b3-ebd2b453e685" />


## Kesimpulan
Program ini sudah berhasil menerapkan sistem autentikasi JWT (JSON Web Token) menggunakan Node.js, Express, dan MySQL. User bisa melakukan registrasi, login, serta mengakses route yang dilindungi dengan token yang valid. Fitur hashing password dengan bcrypt dan penggunaan dotenv untuk menyimpan konfigurasi rahasia memastikan sistem lebih aman.
