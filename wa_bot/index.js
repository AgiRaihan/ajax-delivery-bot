const WhatsAppBot = require('./WhatsAppBot');
const http = require('http');

class BotApplication {
    static start() {
        console.log('\n================================================');
        console.log('🚀 Ajax Delivery WhatsApp Bot (OOP Version)');
        console.log('Versi 1.1.0');
        console.log('Dimulai:', new Date().toLocaleString());
        console.log('================================================\n');

        const port = process.env.PORT || 3000;
        http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Ajax Delivery Bot is active!');
        }).listen(port, () => {
            console.log(`🌐 Web server aktif di port ${port} (untuk Railway Healthcheck)`);
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
