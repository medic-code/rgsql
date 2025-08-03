function returnSQL(astResult) {

    const errorResult = astResult.find(r => r.status === 'error')
    if (errorResult) {
        return { status: 'error', ...errorResult };
    }
    const lastNode = astResult[astResult.length - 1] || { values: [] };
    const columnNames = lastNode.values.map(e => e.as)
    const rowValues = lastNode.values.map(e => {
        return typeof e.value === 'number' ? (Object.is(e.value, -0) ? 0 : e.value) : e.value
    })

    return {
        'status': 'ok',
        'rows': [rowValues],
        'column_names': columnNames
    }

}



module.exports = returnSQL;