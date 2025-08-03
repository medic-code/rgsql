const EventEmitter = require('events');

class MessageBuffer extends EventEmitter {
    constructor(delimiter = '\0') {
        super()
        this.delimiter = Buffer.from(delimiter);
        this.buffer = Buffer.alloc(0)
    }

    push(chunk) {
        this.buffer = Buffer.concat([this.buffer, chunk]);
        let idx;
        while ((idx = this.buffer.indexOf(this.delimiter)) !== -1) {
            const msgBuf = this.buffer.slice(0, idx);
            const msg = msgBuf.toString('utf-8');
            this.emit('message', msg);
            this.buffer = this.buffer.slice(idx + this.delimiter.length);
        }
    }
}

module.exports = MessageBuffer;