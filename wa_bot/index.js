const WhatsAppBot = require('./WhatsAppBot');
const http = require('http');

global.qrDataUrl = null;
global.botStatus = 'Menunggu status...';

class BotApplication {
    static start() {
        console.log('\n================================================');
        console.log('🚀 Ajax Delivery WhatsApp Bot (OOP Version)');
        console.log('Versi 1.1.0');
        console.log('Dimulai:', new Date().toLocaleString());
        console.log('================================================\n');

        const port = process.env.PORT || 3000;
        http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            
            let content = `
                <html>
                <head>
                    <title>Ajax Delivery Bot Dashboard</title>
                    <style>
                        body { font-family: sans-serif; text-align: center; margin-top: 50px; background: #f0f2f5; }
                        .card { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: inline-block; }
                        h1 { color: #25D366; }
                        img { margin-top: 20px; border: 5px solid #25D366; border-radius: 10px; }
                        .status { margin-top: 20px; font-size: 1.2em; font-weight: bold; color: #333; }
                        .refresh { margin-top: 20px; color: #777; font-size: 0.9em; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h1>Ajax Delivery Bot</h1>
                        <div class="status">Status: ${global.botStatus}</div>
                        ${global.qrDataUrl ? `<img src="${global.qrDataUrl}" alt="QR Code" />` : ''}
                        ${global.qrDataUrl ? `<div class="refresh">Halaman ini akan refresh otomatis setiap 5 detik.</div>` : ''}
                    </div>
                    <script>
                        if ('${global.botStatus}' !== 'Terkoneksi!') {
                            setTimeout(() => location.reload(), 5000);
                        }
                    </script>
                </body>
                </html>
            `;
            res.end(content);
        }).listen(port, () => {
            console.log(`🌐 Web Dashboard aktif di port ${port}`);
        });

        const bot = new WhatsAppBot();
        
        this.setupShutdownHooks();

        bot.connect().catch(err => {
            console.error('Fatal error:', err);
            process.exit(1);
        });
    }

    static setupShutdownHooks() {
        const shutdownHandler = (signal) => {
            console.log(`\n\n📴 Menerima sinyal ${signal}...`);
            console.log('Menyimpan data dan menutup koneksi...');
            process.exit(0);
        };
        process.on('SIGINT', () => shutdownHandler('shutdown'));
        process.on('SIGTERM', () => shutdownHandler('terminate'));
    }
}

BotApplication.start();
