const net = require('net');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

const HOST = 'pankov.rollercoders.net';
const PORT = 3210;

const client = new net.Socket();
const stdin = process.openStdin();

stdin.addListener('data', input => {
    if (input === 'exit') {
        client.destroy();
        process.exit(0);
    }

    client.write(input);
});

client.on('error', () => {
    client.destroy();
    process.exit(0);
});

client.on('data', srvMsg => {
    const fromServer = Buffer.from(srvMsg);
    const final = decoder.write(fromServer);
    console.log(final.trim());
});

client.connect(PORT, HOST);
