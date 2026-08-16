class MessageHandler {
    constructor(sock) {
        this.sock = sock;
    }

    async handle(m) {
        if (!m.message || m.key.fromMe) return;

        const messageContent = m.message.conversation || m.message.extendedTextMessage?.text || '';
        const sender = m.key.remoteJid;
        const timestamp = new Date().toLocaleString();

        console.log(`\n📨 [${timestamp}] Pesan dari ${sender}: ${messageContent}`);

        try {
            if (messageContent === '!ping') {
                await this.sendPong(sender);
            } else if (messageContent.toLowerCase().includes('checkout')) {
                await this.sendCheckoutResponse(sender);
            }
        } catch (error) {
            console.error('❌ Error processing message:', error.message);
        }
    }

    async sendPong(sender) {
        await this.sock.sendMessage(sender, { text: 'Pong! 🤖 Bot Ajax Delivery sedang aktif.' });
        console.log('✓ Response: Pong sent');
    }

    async sendCheckoutResponse(sender) {
        const response = 
            'Halo Kak! Pesanan Anda via aplikasi Ajax Deliver sudah diterima oleh kami. ' +
            'Mohon tunggu sebentar ya, pesanan akan segera diproses. 🙏✨\n\n' +
            'Silahkan pilih driver sesuai keinginan anda dengan memilih link grup yang ada di bawah:\n\n' +
            '🔗 https://chat.whatsapp.com/IZk1kRjnGAV6IGSqku8uEn?s=cl&p=a&ilr=1';
        await this.sock.sendMessage(sender, { text: response });
        console.log('✓ Checkout response sent to:', sender);
    }
}

module.exports = MessageHandler;
