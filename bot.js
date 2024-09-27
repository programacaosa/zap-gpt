const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', (qr) => {
    // Gera o QR Code no terminal
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente está pronto!');
});

client.on('message', (message) => {
    // Verifica se a mensagem é de texto
    if (message.body) {
        // Chama a função de saudação
        const greetingMessage = getGreetingMessage();
        // Responde com a saudação
        message.reply(greetingMessage);

        // Verifica se a mensagem contém palavras-chave
        if (containsKeywords(message.body.toLowerCase())) {
            message.reply('Aqui estão nossas pizzas com preços, sabores, tamanhos e descrição.');
        }
    }
});

// Função para determinar a saudação
function getGreetingMessage() {
    const hour = new Date().getHours();

    if (hour < 12) {
        return 'Bom dia!';
    } else if (hour < 18) {
        return 'Boa tarde!';
    } else {
        return 'Boa noite!';
    }
}

// Função para verificar palavras-chave
function containsKeywords(message) {
    const keywords = ['pizza', 'cardápio', 'sabores', 'opções', 'tamanhos', 'variadas', ];
    return keywords.some(keyword => message.includes(keyword));
}

client.initialize();
