class ParsingError extends Error {
    constructor(message, type) {
        super(message);
        this.name = 'ParsingError';
        this.error_type = type;
        this.error_message = message;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ParsingError);
        }
    }
}

module.exports = ParsingError;