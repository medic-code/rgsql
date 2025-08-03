const syntaxCheck = require('./syntaxChecker.js')
const tokenize = require('./tokenizer.js')
const buildSelectNode = require('./astBuilder.js');

class SqlAstParser {
    constructor(tokenize, syntaxCheck, buildSelectNode) {
        this.tokenize = tokenize;
        this.syntaxCheck = syntaxCheck;
        this.buildSelectNode = buildSelectNode;
    }

    parse(rawSql) {
        return this.tokenize(rawSql).map(stmt => this.processStmt(stmt))
    }

    processStmt(stmt) {
        this.syntaxCheck(stmt)
        return this.buildSelectNode(stmt)
    }
}

const data = new SqlAstParser(tokenize, syntaxCheck, buildSelectNode)

module.exports = SqlAstParser;