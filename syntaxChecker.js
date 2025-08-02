const ParsingError = require('./errorHandler.js');

function syntaxCheck(stmt) {
    if (/\bAS\b/i.test(stmt)) {
        const body = stmt
            .replace(/^SELECT\b\s*/i, '')
            .replace(/;\s*$/, '')

        const columns = body.split(/\s*, \s*/)

        const aliases = columns.map(col => {
            const parts = col.split(/\s+AS\s+/i);
            return parts.length === 2 ? parts[1] : null;
        }).filter(Boolean);

        if (aliases.some(name => /^\d/.test(name))) {
            throw new ParsingError('Column names must not start with a digit', 'parsing_error')
        }
    }
    if (!stmt.endsWith(';')) {
        throw new ParsingError('Missing Semicolon', 'parsing_error')
    }

    if (/;[\s\S]+$/.test(stmt)) {
        throw new ParsingError('Unexpected text after semicolon', 'parsing_error')
    }

    return { status: 'ok' }
}

module.exports = syntaxCheck;