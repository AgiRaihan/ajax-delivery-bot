# Setup Bot WhatsApp 24/7

## Persyaratan
- Node.js v14+
- PM2 (installed globally atau via npm)
- Koneksi internet stabil

## Instalasi & Setup

### 1. Install Dependensi
```bash
npm install
npm install -g pm2
```

### 2. Run Bot dengan PM2 (Recommended untuk 24/7)
```bash
pm2 start ecosystem.config.js
```

### 3. Verifikasi Bot Berjalan
```bash
pm2 status
pm2 logs ajax-whatsapp-bot
```

### 4. Setup Autostart saat Reboot Server
```bash
pm2 startup
pm2 save
```

## Perintah Penting

### Start Bot
```bash
npm run dev:bot
# atau
pm2 start bot.js --name ajax-bot
```

### Stop Bot
```bash
npm run stop:bot
# atau
pm2 stop ajax-bot
```

### Restart Bot
```bash
npm run restart:bot
# atau
pm2 restart ajax-bot
```

### Lihat Logs
```bash
npm run logs:bot
# atau
pm2 logs ajax-whatsapp-bot
```

### Delete Bot dari PM2
```bash
pm2 delete ajax-whatsapp-bot
```

## Fitur 24/7

- ✅ Auto restart saat crash
- ✅ Memory limit monitoring (500MB max)
- ✅ Log file terpisah untuk error dan output
- ✅ Watch mode untuk development
- ✅ Graceful shutdown (5 detik timeout)

## Deployment ke Server (VPS/Cloud)

1. Upload project ke server
2. Install Node.js dan PM2
3. Run: `pm2 start ecosystem.config.js`
4. Setup cron untuk backup: `pm2 save && pm2 startup`

## Troubleshooting

- Bot tidak muncul QR? Cek `pm2 logs ajax-whatsapp-bot`
- Bot crash? Check memory usage: `pm2 monit`
- Restart terus menerus? Naikkan `min_uptime` di ecosystem.config.js
