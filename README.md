# Ajax Delivery WhatsApp Bot 🚀

Bot WhatsApp otomatis untuk layanan pesan antar makanan (Ajax Deliver) di daerah Sumedang. 
Bot ini dirancang menggunakan Node.js dan library [Baileys](https://github.com/WhiskeySockets/Baileys).

## Fitur Saat Ini
- ✅ **Koneksi QR Code**: Login yang mudah dengan scan barcode.
- ✅ **Auto-Reconnect**: Otomatis mencoba terhubung ulang jika koneksi terputus.
- ✅ **OOP Structure**: Kode rapi dan modular berbasis *Object-Oriented Programming*.
- ✅ **Balasan Otomatis (Checkout)**: Merespon format pesanan pelanggan dengan pesan konfirmasi dan link grup driver.
- ✅ **Ping Command**: Membalas perintah `!ping` untuk mengecek status aktif bot.

## Instalasi Lokal (Development)
1. Buka terminal di folder proyek ini.
2. Jalankan perintah: `npm install`
3. Nyalakan bot dengan: `npm run start:bot`
4. Buka terminal agak lebar, scan QR Code yang muncul menggunakan WhatsApp di HP.

## Deployment (Railway)
Bot ini dioptimalkan untuk di-deploy ke [Railway.app](https://railway.app/). 
**PENTING**: Anda wajib menggunakan fitur **Volume** di Railway (dengan Mount Path: `/app/auth_info_baileys`) agar sesi login tidak hilang saat server di-restart.
