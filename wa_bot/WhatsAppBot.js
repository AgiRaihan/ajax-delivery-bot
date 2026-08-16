const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const Config = require('./Config');
const MessageHandler = require('./MessageHandler');
const qrcode = require('qrcode');

class WhatsAppBot {
    constructor() {
        this.reconnectAttempts = 0;
        this.sock = null;
        this.setupLogs();
    }

    setupLogs() {
        if (!fs.existsSync(Config.logsDir)) {
            fs.mkdirSync(Config.logsDir, { recursive: true });
        }
    }

    async connect() {
        try {
            const { state, saveCreds } = await useMultiFileAuthState(Config.authFolder);

            this.sock = makeWASocket({
                logger: pino({ level: 'silent' }),
                auth: state,
                browser: ['Ubuntu', 'Chrome', '20.0.04'],
                syncFullHistory: false,
                markOnlineOnConnect: true,
                retryRequestDelayMs: 100,
            });

            this.reconnectAttempts = 0;
            this.handlePairing(); // Menggunakan Pairing Code agar cocok di Railway
            this.setupEvents(saveCreds);

        } catch (error) {
            console.error('❌ Error connecting to WhatsApp:', error.message);
            this.handleReconnect();
        }
    }

    handlePairing() {
        if (!this.sock.authState.creds.registered) {
            setTimeout(async () => {
                try {
                    console.log('\n========================================');
                    console.log('Meminta kode pairing dari WhatsApp...');
                    console.log('========================================\n');
                    const code = await this.sock.requestPairingCode(Config.phoneNumber);
                    console.log(`\n========================================`);
                    console.log(` 🔐 KODE PAIRING ANDA: ${code} `);
                    console.log(`========================================\n`);
                    console.log('⚠️  PERHATIAN: Jangan bagikan kode ini kepada siapapun!');
                    console.log('Gunakan kode di atas untuk login WhatsApp Bot.\n');
                } catch (error) {
                    console.error('❌ Gagal meminta pairing code:', error.message);
                }
            }, 5000);
        }
    }

    setupEvents(saveCreds) {
        this.sock.ev.on('connection.update', (update) => this.onConnectionUpdate(update));
        this.sock.ev.on('creds.update', saveCreds);
        
        const messageHandler = new MessageHandler(this.sock);
        this.sock.ev.on('messages.upsert', async ({ messages }) => {
            const m = messages[0];
            await messageHandler.handle(m);
        });
    }

    onConnectionUpdate(update) {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            global.botStatus = 'Menunggu scan QR Code...';
            qrcode.toDataURL(qr, (err, url) => {
                if (!err) global.qrDataUrl = url;
            });
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('\n⚠️  Koneksi terputus');
            
            if (shouldReconnect) {
                this.handleReconnect();
            } else {
                console.log('Logout terdeteksi. Menghapus folder auth yang rusak agar bisa login ulang...');
                try { fs.rmSync(Config.authFolder, { recursive: true, force: true }); } catch (e) {}
                process.exit(1);
            }
        } else if (connection === 'open') {
            this.reconnectAttempts = 0;
            global.botStatus = 'Terkoneksi!';
            global.qrDataUrl = null;
            console.log('\n✅ Bot WhatsApp berhasil terhubung!');
            console.log('🟢 Status: AKTIF - Ready menerima pesan');
            console.log(new Date().toLocaleString());
            console.log('\n================================================\n');
        } else if (connection === 'connecting') {
            console.log('🔗 Sedang menghubungkan...');
        }
    }

    handleReconnect() {
        if (this.reconnectAttempts < Config.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`🔄 Mencoba menghubungkan kembali... (Percobaan ${this.reconnectAttempts}/${Config.maxReconnectAttempts})`);
            setTimeout(() => {
                this.connect();
            }, Config.reconnectDelay);
        } else {
            console.error(`❌ Gagal terhubung setelah ${Config.maxReconnectAttempts} percobaan. Proses dihentikan.`);
            process.exit(1);
        }
    }
}

module.exports = WhatsAppBot;
