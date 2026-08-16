# 🛵 Ajax Delivery WhatsApp Bot

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📖 Tentang Proyek (About)
**Ajax Delivery Bot** adalah asisten WhatsApp otomatis yang dirancang khusus untuk menangani layanan pesan antar makanan (Delivery) di daerah Sumedang. Bot ini bertugas layaknya *Customer Service* yang beroperasi 24 jam non-stop untuk menerima pesanan, memberikan daftar menu, dan meneruskan pesanan ke grup *driver* secara sistematis.

## 🚀 Informasi Rilis (Release Info)
- **Author / Creator:** Reno Hidayat (Agi Raihan)
- **Version:** 1.1.0 (Stable Release)
- **Release Date:** Agustus 2026
- **License:** MIT License
- **Repository:** [https://github.com/Renohidayat/ajax-delivery-bot](https://github.com/Renohidayat/ajax-delivery-bot)

## ✨ Fitur-Fitur (Features)
- 🟢 **24/7 Cloud Ready:** Siap dijalankan di server awan (Railway/VPS) tanpa takut putus koneksi.
- 📱 **Pairing Code / QR Code:** Mendukung metode login modern menggunakan Pairing Code (8 digit) yang aman untuk server *headless*.
- 🌐 **Web Dashboard:** Dilengkapi dengan *Mini Website* untuk memantau status bot dan men-scan QR Code langsung dari browser.
- 🛒 **Auto-Checkout:** Merespon otomatis setiap pelanggan yang mengirim format pesanan.
- 🛡️ **Anti-Ban Architecture:** Menggunakan profil identitas *browser* standar Linux (Ubuntu) agar tidak diblokir oleh WhatsApp.
- 🔄 **Auto-Recovery:** Mampu memulihkan diri secara otomatis dari *error* atau file memori yang korup (*corrupt*).

### 🚧 Fitur Mendatang (Roadmap)
- [ ] Teruskan Pesanan ke Grup Driver secara otomatis.
- [ ] Simpan data rekapan pesanan ke Database Firebase.
- [ ] Balasan *Customer Service* yang menyapa dengan menyebut nama pelanggan.
- [ ] Katalog Menu Makanan interaktif via WhatsApp.

## 🛠️ Teknologi yang Digunakan (Tech Stack)
- **Bahasa Pemrograman:** Javascript (Node.js)
- **WhatsApp Library:** [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) (Multi-Device)
- **Arsitektur:** Object-Oriented Programming (OOP)
- **Deployment Platform:** [Railway.app](https://railway.app/)

## ⚙️ Panduan Instalasi (Installation)

### 1. Menjalankan di Komputer Sendiri (Lokal)
1. *Clone* atau unduh repository ini.
2. Buka folder proyek di terminal, lalu ketikkan: `npm install`
3. Nyalakan bot dengan perintah: `npm start`
4. Buka browser dan akses `http://localhost:3000` untuk melihat QR Code, atau masukkan *Pairing Code* yang muncul di terminal ke aplikasi WhatsApp Anda.

### 2. Mengudara di Cloud Server (Railway.app)
1. Buat project baru di Railway dan pilih opsi **Deploy from GitHub**.
2. Hubungkan dengan repository `ajax-delivery-bot` ini.
3. **SANGAT PENTING**: Buka pengaturan layanan di Railway, cari menu **Volumes**, dan buat volume baru dengan *Mount Path*: `/app/auth_info_baileys`. (Ini wajib agar bot tidak minta *login* terus tiap kali server *restart*).
4. Aktifkan **Public Networking** (*Generate Domain*) untuk mendapatkan link Website Dashboard bot Anda.
5. Kunjungi link website tersebut, lalu scan QR Code-nya atau gunakan *Pairing Code* dari menu log terminal Railway.
