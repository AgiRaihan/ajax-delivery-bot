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
            const lowerMessage = messageContent.toLowerCase();

            if (lowerMessage === '!ping') {
                await this.sendPong(sender);
            } else if (lowerMessage.includes('ajax bike')) {
                await this.sendBikeResponse(sender);
            } else if (lowerMessage.includes('ajaxexpress')) {
                await this.sendExpressResponse(sender);
            } else if (lowerMessage.includes('checkout') || lowerMessage.includes('memesan')) {
                // Fallback untuk checkout umum
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

    async sendBikeResponse(sender) {
        const response =
            'Halo Kak! Pesanan ojek (Ajax Bike) Anda sudah diterima. 🏍️💨\n' +
            'Mohon tunggu sebentar ya, driver akan segera diproses. 🙏✨\n\n' +
            'Silahkan pilih driver sesuai keinginan anda dengan memilih link grup khusus Bike di bawah:\n\n' +
            '🔗 https://chat.whatsapp.com/IZk1kRjnGAV6IGSqku8uEn?s=cl&p=a&ilr=1';
        await this.sock.sendMessage(sender, { text: response });
        console.log('✓ Bike response sent to:', sender);
    }

    async sendExpressResponse(sender) {
        const response =
            'Halo Kak! Pesanan kurir barang (AjaxExpress) Anda sudah diterima. 📦✨\n' +
            'Mohon tunggu sebentar ya, kurir pengiriman akan segera diproses. 🙏\n\n' +
            'Silahkan pilih kurir sesuai keinginan anda dengan memilih link grup khusus Express di bawah:\n\n' +
            '🔗 https://chat.whatsapp.com/IZk1kRjnGAV6IGSqku8uEn?s=cl&p=a&ilr=1';
        await this.sock.sendMessage(sender, { text: response });
        console.log('✓ Express response sent to:', sender);
    }
}

module.exports = MessageHandler;
