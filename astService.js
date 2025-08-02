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

const data = new SqlAstParser(tokenize, syntaxCheck, buildSelectNode).parse("SELECT 56 AS \"fifty six!\", FALSE AS \"🚫\", 0 AS \"this is \"\"nothing\"\"?\";")
console.log(data);
module.exports = SqlAstParser;