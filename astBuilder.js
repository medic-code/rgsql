const parseLiteral = require('./literalParser')

function buildSelectNode(stmt) {
    const body = stmt.replace(/^SELECT\b\s*/i, '').replace(/;\s*$/, '').trim();
    const values = body ?
        body.split(/\s*, \s*/).map(parseLiteral) : [];
    console.log(values, 'values')
    return {
        node: 'select',
        values
    }
}

module.exports = buildSelectNode;