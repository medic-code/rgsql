const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const { server } = require('./server.js');
const net = require('net');


const rl = readline.createInterface({ input, output, prompt: '> ' })
server.listen(3003, () => {
    const client = net.createConnection({ port: 3003 }, async() => {
        console.log('Connected to SQL Server')
        console.log('Type query and press enter to send')

        rl.prompt();
    })

    client.setEncoding('utf8');
    client.on('data', data => {
        process.stdout.write('\r\x1b[k')
        rl.prompt();
    })

    rl.on('close', () => {
        console.log('Goodbye!');
        process.exit(0);
    });

    rl.on('line', (input) => {
        if (input === 'q') {
            rl.close()
        } else {
            client.write(input + '\0')
        }
    })
})