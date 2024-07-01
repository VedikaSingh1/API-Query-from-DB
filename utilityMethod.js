const Pool = require('pg').Pool;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const getQueryResultWithSingleBindVariable = async (qstring, bindVariable) => {
    return pool.query(qstring, [bindVariable]);
};

const getQueryResultWithMultipleBindVariables = async (qstring, bindArray) => {
    return pool.query(qstring, bindArray);
};

const getQueryResult = async (qstring) => {
    return pool.query(qstring);
};

module.exports = { getQueryResultWithSingleBindVariable, getQueryResultWithMultipleBindVariables, getQueryResult };
