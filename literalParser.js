const ParsingError = require('./errorHandler.js')

function parseLiteral(token) {
    const [expr, alias] = token.split(/\s+AS\s+/i);
    if (/^(-\d+|\d+)$/.test(expr)) {
        return { type: 'int', value: Number(expr), ...(alias && { as: alias }) }
    }
    if (/^(true|TRUE|FALSE|false)$/i.test(expr)) {
        return { type: 'bool', value: expr.toLowerCase() === 'true', ...(alias && { as: alias }) }
    }
    throw new ParsingError(`Invalid literal: ${expr}`, 'literal_error')
}

module.exports = parseLiteral;