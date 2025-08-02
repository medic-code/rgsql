const ParsingError = require('./errorHandler.js');

function tokenize(rawSql) {
    try {
        let sql = rawSql
            .trim()
            .match(/SELECT\b[\s\S]*?(?=(?:SELECT\b)|$)/gi)
        if (sql) {
            return sql
                .map(s => s.trim())
                .filter(Boolean)
        } else {
            throw new ParsingError('SELECT keyword not found', 'parsing_error');
        }
    } catch (err) {
        throw err;
    }
}

module.exports = tokenize;