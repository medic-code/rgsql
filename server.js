const net = require('node:net');
const MessageBuffer = require('./messageBuffer.js');
const SqlAstParser = require('./astService.js');
const syntaxCheck = require('./syntaxChecker.js')
const tokenize = require('./tokenizer.js')
const buildSelectNode = require('./astBuilder.js');
const returnSQL = require('./return.js');
const ParsingError = require('./errorHandler.js');

const mb = new MessageBuffer('\0');
const PORT = 3002;

function queryHandler(message) {
    const parsed = new SqlAstParser(tokenize, syntaxCheck, buildSelectNode).parse(message);
    return returnSQL(parsed);
}

const server = net.createServer(socket => {
    socket.on('data', data => {
        mb.push(data)
    });

    mb.on('message', rawMsg => {
        try {
            const responseObj = queryHandler(rawMsg)
            console.log(responseObj);
            socket.write(JSON.stringify(responseObj) + '\0')
        } catch (err) {
            if (err instanceof ParsingError) {
                console.log({
                    status: 'error',
                    error_type: err.error_type,
                    error_message: err.message
                });
                socket.write(JSON.stringify({
                    status: 'error',
                    error_type: err.error_type,
                    error_message: err.message
                }) + '\0')
            } else {
                console.error('Unexpected error', err)
                socket.write(JSON.stringify({
                    status: 'error',
                    error_type: 'internal_error',
                    error_message: 'An unexpected error occurred'
                }) + '\0')
                socket.end();
            }

        }
    })

    socket.on('error', err => {
        console.error('Socket error', err);
        socket.destroy()
    })
})

// server.listen(PORT, () => {
//     console.log(`Server connected on ${PORT}`)
// })

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason)
    process.exit(1);
})

process.on('uncaughtException', err => {
    console.error('Uncaught exception:', err);
    process.exit(1);
})

module.exports = { server, queryHandler };